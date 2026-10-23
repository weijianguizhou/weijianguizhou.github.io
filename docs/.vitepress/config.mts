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
            { text: '第一章 · Ubuntu、WSL 与 ROS 是什么', link: '/ros2/ch-01-ubuntu-wsl-ros' },
            { text: '第二章 · WSL 安装与配置踩坑', link: '/ros2/ch-02-wsl-install' },
            { text: '第三章 · ROS 2 安装与验证', link: '/ros2/ch-03-ros2-install' },
            { text: '第四章 · Ubuntu 常用命令', link: '/ros2/ch-04-ubuntu-commands' },
            { text: '第五章 · Ubuntu 环境下编程', link: '/ros2/ch-05-ubuntu-programming' },
            { text: '第六章 · ROS 2 体验与系统架构', link: '/ros2/ch-06-ros2-experience' },
            { text: '第七章 · 用 CMake + ament 编译节点', link: '/ros2/ch-07-cmake-ament' }
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
