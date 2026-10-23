# 魏舟的个人主页

学术型个人主页 + 博客。暖白纸感、衬线字体、双列作品卡片。
VitePress 构建，GitHub Pages 免费托管，零后端、零费用。

> 状态：**已在本机验证通过**。`npm run docs:build` 构建成功（VitePress 1.6.4，约 2.4s），并用无头 Edge 截了首页（1280px 桌面 / 560px 窄屏）与关于页，排版、导航、卡片均正常。

## 目录结构

```text
my-blog/
├─ docs/
│  ├─ .vitepress/
│  │  ├─ config.mts                # 站点名、导航、侧栏、搜索、页脚
│  │  └─ theme/
│  │     ├─ index.ts               # 继承默认主题 + 挂自定义 Layout
│  │     ├─ Layout.vue             # 首页走自定义布局，其余页面走 VitePress 默认布局
│  │     ├─ custom.css             # 全站配色 / 衬线字体 / 纸感导航
│  │     └─ components/
│  │        └─ HomePage.vue        # 首页：姓名、身份、头像、Work 卡片列表
│  ├─ index.md                     # 首页（只放 frontmatter：customLayout: home）
│  ├─ about.md                     # 关于页
│  ├─ posts/                       # 写作（Markdown 文章）
│  │  ├─ index.md
│  │  ├─ hello-world.md
│  │  └─ writing-with-markdown.md
│  └─ public/
│     ├─ avatar.png                # 头像（GitHub 公开头像）
│     └─ favicon.svg
├─ .github/workflows/deploy.yml    # 推送 main 自动构建 + 部署 Pages
├─ package.json / package-lock.json
└─ README.md
```

## 改内容只看三个地方

| 想改什么 | 打开哪里 |
| --- | --- |
| 首页姓名、身份、邮箱、项目卡片 | [`docs/.vitepress/theme/components/HomePage.vue`](docs/.vitepress/theme/components/HomePage.vue) 顶部的 `profile` 和 `projects` 数组 |
| 站点标题、导航、页脚、页面元信息 | [`docs/.vitepress/config.mts`](docs/.vitepress/config.mts) 顶部的 `SITE` 与 `themeConfig` |
| 「关于」页正文 | [`docs/about.md`](docs/about.md) |

首页的 `projects` 数组每项长这样，改文字/日期/链接即可，**不用动样式**：

```ts
{
  title: '中文学术排版模板库',   // 卡片标题
  cover: '学术排版',            // 封面上显示的大字（汉字水印取首字）
  meta: '2026 年 10 月 · 工具', // 灰色小字
  desc: '一句话说明',
  link: 'https://github.com/weijianguizhou/typst-tex-templates',
  lang: 'Typst / LaTeX',       // 封面左上角的小标签
  tone: 'sand'                 // 封面色调：sand / sage / clay / stone / mist
}
```

想换成真实截图：把图片放进 `docs/public/`，然后把 `cover` 那一层换成 `<img>`（或告诉我，我改成支持图片的模式）。

## 本地预览

需要 Node.js 18+（本机是 24）。

```bash
npm install
npm run docs:dev      # http://localhost:5173
npm run docs:build    # 产物在 docs/.vitepress/dist
```

## 发布到 GitHub Pages

1. 新建 **Public** 仓库，名字 `<用户名>.github.io`（你的就是 `weijianguizhou.github.io`），这样站点挂在根路径。
   - 如果仓库名不是这个，要同时改 `config.mts` 的 `base` 和 `head` 里的 favicon 路径。
2. 推送：

```bash
git remote add origin https://github.com/weijianguizhou/weijianguizhou.github.io.git
git push -u origin main
```

3. 仓库 **Settings → Pages → Source** 选 **GitHub Actions**（不要选 Deploy from a branch）。
4. 等 Actions 变绿，访问 `https://weijianguizhou.github.io`。

## 写一篇新文章

1. 新建 `docs/posts/my-post.md`，文件名用英文短横线。
2. 顶部 frontmatter：

```md
---
title: 文章标题
date: 2026-10-24
tags:
  - 随笔
---
```

3. 在两处加链接：`docs/posts/index.md`（列表）和 `config.mts` 的 `sidebar['/posts/']`（侧栏）。
4. `git add -A && git commit -m "post: my-post" && git push`。

## 常见问题

| 现象 | 解决 |
| --- | --- |
| 首页空白 / 显示成默认文档页 | `docs/index.md` 的 frontmatter 必须有 `customLayout: home` |
| 线上样式丢失、链接 404 | `base` 配错；不是 `<用户名>.github.io` 仓库时改成 `'/仓库名/'` |
| 头像不显示 | `docs/public/avatar.png` 必须在，且引用写成 `/avatar.png` |
| Actions 报 `npm ci` 失败 | `package-lock.json` 必须一起提交 |
| 想加深色模式适配 | `custom.css` 里已有 `html.dark` 的配色变量，改那里 |
| 想加评论 | [Giscus](https://giscus.app/zh-CN)，免费，基于 GitHub Discussions |
| 想加访问统计 | Cloudflare Web Analytics 或 Umami，免费 |

## 和参考站点的对应关系

配色 `#fafaf8 / #111 / #e5e5e3 / #f4f4f2`、衬线字体栈、窄栏居中、姓名 + 身份要点 + 头像、Work 卡片（封面 + 标题 + 日期分类 + 描述）都对齐了 `arjunvirk.com` 的设计语言；区别是卡片封面用 CSS 合成（不伪造项目截图），并且保留了中文衬线排版。

## 参考

- VitePress 中文文档：<https://vitepress.dev/zh/>
- GitHub Pages 文档：<https://docs.github.com/zh/pages>
