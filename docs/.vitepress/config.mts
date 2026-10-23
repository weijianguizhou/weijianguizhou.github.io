import { defineConfig } from 'vitepress'
import { katex } from '@mdit/plugin-katex'

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

  // 工程数学页面已从 tex 重新转换，公式渲染无错误，正常参与构建
  lastUpdated: true,

  head: [
    ['link', { rel: 'icon', type: 'image/png', href: '/favicon.png' }],
    ['meta', { name: 'theme-color', content: '#fafaf8' }],
    ['meta', { name: 'author', content: SITE.name }]
  ],

  markdown: {
    lineNumbers: true,
    config: (md) => {
      md.use(katex, {
        allowInlineWithSpace: true,
        macros: {
          '\\Arg': '\\operatorname{Arg}',
          '\\argz': '\\operatorname{Arg}',
          '\\re': '\\operatorname{Re}',
          '\\im': '\\operatorname{Im}',
          '\\oiint': '\\iint',
          '\\dif': '\\mathrm{d}',
          '\\dd': '\\mathrm{d}',
          '\\R': '\\mathbb{R}',
          '\\C': '\\mathbb{C}',
          '\\Z': '\\mathbb{Z}',
          '\\N': '\\mathbb{N}',
          '\\Q': '\\mathbb{Q}'
        }
      })
    }
  },

  themeConfig: {
    siteTitle: SITE.name,

    nav: [
      { text: '流体力学', link: '/fluids/' },
      { text: '数字电路', link: '/digital/' },
      { text: 'ROS 2', link: '/ros2/' },
      {
        text: '笔记',
        items: [
          { text: '材料力学', link: '/notes/mechanics/' },
          { text: '常微分方程', link: '/notes/ode/' },
          { text: '概率论', link: '/notes/probability/' },
          { text: '数理统计', link: '/notes/statistics/' },
          { text: '工程数学', link: '/notes/engineering-math.html' }
        ]
      },
      { text: '写作', link: '/posts/' },
      { text: '关于', link: '/about' }
    ],

    sidebar: {
      '/fluids/': [
        {
          text: '流体力学',
          items: [
            { text: '开始之前', link: '/fluids/' },
            { text: '第一章 绪论', link: '/fluids/ch-01-intro' },
            { text: '第二章 张量代数基础', link: '/fluids/ch-02-tensor' },
            { text: '第三章 流体的物理性质', link: '/fluids/ch-03-properties' }
          ]
        }
      ],
      '/digital/': [
        {
          text: '数字电路',
          items: [
            { text: '开始之前', link: '/digital/' },
            { text: '第一章 数制与 BCD 码', link: '/digital/ch-01-number-systems' },
            { text: '第二章 布尔代数', link: '/digital/ch-02-boolean-algebra' }
          ]
        }
      ],
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
      '/notes/mechanics/': [
        {
          text: '材料力学',
          items: [
            { text: '开始之前', link: '/notes/mechanics/' },
            { text: '第一章 绪论', link: '/notes/mechanics/ch-01-intro' },
            { text: '第二章 材料力学的一些基本', link: '/notes/mechanics/ch-02-basics' },
            { text: '第三章 轴向拉伸与压缩', link: '/notes/mechanics/ch-03-axial' },
            { text: '第四章 剪切', link: '/notes/mechanics/ch-04-shear' },
            { text: '第五章 扭转', link: '/notes/mechanics/ch-05-torsion' },
            { text: '第六章 弯曲内力', link: '/notes/mechanics/ch-06-bending-internal' },
            { text: '第七章 弯曲应力', link: '/notes/mechanics/ch-07-bending-stress' },
            { text: '第八章 弯曲变形', link: '/notes/mechanics/ch-08-bending-deformation' },
            { text: '第九章 应力状态分析和强度理论', link: '/notes/mechanics/ch-09-stress-state' },
            { text: '第十章 组合变形', link: '/notes/mechanics/ch-10-combined' },
            { text: '第十一章 压杆稳定性', link: '/notes/mechanics/ch-11-buckling' },
            { text: '第十二章 能量法', link: '/notes/mechanics/ch-12-energy' },
            { text: '第十三章 静不定问题', link: '/notes/mechanics/ch-13-statically-indeterminate' },
            { text: '附录 A 补充材料', link: '/notes/mechanics/ch-14-appendix' }
          ]
        }
      ],
      '/notes/probability/': [
        {
          text: '概率论',
          items: [
            { text: '开始之前', link: '/notes/probability/' },
            { text: '第一章 概率论的基础知识', link: '/notes/probability/ch-01-basics' },
            { text: '第二章 随机变量及其分布', link: '/notes/probability/ch-02-random-variable' },
            { text: '第三章 多维随机变量及其分布', link: '/notes/probability/ch-03-multivariate' },
            { text: '第四章 随机变量的数字特征', link: '/notes/probability/ch-04-numerical' }
          ]
        }
      ],
      '/notes/statistics/': [
        {
          text: '数理统计',
          items: [
            { text: '开始之前', link: '/notes/statistics/' },
            { text: '第一章 基本概念', link: '/notes/statistics/ch-01-basics' },
            { text: '第二章 参数估计', link: '/notes/statistics/ch-02-estimation' },
            { text: '第三章 假设检验', link: '/notes/statistics/ch-03-hypothesis' }
          ]
        }
      ],
      '/notes/ode/': [
        {
          text: '常微分方程',
          items: [
            { text: '开始之前', link: '/notes/ode/' },
            { text: '第一章 绪论', link: '/notes/ode/ch-01-intro' },
            { text: '第二章 一阶微分方程的初等积分法', link: '/notes/ode/ch-02-elementary' },
            { text: '第三章 一阶微分方程解的存在定理', link: '/notes/ode/ch-03-existence' },
            { text: '第四章 高阶微分方程', link: '/notes/ode/ch-04-higher-order' },
            { text: '第五章 线性微分方程组', link: '/notes/ode/ch-05-linear-systems' },
            { text: '第六章 非线性微分方程', link: '/notes/ode/ch-06-nonlinear' }
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
