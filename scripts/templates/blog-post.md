---
tags:
  - 随笔
---

# 在这里写标题

正文直接写。下面这些 Obsidian 语法脚本都会自动转换，放心用。

> [!note] 提示
> callout 会转成站点的 `::: info` 容器；类型支持 note/tip/warning/danger/definition/theorem/example 等。

> [!warning]
> 不写标题时按中文默认标题走（注意 / 提示 / 警告…）。

## 图片

![[图片.png|480]]

上面这种带宽度会转成 `<Figure>` 并自动拷进 `docs/public/posts/`；不带宽度就是普通 Markdown 图片。

## 公式

行内 $a^2+b^2=c^2$；独立公式要自己占一行：

$$
\int_0^1 x^2\,\mathrm{d}x=\frac{1}{3}
$$

## 双链

[[另一篇笔记|显示文字]] 会被转成纯文本并提示你——站点没有笔记库，跨笔记链接保不住。

## 发布

```bash
python scripts/obsidian_to_blog.py "这篇笔记.md" --slug my-post --title "标题" --sidebar
```
