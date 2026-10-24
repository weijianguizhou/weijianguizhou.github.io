#!/usr/bin/env python3
"""Obsidian 笔记 → VitePress 博文（方案 B：笔记库与站点分离）。

用法：
    python scripts/obsidian_to_blog.py <笔记.md> --slug my-post --title "文章标题"
    python scripts/obsidian_to_blog.py <笔记.md> --slug my-post --sidebar      # 顺便插侧栏
    python scripts/obsidian_to_blog.py <笔记.md> --slug my-post --dry-run      # 只看结果不写文件

做的事：
    1. 读笔记 frontmatter（保留 tags），补 title / date；
    2. `> [!note] 标题` callout → VitePress `::: info 标题` 容器；
    3. `![[图.png|300]]` → 拷图到 docs/public/posts/ 并改写成 <Figure> 或 Markdown 图片；
    4. `[[笔记|显示名]]` → 纯文本（站内没有笔记库，跨笔记链接会丢，脚本会提示）；
    5. 公式规范化：句中的 `$$…$$` 拆成独立块、块前后补空行、`{{` → `{ {`；
    6. Tab 缩进 → 2 空格；`%%注释%%` 删除；行首 `#标签` 转行内代码并提示；
    7. 检查标题跳级、mermaid、找不到的图片，最后打印「需要人工确认」清单。

不做的事：不替你润色文字、不判断图片该配什么图注、不改写措辞。
"""
import argparse
import datetime
import hashlib
import os
import re
import shutil
import sys
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
POSTS_DIR = ROOT / "docs" / "posts"
PUBLIC_DIR = ROOT / "docs" / "public" / "posts"
CONFIG = ROOT / "docs" / ".vitepress" / "config.mts"

# Obsidian callout 类型 → (VitePress 容器类型, 默认中文标题)
CALLOUT_MAP = {
    "note": ("info", "注"), "info": ("info", "注"), "abstract": ("info", "摘要"),
    "summary": ("info", "摘要"), "toc": ("info", "目录"),
    "question": ("info", "问题"), "help": ("info", "帮助"), "faq": ("info", "问答"),
    "tip": ("tip", "提示"), "hint": ("tip", "提示"), "important": ("tip", "要点"),
    "success": ("tip", "完成"), "check": ("tip", "完成"), "done": ("tip", "完成"),
    "warning": ("warning", "注意"), "caution": ("warning", "注意"), "attention": ("warning", "注意"),
    "failure": ("danger", "失败"), "fail": ("danger", "失败"), "missing": ("danger", "缺失"),
    "danger": ("danger", "警告"), "error": ("danger", "错误"), "bug": ("danger", "问题"),
    "example": ("example", "例题"), "definition": ("definition", "定义"),
    "theorem": ("theorem", "定理"), "proof": ("proof", "证明"), "remark": ("remark", "注"),
    "quote": ("quote", ""), "cite": ("quote", ""),
}

warnings = []


def warn(msg):
    warnings.append(msg)


# ---------- frontmatter ----------
def split_frontmatter(text):
    if not text.startswith("---"):
        return {}, text
    parts = text.split("---", 2)
    if len(parts) < 3:
        return {}, text
    meta, body = {}, parts[2]
    key = None
    for line in parts[1].strip().splitlines():
        if re.match(r"^\s*-\s+", line) and key:          # 列表项（tags）
            meta.setdefault(key, [])
            if isinstance(meta[key], list):
                meta[key].append(line.strip()[2:].strip())
        elif ":" in line:
            k, v = line.split(":", 1)
            key, v = k.strip(), v.strip()
            meta[key] = v if v else []
    body = body.lstrip("\n")
    return meta, body


# ---------- 图片 ----------
def find_attachment(name, source_dir, extra_dirs):
    cands = [source_dir / name, source_dir / "图片" / name, source_dir / "attachments" / name]
    for d in extra_dirs:
        cands += [d / name, d / "图片" / name]
    for c in cands:
        if c.exists() and c.is_file():
            return c
    return None


def copy_image(src: Path) -> str:
    PUBLIC_DIR.mkdir(parents=True, exist_ok=True)
    digest = hashlib.sha1(src.read_bytes()).hexdigest()[:8]
    # 文件名只留 ASCII，避免网址里出现中文百分号编码
    stem = re.sub(r"[^a-zA-Z0-9\-]+", "-", src.stem).strip("-").lower()
    if len(stem) < 2:
        stem = "img"
    name = f"{stem}-{digest}{src.suffix.lower()}"
    dst = PUBLIC_DIR / name
    if not dst.exists():
        shutil.copy2(src, dst)
    return f"/posts/{name}"


# ---------- callout ----------
def convert_callouts(lines):
    out, i = [], 0
    while i < len(lines):
        m = re.match(r"^>\s*\[!([\w-]+)\][+-]?\s*(.*)$", lines[i])
        if not m:
            out.append(lines[i])
            i += 1
            continue
        kind_raw, title = m.group(1).lower(), m.group(2).strip()
        mapped = CALLOUT_MAP.get(kind_raw)
        body, i = [], i + 1
        while i < len(lines) and re.match(r"^>\s?", lines[i]):
            body.append(re.sub(r"^>\s?", "", lines[i]))
            i += 1
        if mapped is None:
            warn(f"未知 callout 类型 `[!{kind_raw}]`，已按普通引用块保留")
            out.append(f"> **{title}**" if title else ">")
            out += [f"> {b}" if b else ">" for b in body]
            continue
        kind, default_title = mapped
        title = title or default_title
        if kind == "quote":
            out.append(f"> **{title}**" if title else ">")
            out += [f"> {b}" if b else ">" for b in body]
            continue
        out.append(f"::: {kind} {title}".rstrip())
        out += body
        out.append(":::")
    return out


# ---------- 数学公式 ----------
def normalize_math(lines):
    """把句中的 $$…$$ 拆成独立块，并保证块前块后各有一个空行（块内不留空行）。"""
    # 第一步：一行里出现多组 $$ 的，拆成独立行
    stage = []
    for line in lines:
        if "$$" not in line or line.strip() == "$$":
            stage.append(line)
            continue
        pieces, rest = [], line
        while "$$" in rest:
            pre, rest2 = rest.split("$$", 1)
            if "$$" not in rest2:
                break
            math, post = rest2.split("$$", 1)
            pieces.append((pre, math))
            rest = post
        if not pieces:
            stage.append(line)
            continue
        for pre, math in pieces:
            if pre.strip():
                stage.append(pre.rstrip())
                stage.append("")
            stage.append("$$")
            stage.append(math.strip())
            stage.append("$$")
            stage.append("")
        if rest.strip():
            stage.append(rest.strip())

    # 第二步：整理块内外的空行
    out, in_math = [], False
    for line in stage:
        s = line.strip()
        if s == "$$":
            if in_math:                       # 闭合
                out.append("$$")
                out.append("")                # 块后空行
                in_math = False
            else:                             # 开启
                while out and out[-1].strip() == "":
                    out.pop()
                if out:
                    out.append("")
                out.append("$$")
                in_math = True
            continue
        if in_math:
            out.append(line)                  # 块内原样，不加空行
        else:
            out.append(line)
    while out and out[-1].strip() == "":
        out.pop()
    return out


# ---------- 主转换 ----------
def convert(text, args):
    meta, body = split_frontmatter(text)
    lines = body.replace("\r\n", "\n").split("\n")

    # 1) Tab → 2 空格
    lines = [ln.replace("\t", "  ") for ln in lines]
    # 2) 删 %%注释%%
    lines = [re.sub(r"%%.*?%%", "", ln) for ln in lines]
    # 3) callout
    lines = convert_callouts(lines)

    out = []
    for no, line in enumerate(lines, 1):
        # 图片 ![[x.png|300]]
        def img_repl(m):
            name, width = m.group(1).strip(), m.group(2)
            src = find_attachment(name, args.source_dir, args.attach_dirs)
            if src is None:
                warn(f"第 {no} 行图片 `{name}` 找不到，已保留为相对路径图片（需手动改路径）")
                return f"![{Path(name).stem}]({name})"
            if args.dry_run:
                return f'<Figure src="/posts/{Path(name).stem}{Path(name).suffix}" alt="{Path(name).stem}" caption="{Path(name).stem}" :width="{width}" />' if width \
                    else f"![{Path(name).stem}](/posts/{Path(name).stem}{Path(name).suffix})"
            url = copy_image(src)
            alt = Path(name).stem
            if width:
                return f'<Figure src="{url}" alt="{alt}" caption="{alt}" :width="{width}" />'
            return f"![{alt}]({url})"

        line = re.sub(r"!\[\[([^\]|]+?)(?:\|(\d+))?\]\]", img_repl, line)

        # Markdown 相对路径图片：![图 1-1 说明](figures/fig-01.webp) → 拷进 public 并改绝对路径
        def md_img_repl(m):
            alt, path = m.group(1), m.group(2).strip()
            if path.startswith(("http://", "https://", "/", "data:")):
                return m.group(0)
            src = find_attachment(path, args.source_dir, args.attach_dirs)
            if src is None:
                warn(f"第 {no} 行图片 `{path}` 找不到（相对路径在站点上会 404），已保留原样")
                return m.group(0)
            if args.dry_run:
                return f'<Figure src="/posts/{Path(path).stem}{Path(path).suffix}" alt="{alt}" caption="{alt}" />'
            url = copy_image(src)
            if alt.strip().startswith(("图", "Figure")):
                return f'<Figure src="{url}" alt="{alt}" caption="{alt}" />'
            return f"![{alt}]({url})"

        line = re.sub(r"!\[([^\]]*)\]\((?!https?://|/|data:)([^)\s]+)\)", md_img_repl, line)

        # 相对链接（指向仓库外/源稿目录的文件）站上会 404
        for lm in re.finditer(r"(?<!!)\[([^\]]+)\]\((?!https?://|/|#|mailto:)([^)\s]+)\)", line):
            warn(f"第 {no} 行相对链接 `{lm.group(2)}` 在站点上可能 404")

        # 双链 [[笔记|显示名]] / [[笔记#标题|显示名]]
        def link_repl(m):
            raw = m.group(1)
            target, _, label = raw.partition("|")
            label = label or target.split("#")[-1]
            if "#" in target:
                warn(f"第 {no} 行跨笔记标题链接 `[[{raw}]]` 已转纯文本（站内无对应锚点）")
            else:
                warn(f"第 {no} 行双链 `[[{raw}]]` 已转纯文本（站内没有笔记库）")
            return label

        line = re.sub(r"\[\[([^\]]+)\]\]", link_repl, line)

        # 行首 #标签（注意排除 ## / ### 这类标题）
        if re.match(r"^#(?!#)\S+", line):
            warn(f"第 {no} 行行首 `#标签` 会变成标题，已转行内代码")
            line = "`" + line + "`"

        out.append(line)

    text = "\n".join(out)
    # 4) mermaid
    if "```mermaid" in text:
        warn("含 mermaid 图，本站未装 mermaid 插件，会渲染成代码块")
    # 5) 公式
    text = "\n".join(normalize_math(text.split("\n")))
    # 6) {{ → { {（只在含 $ 的行）
    text = "\n".join(re.sub(r"\{\{", "{ {", ln) if "$" in ln else ln for ln in text.split("\n"))
    # 7) 标题跳级 / 标题含公式
    prev = 0
    for line in text.split("\n"):
        m = re.match(r"^(#{1,6})\s", line)
        if m:
            lv = len(m.group(1))
            if prev and lv > prev + 1:
                warn(f"标题从 H{prev} 跳到 H{lv}：`{line.strip()}`（右侧目录可能不全）")
            prev = lv
            if "$" in line:
                warn(f"标题里带公式：`{line.strip()}`（右侧目录会露出原始 TeX，建议改成 Unicode）")

    # 8) 连续空行压成一个（避免 $$ 块后多出空行）
    text = re.sub(r"\n{3,}", "\n\n", text)

    # 8) 组装 frontmatter
    tags = meta.get("tags") or args.tags or ["随笔"]
    if isinstance(tags, str):
        tags = [tags]
    title = args.title or (meta.get("title") or _first_h1(text) or args.slug)
    src_h1 = _first_h1(text)
    if src_h1 and src_h1 != title:
        warn(f"源文件 H1 `{src_h1}` 与标题 `{title}` 不一致（已用标题覆盖，站点约定两者相同）")
    date = args.date or meta.get("date") or datetime.date.today().isoformat()

    fm = ["---", f"title: {title}", f"date: {date}", "tags:"]
    fm += [f"  - {t}" for t in tags]
    fm += ["---", "", f"# {title}", ""]

    # 正文里原本的一级标题一律去掉（我们已经加了与 title 一致的 H1）
    body_text = text.strip("\n")
    if _first_h1(body_text):
        body_text = re.sub(r"^#\s+.*?(\n|$)", "", body_text, count=1).lstrip("\n")

    return "\n".join(fm) + "\n" + body_text.strip("\n") + "\n"


def _first_h1(text):
    m = re.search(r"^#\s+(.+)$", text, re.M)
    return m.group(1).strip() if m else None


# ---------- 侧栏 ----------
def insert_sidebar(title, slug):
    cfg = CONFIG.read_text(encoding="utf-8")
    entry = f"{{ text: '{title}', link: '/posts/{slug}' }}"
    if entry in cfg:
        return "侧栏已存在，跳过"
    anchor = "            { text: '全部文章', link: '/posts/' },"
    if anchor not in cfg:
        return "未找到侧栏锚点，请手动添加"
    cfg = cfg.replace(anchor, anchor + "\n            " + entry + ",", 1)
    CONFIG.write_text(cfg, encoding="utf-8", newline="\n")
    return f"已插入侧栏：{title}"


def slugify(name):
    s = re.sub(r"[^\w\-]+", "-", name).strip("-").lower()
    return s or None


def main():
    ap = argparse.ArgumentParser(description="Obsidian 笔记 → VitePress 博文")
    ap.add_argument("source", help="源笔记路径（.md）")
    ap.add_argument("--slug", help="输出文件名（英文/拼音，决定网址）")
    ap.add_argument("--title", help="文章标题（默认取源文件 H1）")
    ap.add_argument("--date", help="日期 YYYY-MM-DD（默认今天）")
    ap.add_argument("--tags", nargs="*", help="标签，默认沿用笔记 frontmatter 的 tags")
    ap.add_argument("--attach-dir", action="append", default=[], help="附件目录，可多次给")
    ap.add_argument("--sidebar", action="store_true", help="顺便把文章插进 /posts/ 侧栏")
    ap.add_argument("--dry-run", action="store_true", help="只打印结果，不写文件")
    args = ap.parse_args()

    src = Path(args.source).expanduser().resolve()
    if not src.exists():
        sys.exit(f"源文件不存在：{src}")
    args.source_dir = src.parent
    args.attach_dirs = [Path(d).expanduser().resolve() for d in args.attach_dir]
    slug = args.slug or slugify(src.stem)
    if not slug:
        sys.exit("文件名无法转成网址，请用 --slug 指定英文/拼音短名")
    if not re.fullmatch(r"[a-z0-9\-]+", slug):
        warn(f"slug `{slug}` 建议只用小写字母/数字/短横线")

    text = convert(src.read_text(encoding="utf-8"), args)
    dst = POSTS_DIR / f"{slug}.md"

    if args.dry_run:
        print(text)
    else:
        dst.write_text(text, encoding="utf-8", newline="\n")
        print(f"✅ 已生成 {dst.relative_to(ROOT)}")
        if args.sidebar:
            print("   " + insert_sidebar(args.title or _first_h1(text) or slug, slug))

    if warnings:
        print("\n⚠️  需要人工确认：")
        for w in warnings:
            print("   -", w)
    else:
        print("✨ 没有发现需要人工处理的地方")


if __name__ == "__main__":
    main()
