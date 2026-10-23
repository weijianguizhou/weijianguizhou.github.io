---
title: 我是怎么用 Markdown 写作的
date: 2026-09-15
tags:
  - 工具
  - 写作
---

# 我是怎么用 Markdown 写作的

这个博客的所有文章都是 Markdown 文件，改完存盘、推送到 GitHub 就自动发布。下面是我实际会用到的那部分语法——不用全记。

## 标题

用 `#` 开头，一个文件里只写一个 `#`（页面的标题），下面用 `##`、`###` 分层：

```md
# 文章标题
## 一、二级标题
### 1.1 三级标题
```

## 强调与链接

```md
**加粗**、*斜体*、`行内代码`
[链接文字](https://example.com)
```

## 列表与引用

```md
- 无序列表
- 第二项

1. 有序列表
2. 第二项

> 引用：一句想突出的话
```

## 代码块

写三个反引号加语言名，会有语法高亮：

```python
def fib(n: int) -> int:
    a, b = 0, 1
    for _ in range(n):
        a, b = b, a + b
    return a
```

## 表格

```md
| 列一 | 列二 |
| --- | --- |
| 内容 | 内容 |
```

## 提示框（VitePress 特有）

```md
::: tip 小技巧
这是提示框，支持 tip / info / warning / danger / details 五种。
:::
```

效果：

::: tip 小技巧
这是提示框，支持 `tip` / `info` / `warning` / `danger` / `details` 五种。
:::

## 我自己的写作流程

1. 在 `docs/posts/` 下新建 `xxx.md`，文件名用英文短横线，别用中文和空格。
2. 文件开头写 frontmatter（`title`、`date`、`tags`）。
3. 正文写完，在 `docs/posts/index.md` 里加一条链接。
4. 在 `docs/.vitepress/config.mts` 的 sidebar 里加一条（想让它在侧栏出现的话）。
5. `git add -A && git commit -m "post: xxx" && git push`，等 Actions 跑完就上线了。
