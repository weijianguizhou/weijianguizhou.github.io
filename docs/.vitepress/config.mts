import { defineConfig } from 'vitepress'

/* ============================================================
 * TODO：以后改名字 / 联系方式的唯一入口
 * ============================================================ */
const SITE = {
  name: '魏舟',
  en: 'Wei Zhou',
  description: '魏舟的个人主页：力学、机器人、仿真与笔记',
  github: 'https://github.com/weijianguizhou',
  email: 'wei_zhou@njust.edu.cn'
}

export default defineConfig({
  lang: 'zh-CN',
  title: SITE.name,
  description: SITE.description,

  // 仓库名是 <用户名>.github.io 时用 '/'；若仓库叫 blog 则改成 '/blog/'
  base: '/',

  lastUpdated: true,

  head: [
    ['link', { rel: 'icon', type: 'image/png', href: '/favicon.png' }],
    ['meta', { name: 'theme-color', content: '#fafaf8' }],
    ['meta', { name: 'author', content: SITE.name }]
  ],

  markdown: {
    lineNumbers: true
  },

  themeConfig: {
    siteTitle: SITE.name,

    nav: [
      { text: 'ROS 2', link: '/ros2/' },
      { text: '写作', link: '/posts/' },
      { text: '关于', link: '/about' }
    ],

    sidebar: {
      '/ros2/': [
        {
          text: 'ROS 2 学习记录',
          items: [
            { text: '开始之前', link: '/ros2/' },
            { text: '第一章 · 配置 WSL 2', link: '/ros2/chapter-1-wsl' },
            { text: '第二章 · 安装 ROS 2 Humble', link: '/ros2/chapter-2-install-ros2' },
            { text: '第三章 · 第一个工作空间', link: '/ros2/chapter-3-first-workspace' },
            { text: '附录 · 常用命令与排错', link: '/ros2/appendix-commands' }
          ]
        }
      ],
      '/posts/': [
        {
          text: '写作',
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
      message: '用 VitePress 搭建 · 托管在 GitHub Pages',
      copyright: '© 2026 ' + SITE.name
    },

    returnToTopLabel: '回到顶部',
    sidebarMenuLabel: '目录',
    darkModeSwitchLabel: '深浅色',
    langMenuLabel: '语言'
  }
})
