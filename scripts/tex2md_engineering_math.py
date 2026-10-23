#!/usr/bin/env python
# -*- coding: utf-8 -*-
"""把 工程数学/*.tex 拆成 VitePress 连载：docs/notes/engineering-math/ 下每章一页 + 目录页。

用法：python scripts/tex2md_engineering_math.py（需要 pandoc 3.x）
流程：tex -> 自定义环境改写成 quote -> pandoc 转 gfm -> 公式规范化 -> 按章拆页
"""
import re
import subprocess
import sys
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
TEX = ROOT / "工程数学"
TMP = ROOT / ".tmp" / "tex2md"
OUTDIR = ROOT / "docs" / "notes" / "engineering-math"

CHAPTERS = [
    ("复变函数/复数域与复变函数", "ch-01-complex-field"),
    ("复变函数/复变函数基础", "ch-02-complex-function"),
    ("复变函数/解析函数", "ch-03-analytic"),
    ("复变函数/共形映射", "ch-04-conformal"),
    ("复变函数/复积分", "ch-05-integral"),
    ("级数", "ch-06-series"),
    ("留数", "ch-07-residue"),
    ("Fourier 变换", "ch-08-fourier"),
    ("Laplace 变换", "ch-09-laplace"),
    ("Z 变换", "ch-10-z-transform"),
    ("场论", "ch-11-field"),
]
FRONT_RELS = ["前言", "绪论"]

KEEP_ENVS = {
    "enumerate", "itemize", "description", "align", "align*", "aligned", "aligned*",
    "equation", "equation*", "gather", "gather*", "split", "multline", "multline*",
    "cases", "matrix", "pmatrix", "bmatrix", "vmatrix", "Vmatrix", "array",
    "tabular", "tabular*", "figure", "figure*", "table", "table*", "center",
    "flushleft", "flushright", "minipage", "quote", "quotation", "verbatim",
    "lstlisting", "tikzpicture", "thebibliography", "document",
}
LABELS = {
    "definition": "定义", "axiom": "公理", "theorem": "定理", "proposition": "命题",
    "lemma": "引理", "property": "性质", "corollary": "推论", "example": "例",
    "longexample": "例", "exercise": "练习", "proof": "证明", "solution": "解",
    "remark": "注", "note": "注", "keybox": "", "tcolorbox": "",
    "warning": "注意", "tip": "提示", "intro": "",
}
DD = "$$"


def strip_comments(s):
    return "\n".join(l for l in s.split("\n") if not re.match(r"^\s*%", l))


def rewrite_envs(s):
    def repl_begin(m):
        name = m.group(1).strip().rstrip("*")
        if name in KEEP_ENVS:
            return m.group(0)
        args = m.group(2) or ""
        tm = re.search(r"title\s*=\s*\{?([^,}\]]+)", args)
        head = (tm.group(1).strip() if tm else "") or LABELS.get(name, "")
        return "\\begin{quote}" + ("\\\\\\textbf{" + head + "}" if head else "")

    s = re.sub(r"\\begin\{([A-Za-z*]+)\}(\[[^\]]*\])?", repl_begin, s)
    return re.sub(
        r"\\end\{([A-Za-z*]+)\}",
        lambda m: m.group(0) if m.group(1).strip().rstrip("*") in KEEP_ENVS else "\\end{quote}",
        s,
    )


def drop_noise(s):
    for pat in (r"\\includegraphics(\[[^\]]*\])?\{[^}]*\}", r"\\label\{[^}]*\}",
                r"\\index\{[^}]*\}", r"\\vspace\*?\{[^}]*\}", r"\\hspace\*?\{[^}]*\}",
                r"\\setcounter\{[^}]*\}\{[^}]*\}", r"\\clearpage|\\newpage|\\pagebreak"):
        s = re.sub(pat, "", s)
    return s


def tex_to_md(tex_path):
    s = drop_noise(rewrite_envs(strip_comments(tex_path.read_text(encoding="utf-8", errors="replace"))))
    TMP.mkdir(parents=True, exist_ok=True)
    src = TMP / (tex_path.stem + ".tex")
    src.write_text(s, encoding="utf-8")
    r = subprocess.run(
        ["pandoc", str(src), "-f", "latex", "-t", "gfm", "--wrap=none",
         "--top-level-division=chapter"],
        capture_output=True, text=True, encoding="utf-8", errors="replace",
    )
    if r.returncode != 0:
        raise SystemExit(f"pandoc failed on {tex_path.name}:\n{r.stderr[:1500]}")
    return r.stdout


def unquote(line):
    prev = None
    while prev != line:
        prev = line
        line = re.sub(r"^\s*>\s?", "", line)
    return line


def fix_math(md):
    lines, out, i = md.split("\n"), [], 0
    while i < len(lines):
        if unquote(lines[i]).strip() in ("``` math", "```math"):
            j = i + 1
            while j < len(lines) and j - i < 60 and not re.fullmatch(r"```+", unquote(lines[j]).strip()):
                j += 1
            if j < len(lines) and j - i < 60:
                out += [DD] + [unquote(l) for l in lines[i + 1:j]] + [DD]
                i = j + 1
                continue
        out.append(lines[i])
        i += 1
    text = "\n".join(out)
    text = re.sub(r"\$`(.+?)`\$", lambda m: "$" + m.group(1).replace("\n", " ") + "$", text, flags=re.S)
    return text.replace("{{", "{ {")


def normalize_math_blocks(text):
    toks = [m.start() for m in re.finditer(re.escape(DD), text)]
    if len(toks) % 2:
        print("  !! $$ 奇数，最后一对不完整", file=sys.stderr)
    out, pos = [], 0
    for k in range(0, len(toks) - 1, 2):
        a, b = toks[k], toks[k + 1]
        out.append(re.sub(r"(?m)^\s*>\s*$", "", text[pos:a]))
        out.append("\n\n" + DD + "\n" + text[a + 2:b].strip("\n") + "\n" + DD + "\n\n")
        pos = b + 2
    out.append(text[pos:])
    res = re.sub(r"[ \t]+\n", "\n", "".join(out))
    return re.sub(r"\n{3,}", "\n\n", res)


def demote(md):
    out, in_code = [], False
    for line in md.split("\n"):
        if line.startswith("```"):
            in_code = not in_code
        if not in_code and re.match(r"^#{1,6} ", line):
            line = "#" + line
        out.append(line)
    return "\n".join(out)


def split_title(md):
    lines = md.split("\n")
    for idx, line in enumerate(lines):
        m = re.match(r"^#\s+(.+?)\s*$", line)
        if m:
            return m.group(1), "\n".join(lines[idx + 1:]).strip()
    return None, md.strip()


def yaml_str(s):
    return '"' + s.replace('"', '\\"') + '"'


def main():
    OUTDIR.mkdir(parents=True, exist_ok=True)
    old = ROOT / "docs" / "notes" / "engineering-math.md"
    if old.exists():
        old.unlink()
        print(f"removed {old.name}")

    chapters = []
    for rel, slug in CHAPTERS:
        p = TEX / (rel + ".tex")
        if not p.exists():
            print(f"skip missing {p}", file=sys.stderr)
            continue
        title, body = split_title(normalize_math_blocks(fix_math(tex_to_md(p))))
        title = title or rel
        chapters.append((slug, title))
        page = (f"---\ntitle: {yaml_str(title)}\ndescription: {yaml_str('工程数学 · ' + title)}\n---\n\n"
                f"# {title}\n\n{body}\n")
        (OUTDIR / f"{slug}.md").write_text(page, encoding="utf-8")
        print(f"  {slug}.md  {len(page.splitlines())} lines  {title}")

    front_parts = []
    for rel in FRONT_RELS:
        p = TEX / (rel + ".tex")
        if not p.exists():
            continue
        title, body = split_title(normalize_math_blocks(fix_math(tex_to_md(p))))
        if body.strip():
            front_parts.append(demote(body))
    rows = "\n".join(f"| [{t}](/notes/engineering-math/{s}.html) |" for s, t in chapters)
    index = (
        "---\ntitle: 工程数学\ndescription: 工程数学课程完整笔记：复变函数、积分变换与场论（已学完）\n---\n\n"
        "# 工程数学\n\n复变函数、级数、留数、积分变换与场论，按章整理，方便回查。\n\n"
        "::: tip 原稿 PDF\n同一份笔记的 PDF 版：[工程数学.pdf](/notes/engineering-math.pdf)\n:::\n\n"
        "## 章节\n\n| 章节 |\n| --- |\n" + rows + "\n\n## 说明\n\n" + "\n\n".join(front_parts) + "\n"
    )
    (OUTDIR / "index.md").write_text(index, encoding="utf-8")
    print(f"  index.md  {len(index.splitlines())} lines, {len(chapters)} chapters")


if __name__ == "__main__":
    main()
