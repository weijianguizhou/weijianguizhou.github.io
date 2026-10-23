# 个人主页 + 博客（VitePress · GitHub Pages · 零成本）

用 Markdown 写文章，VitePress 生成静态站点，GitHub Pages 免费托管。没有后端、没有数据库、没有服务器费用。

> 状态：**已在本机验证通过**——`npm install`（126 个包）→ `npm run docs:build`（VitePress v1.6.4，2.38s 构建成功）→ 本地预览 `/`、`/posts/`、`/posts/hello-world.html`、`/about.html`、`/favicon.svg` 全部返回 200。内容仍是占位符，按「第二步」换成你自己的。

## 目录结构

```text
my-blog/
├─ docs/                          # 站点根目录
│  ├─ .vitepress/
│  │  ├─ config.mts               # 站点配置：标题、导航、侧栏、搜索、页脚
│  │  └─ theme/
│  │     ├─ index.ts              # 继承默认主题
│  │     └─ custom.css            # 配色与排版微调
│  ├─ index.md                    # 首页（hero + 特性 + 最近更新）
│  ├─ about.md                    # 关于页
│  ├─ posts/
│  │  ├─ index.md                 # 文章列表
│  │  ├─ hello-world.md           # 示例文章 1
│  │  └─ writing-with-markdown.md # 示例文章 2（Markdown 语法速查）
│  └─ public/                     # 静态资源，原样复制到站点根
│     ├─ logo.svg
│     └─ favicon.svg
├─ .github/workflows/deploy.yml   # 推送到 main 自动构建 + 部署
├─ .gitignore
├─ package.json
└─ README.md
```

## 第一步：本地跑起来

需要 **Node.js 18 或更高**（推荐 20 LTS）。

```bash
node -v            # 确认版本 >= 18
npm install        # 安装 VitePress
npm run docs:dev   # 本地预览，默认 http://localhost:5173
```

- npm 慢的话换镜像：`npm config set registry https://registry.npmmirror.com`
- 也可以用 `pnpm i` 或 `bun i`，脚本不变
- 构建产物：`npm run docs:build` → `docs/.vitepress/dist`（已 gitignore）
- 本地看构建结果：`npm run docs:preview`

## 第二步：改成你自己的信息（约 5 分钟）

| 改哪里 | 改成什么 |
| --- | --- |
| `docs/.vitepress/config.mts` 顶部的 `SITE` | 名字、简介、GitHub、邮箱 |
| `docs/index.md` | 首页大标题 `hero.name`、`tagline`、最近更新列表 |
| `docs/about.md` | 关于页正文、联系方式 |
| `docs/public/logo.svg` | 换成你的头像（PNG 也行，同时改 `SITE.avatar`） |
| `docs/.vitepress/theme/custom.css` | 主色 `--vp-c-brand-*`，深色模式在 `.dark` 里 |

全站配色只改 `custom.css` 顶部那 4 个变量就够了。

## 第三步：发布到 GitHub Pages（免费）

1. 在 GitHub 新建一个 **Public** 仓库，名字必须是 `<你的用户名>.github.io`，例如用户 `zhangsan` 就建 `zhangsan.github.io`。
   - 只有这个命名，站点才挂在根路径 `https://zhangsan.github.io`
   - 如果仓库叫别的（比如 `blog`），要把 `config.mts` 里的 `base: '/'` 改成 `base: '/blog/'`，同时把 `head` 里的 `/favicon.svg` 改成 `/blog/favicon.svg`，否则样式和图标全丢
2. 在 `my-blog` 目录里初始化并推送：

```bash
git init
git add -A
git commit -m "feat: init blog"
git branch -M main
git remote add origin https://github.com/<你的用户名>/<仓库名>.git
git push -u origin main
```

3. 仓库 **Settings → Pages → Build and deployment → Source** 选 **GitHub Actions**（不要选 Deploy from a branch）。
4. 打开 **Actions** 标签页，等 `Deploy VitePress site to Pages` 变绿（首次约 1–2 分钟）。
5. 访问 `https://<你的用户名>.github.io`。

> 第一次失败最常见的原因：Pages 的 Source 还没切成 GitHub Actions，或者仓库是私有的（私有仓库用 Pages 要付费账号）。

## 写一篇新文章（5 步）

1. 新建 `docs/posts/my-post.md`，文件名用英文和短横线，别用中文或空格。
2. 顶部写 frontmatter：

```md
---
title: 文章标题
date: 2026-10-24
tags:
  - 随笔
---
```

3. 正文用 Markdown 写（语法见 `docs/posts/writing-with-markdown.md`）。
4. 在两处加一条链接：
   - `docs/posts/index.md`：文章列表
   - `docs/.vitepress/config.mts` 的 `sidebar['/posts/']`：左侧栏
5. 推送，等 Actions 自动部署：

```bash
git add -A
git commit -m "post: my-post"
git push
```

## 常见问题

| 现象 | 原因 / 解决 |
| --- | --- |
| 页面能开但样式全丢、链接 404 | `base` 配错。仓库不是 `<用户名>.github.io` 时必须 `base: '/仓库名/'` |
| Actions 里 `npm ci` 报错 | `package-lock.json` 必须一起提交（现在已在仓库里）。如果你本地增删依赖后 `npm install` 改了 lock，记得把 `package-lock.json` 一并提交，否则 CI 会因 lock 与 `package.json` 不一致而失败 |
| 本地 5173 端口被占 | `npm run docs:dev -- --port 5174` |
| 页面顶部没显示“最后更新” | 该字段取自 git 提交时间；本地未提交、或 CI 浅克隆时可能为空，属正常 |
| 本地能开、线上白屏 | 看 Actions 日志里的构建错误；常见是 Markdown 里链接写了不存在的页面 |
| 想换域名 | 自己买域名（几十元/年）后在 Pages 里绑定；国内访问要稳定则需备案 + 国内云，不免费 |
| 想加评论 | [Giscus](https://giscus.app/zh-CN)，基于 GitHub Discussions，免费，需要加一个 Vue 组件 |
| 想加访问统计 | Cloudflare Web Analytics 或 Umami，免费、无 Cookie |
| 想让搜索引擎收录 | 在 `config.mts` 里加 `sitemap: { hostname: 'https://你的域名' }`，再去各站长平台提交 |

## 进阶：可以再做什么

- **自动文章列表**：现在列表是手写的；以后可以写个脚本扫描 `docs/posts/*.md` 生成，或用 VitePress 的 data loaders（1.6+ 支持）
- **文章图片**：放 `docs/public/uploads/`，正文里写 `/uploads/xxx.png`
- **换成更"博客感"的主题**：Astro（[Astro Paper](https://github.com/satnaing/astro-paper) 等）或 Hexo（Butterfly 等，中文主题生态更丰富）都行，迁移成本主要在布局，Markdown 内容可以原样搬
- **自定义域名 + HTTPS**：Pages 免费提供证书，绑好域名即可

## 参考

- VitePress 中文文档：<https://vitepress.dev/zh/>
- GitHub Pages 文档：<https://docs.github.com/zh/pages>
