#!/usr/bin/env python
# -*- coding: utf-8 -*-
"""把 工程数学/*.tex 转成一页 VitePress markdown（docs/notes/engineering-math.md）。

用法：python scripts/tex2md_engineering_math.py（需要 pandoc 3.x）

流程：
  tex -> 自定义环境改写成 quote -> pandoc 转 gfm -> 后处理成站点能吃的格式

后处理负责三件事：
  1. pandoc 的 ``` math 围栏（可能带引用前缀/缩进）-> $$ 块
  2. pandoc 的 $`x`$ 行内公式 -> $x$
  3. 数学里的 {{ 拆开，避免被 VitePress 当 Vue 插值
"""
import re
import subprocess
import sys
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
TEX = ROOT / "工程数学"
TMP = ROOT / ".tmp" / "tex2md"
OUT = ROOT / "docs" / "notes" / "engineering-math.md"

CHAPTERS = [
    "前言", "绪论",
    "复变函数/复数域与复变函数", "复变函数/复变函数基础", "复变函数/解析函数",
    "复变函数/共形映射", "复变函数/复积分",
    "级数", "留数", "Fourier 变换", "Laplace 变换", "Z 变换", "场论", "附录",
]

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


def strip_comments(s: str) -> str:
    return "\n".join(l for l in s.split("\n") if not re.match(r"^\s*%", l))


def rewrite_envs(s: str) -> str:
    def repl_begin(m):
        name = m.group(1).strip().rstrip("*")
        args = m.group(2) or ""
        if name in KEEP_ENVS:
            return m.group(0)
        label = LABELS.get(name, "")
        tm = re.search(r"title\s*=\s*\{?([^,}\]]+)", args)
        title = tm.group(1).strip() if tm else ""
        head = title or label
        return "\\begin{quote}" + ("\\\\\\textbf{" + head + "}" if head else "")

    s = re.sub(r"\\begin\{([A-Za-z*]+)\}(\[[^\]]*\])?", repl_begin, s)
    s = re.sub(
        r"\\end\{([A-Za-z*]+)\}",
        lambda m: m.group(0) if m.group(1).strip().rstrip("*") in KEEP_ENVS else "\\end{quote}",
        s,
    )
    return s


def drop_noise(s: str) -> str:
    s = re.sub(r"\\includegraphics(\[[^\]]*\])?\{[^}]*\}", "", s)
    for pat in (r"\\label\{[^}]*\}", r"\\index\{[^}]*\}", r"\\vspace\*?\{[^}]*\}",
                r"\\hspace\*?\{[^}]*\}", r"\\setcounter\{[^}]*\}\{[^}]*\}",
                r"\\clearpage|\\newpage|\\pagebreak"):
        s = re.sub(pat, "", s)
    return s


def tex_to_md(tex_path: Path) -> str:
    s = tex_path.read_text(encoding="utf-8", errors="replace")
    s = strip_comments(s)
    s = rewrite_envs(s)
    s = drop_noise(s)
    TMP.mkdir(parents=True, exist_ok=True)
    src = TMP / (tex_path.stem + ".tex")
    src.write_text(s, encoding="utf-8")
    r = subprocess.run(
        ["pandoc", str(src), "-f", "latex", "-t", "gfm", "--wrap=none",
         "--top-level-division=chapter"],
        capture_output=True, text=True, encoding="utf-8", errors="replace",
    )
    if r.returncode != 0:
        raise SystemExit(f"pandoc failed on {tex_path.name}:\n{r.stderr[:2000]}")
    return r.stdout


def unquote(line: str) -> str:
    prev = None
    while prev != line:
        prev = line
        line = re.sub(r"^\s*>\s?", "", line)
    return line


def fix_math(md: str) -> str:
    lines = md.split("\n")
    out, i = [], 0
    while i < len(lines):
        stripped = unquote(lines[i]).strip()
        if stripped in ("``` math", "```math"):
            # 找闭合围栏（最多向下 60 行）
            j = i + 1
            while j < len(lines) and j - i < 60:
                if re.fullmatch(r"```+", unquote(lines[j]).strip()):
                    break
                j += 1
            if j < len(lines) and j - i < 60:
                body = [unquote(l) for l in lines[i + 1:j]]
                out += ["$$"] + body + ["$$"]
                i = j + 1
                continue
        out.append(lines[i])
        i += 1
    md = "\n".join(out)

    md = re.sub(r"\$`(.+?)`\$", lambda m: "$" + m.group(1).replace("\n", " ") + "$", md, flags=re.S)
    md = md.replace("{{", "{ {")
    return md


def demote(md: str) -> str:
    out, in_code = [], False
    for line in md.split("\n"):
        if line.startswith("```"):
            in_code = not in_code
        if not in_code and re.match(r"^#{1,6} ", line):
            line = "#" + line
        out.append(line)
    return "\n".join(out)


def main() -> None:
    parts = []
    for rel in CHAPTERS:
        p = TEX / (rel + ".tex")
        if not p.exists():
            print(f"skip missing {p}", file=sys.stderr)
            continue
        md = demote(fix_math(tex_to_md(p)))
        parts.append(md.strip())

    front = [
        "---",
        "title: 工程数学",
        "description: 工程数学课程完整笔记：复变函数、积分变换与场论（已学完）",
        "---",
        "",
        "# 工程数学",
        "",
        "复变函数、级数、留数、积分变换与场论，一页读完。",
        "",
        "::: tip 原稿 PDF",
        "同一份笔记的 PDF 版：[工程数学.pdf](/notes/engineering-math.pdf)",
        ":::",
        "",
    ]
    body = "\n\n".join(parts)
    text = "\n".join(front) + "\n" + body + "\n"
    OUT.write_text(text, encoding="utf-8")

    # 自检
    problems = []
    if "``` math" in text:
        problems.append(f"残留未转换围栏 {text.count('``` math')} 处")
    if "{{" in text:
        problems.append(f"残留 {{{{ {text.count('{{')} 处")
    if text.count("$$") % 2:
        problems.append("$$ 数量为奇数，定界符不配对")
    print(f"wrote {OUT} ({len(text.splitlines())} lines), "
          f"$$={text.count('$$')}, "
          + ("; ".join(problems) if problems else "self-check ok"))


if __name__ == "__main__":
    main()
