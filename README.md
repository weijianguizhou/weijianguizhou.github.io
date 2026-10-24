# 魏舟的个人主页

学术型个人主页 + 博客。暖白纸感、衬线字体、双列作品卡片。
VitePress 构建，GitHub Pages 免费托管，零后端、零费用。

> **写内容之前先看 [写作规范](./写作规范.md)**：连载怎么组织、公式怎么写、常见故障怎么查，都在里面。

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
│  │        └─ HomePage.vue        # 首页：姓名/身份/头像 + 分区大卡片（点开展开课程卡片）
│  ├─ index.md                     # 首页（只放 frontmatter：customLayout: home）
│  ├─ about.md                     # 关于页
│  ├─ posts/                       # 写作（Markdown 文章）
│  │  ├─ index.md
│  │  ├─ hello-world.md
│  │  └─ writing-with-markdown.md
│  ├─ ros2/                        # ROS 2 连载（内容来自 ROS2/ 下的原始笔记）
│  │  ├─ index.md                  # 系列目录
│  │  ├─ ch-01-ubuntu-wsl-ros.md   # 第一章：Ubuntu、WSL 与 ROS 是什么
│  │  ├─ ch-02-wsl-install.md      # 第二章：WSL 安装与配置踩坑
│  │  ├─ ch-03-ros2-install.md     # 第三章：ROS 2 安装与验证
│  │  ├─ ch-04-ubuntu-commands.md  # 第四章：Ubuntu 常用命令
│  │  ├─ ch-05-ubuntu-programming.md # 第五章：Ubuntu 环境下编程
│  │  ├─ ch-06-ros2-experience.md  # 第六章：ROS 2 体验与系统架构
│  │  └─ ch-07-cmake-ament.md      # 第七章：用 CMake + ament 编译节点
│  ├─ fluids/                      # 流体力学连载（内容来自 流体力学/笔记/）
│  │  ├─ index.md
│  │  ├─ ch-01-intro.md            # 第一章 绪论
│  │  ├─ ch-02-properties.md       # 第二章 流体的物理性质
│  │  └─ ch-03-tensor.md           # 第三章 张量代数基础
│  ├─ digital/                     # 数字电路连载（内容来自 数字电路/笔记/）
│  │  ├─ index.md
│  │  ├─ ch-01-number-systems.md   # 第一章 数制与 BCD 码
│  │  └─ ch-02-boolean-algebra.md  # 第二章 布尔代数
│  └─ public/
│     ├─ avatar.jpg                # 头像（400×400，来自 GitHub 公开头像）
│     └─ favicon.svg
├─ .github/workflows/deploy.yml    # 推送 main 自动构建 + 部署 Pages
├─ package.json / package-lock.json
└─ README.md
```

## 改内容只看三个地方

| 想改什么 | 打开哪里 |
| --- | --- |
| 首页姓名、身份、邮箱、笔记分区与卡片 | [`docs/.vitepress/theme/components/HomePage.vue`](docs/.vitepress/theme/components/HomePage.vue) 顶部的 `profile` 和 `sections` 数组 |
| 站点标题、导航、页脚、页面元信息 | [`docs/.vitepress/config.mts`](docs/.vitepress/config.mts) 顶部的 `SITE` 与 `themeConfig` |
| 「关于」页正文 | [`docs/about.md`](docs/about.md) |

首页把 8 门笔记收进 **4 个分区大卡片**（机器人 / 电子 / 力学与工程 / 数学基础）：点分区标题展开，里面才是课程小卡片；手风琴式一次只开一个，默认展开第一个。结构在 `HomePage.vue` 顶部的 `sections` 数组里：

```ts
{
  id: 'mechanics',                  // 唯一 id，用于 aria-controls
  title: '力学与工程',
  en: 'MECHANICS & ENGINEERING',
  desc: '从材料力学的强度、刚度、稳定性，到流体力学的连续介质模型与张量。',
  tone: 'clay',                     // 大卡片色调：sand / sage / clay / stone / mist
  notes: [ /* 课程小卡片，字段见下 */ ]
}
```

课程小卡片每项长这样，改文字/日期/链接即可，**不用动样式**：

```ts
{
  title: '常微分方程',            // 小卡片标题
  cover: '常微分方程',            // 封面上显示的大字（汉字水印取首字）
  meta: '2026 · 6 章',           // 灰色小字
  desc: '初等积分法、解的存在定理、高阶方程……',
  link: '/notes/ode/',           // 站内链接；单文件页面写 .html，目录页面写尾斜杠
  lang: 'ODE',                   // 封面左上角的小标签
  tone: 'stone',                 // 封面色调：sand / sage / clay / stone / mist
  badge: '已学完',                // 可选：小徽章（连载 / 已学完）
  chapters: 6,                   // 章数，用于分区右上角「N 门 · M 章」统计
  image: '/notes/ode-lorenz.png' // 可选：鼠标悬停时浮现的代表图
}
```

展开面板的高度动画用纯 CSS（`grid-template-rows: 0fr → 1fr`），不依赖 JS 测量；鼠标移到课程卡片上会浮现该笔记的代表图，移开淡回排版封面——由 `:hover` / `:focus-visible` 驱动，触屏设备用 `:active` 兜底。

**加一门课**：把它追加到对应分区的 `notes` 数组里；**加一个分区**：往 `sections` 追加一项（`id` 起唯一名字），再把课程卡片放进它的 `notes`。想让分区在导航里也有入口，再去 `config.mts` 的 `nav` / `sidebar` 补条目。

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
   - 如果是**系列教程**（像 `/ros2/` 那样一章一章写）：文件放进 `docs/<系列名>/`，在 `config.mts` 的 `sidebar` 里新加一个 `'/<系列名>/'` 数组，章节顺序就是侧栏顺序，VitePress 会自动生成「上一章 / 下一章」。
4. `git add -A && git commit -m "post: my-post" && git push`。

## 常见问题

| 现象 | 解决 |
| --- | --- |
| 首页空白 / 显示成默认文档页 | `docs/index.md` 的 frontmatter 必须有 `customLayout: home` |
| 线上样式丢失、链接 404 | `base` 配错；不是 `<用户名>.github.io` 仓库时改成 `'/仓库名/'` |
| 头像不显示 | `docs/public/avatar.jpg` 必须在，且 `HomePage.vue` 里的引用写成 `/avatar.jpg`（favicon 用的是 `/favicon.png`） |
| Actions 报 `npm ci` 失败 | `package-lock.json` 必须一起提交 |
| 想加深色模式适配 | `custom.css` 里已有 `html.dark` 的配色变量，改那里 |
| 想加评论 | [Giscus](https://giscus.app/zh-CN)，免费，基于 GitHub Discussions |
| 想加访问统计 | Cloudflare Web Analytics 或 Umami，免费 |

## 和参考站点的对应关系

配色 `#fafaf8 / #111 / #e5e5e3 / #f4f4f2`、衬线字体栈、窄栏居中、姓名 + 身份要点 + 头像、Work 卡片（封面 + 标题 + 日期分类 + 描述）都对齐了 `arjunvirk.com` 的设计语言；区别是卡片封面用 CSS 合成（不伪造项目截图），并且保留了中文衬线排版。

## 参考

- VitePress 中文文档：<https://vitepress.dev/zh/>
- GitHub Pages 文档：<https://docs.github.com/zh/pages>
