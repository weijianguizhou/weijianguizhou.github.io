import { defineConfig } from 'vitepress'

/* ============================================================
 * TODO：把下面 5 个字段换成你自己的信息，其余可以先不动
 * ============================================================ */
const SITE = {
  name: '你的名字',                     // 站点标题（浏览器标签页 + 左上角）
  description: '个人主页与博客：记录技术、项目与思考',
  github: 'https://github.com/yourname', // 你的 GitHub 主页
  email: 'you@example.com',              // 你的邮箱
  avatar: '/logo.svg'                    // 头像 / 站点 logo（在 docs/public 下）
}

export default defineConfig({
  lang: 'zh-CN',
  title: SITE.name,
  description: SITE.description,

  // 仓库名是 <用户名>.github.io 时用 '/'；
  // 如果仓库叫 blog，就改成 '/blog/'
  base: '/',

  // 更新时间取自 git 提交时间，需要仓库有 git 历史
  lastUpdated: true,

  head: [
    ['link', { rel: 'icon', type: 'image/svg+xml', href: '/favicon.svg' }],
    ['meta', { name: 'theme-color', content: '#5b7cfa' }],
    ['meta', { name: 'author', content: SITE.name }]
  ],

  markdown: {
    lineNumbers: true
  },

  themeConfig: {
    logo: SITE.avatar,
    siteTitle: SITE.name,

    nav: [
      { text: '首页', link: '/' },
      { text: '文章', link: '/posts/' },
      { text: '关于', link: '/about' }
    ],

    sidebar: {
      '/posts/': [
        {
          text: '文章',
          items: [
            { text: '全部文章', link: '/posts/' },
            { text: '你好，世界', link: '/posts/hello-world' },
            { text: '我是怎么用 Markdown 写作的', link: '/posts/writing-with-markdown' }
          ]
        }
      ]
    },

    socialLinks: [
      { icon: 'github', link: SITE.github }
    ],

    search: {
      provider: 'local'
    },

    outline: {
      level: [2, 3],
      label: '本页目录'
    },

    docFooter: {
      prev: '上一篇',
      next: '下一篇'
    },

    lastUpdated: {
      text: '最后更新'
    },

    footer: {
      message: '基于 VitePress 构建 · 由 GitHub Pages 免费托管',
      copyright: 'Copyright © 2026 ' + SITE.name
    },

    // 界面文案中文化（VitePress 默认英文）
    returnToTopLabel: '回到顶部',
    sidebarMenuLabel: '文章目录',
    darkModeSwitchLabel: '深浅色',
    langMenuLabel: '语言'
  }
})
