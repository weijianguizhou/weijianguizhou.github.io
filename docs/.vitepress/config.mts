import { defineConfig } from 'vitepress'
import { katex } from '@mdit/plugin-katex'
import container from 'markdown-it-container'

/* ============================================================
 * TODO：以后改名字 / 联系方式的唯一入口
 * ============================================================ */
const SITE = {
  name: '爱吃烧饼的大熊猫',
  en: 'Sesame Panda',
  description: '爱吃烧饼的大熊猫的笔记站：力学、机器人、仿真与笔记',
  github: 'https://github.com/weijianguizhou',
  email: 'wei_zhou@njust.edu.cn'
}

/* ============================================================
 * 语义块类型：定义 / 定理 / 证明 / 例题 / 注
 * 用法：::: definition 轴力 … :::
 * 第一行冒号后的第一个词是类型，其余文字作为块标题，不写标题则用默认词
 * ============================================================ */
const CALLOUTS: Record<string, string> = {
  definition: '定义',
  theorem: '定理',
  proof: '证明',
  example: '例题',
  remark: '注'
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

      // 语义块：::: definition 轴力 … :::
      // 与 VitePress 自带的 info/tip/warning/danger 并存，只是多了「学术笔记」用的五种
      for (const [kind, label] of Object.entries(CALLOUTS)) {
        md.use(container, kind, {
          render(tokens: any[], idx: number) {
            const token = tokens[idx]
            if (token.nesting === 1) {
              const title = token.info.trim().slice(kind.length).trim() || label
              return `<div class="nb nb-${kind}"><p class="nb-title">${title}</p>\n`
            }
            return '</div>\n'
          }
        })
      }
    }
  },

  themeConfig: {
    siteTitle: SITE.name,

    nav: [
      { text: '普通物理', link: '/notes/physics-electromagnetism' },
      { text: '流体力学', link: '/fluids/' },
      { text: 'ROS 2', link: '/ros2/' },
      {
        text: '笔记',
        items: [
          { text: '数据结构', link: '/data-structures/' },
          { text: '写作与排版', link: '/writing/' },
          { text: '材料力学', link: '/notes/mechanics/' },
          { text: '工程数学', link: '/notes/engineering-math/' },
          { text: '概率论', link: '/notes/probability/' },
          { text: '数理统计', link: '/notes/statistics/' }
        ]
      },
      { text: '随笔', link: '/posts/' }
    ],

    sidebar: {
      '/fluids/': [
        {
          text: '流体力学',
          items: [
            { text: '开始之前', link: '/fluids/' },
            { text: '第一章 绪论', link: '/fluids/ch-01-intro' },
            { text: '第二章 流体的物理性质', link: '/fluids/ch-02-properties' },
            { text: '附录 A 张量代数基础', link: '/fluids/ch-03-appendix-a-tensor' },
            { text: '附录 B 场论', link: '/fluids/ch-04-appendix-b-field' }
          ]
        }
      ],
      '/ros2/': [
        {
          text: 'ROS 2 学习记录',
          items: [
            { text: '开始之前', link: '/ros2/' },
            { text: '第一章 · Ubuntu、WSL 与 ROS 简介', link: '/ros2/ch-01-ubuntu-ros' },
            { text: '第二章 · Ubuntu 常用指令', link: '/ros2/ch-02-ubuntu-commands' },
            { text: '第三章 · Ubuntu 环境下编程', link: '/ros2/ch-03-ubuntu-programming' },
            { text: '第四章 · ROS 2 基础', link: '/ros2/ch-04-ros2-fundamentals' },
            { text: '第五章 · ROS 2 环境配置、节点与话题', link: '/ros2/ch-05-ros2-node' },
            { text: '第六章 · 构建节点', link: '/ros2/ch-06-colcon' },
            { text: '第七章 · ROS 2 通信', link: '/ros2/ch-07-communication' }
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
      '/notes/engineering-math/': [
        {
          text: '工程数学',
          items: [
            { text: '开始之前', link: '/notes/engineering-math/' },
            { text: '第一章 复数域与复变函数', link: '/notes/engineering-math/ch-01-complex-field' },
            { text: '第二章 复变函数基础', link: '/notes/engineering-math/ch-02-complex-function' },
            { text: '第三章 解析函数', link: '/notes/engineering-math/ch-03-analytic' },
            { text: '第四章 共形映射', link: '/notes/engineering-math/ch-04-conformal' },
            { text: '第五章 复积分', link: '/notes/engineering-math/ch-05-integral' },
            { text: '第六章 级数', link: '/notes/engineering-math/ch-06-series' },
            { text: '第七章 留数', link: '/notes/engineering-math/ch-07-residue' },
            { text: '第八章 Fourier 变换', link: '/notes/engineering-math/ch-08-fourier' },
            { text: '第九章 Laplace 变换', link: '/notes/engineering-math/ch-09-laplace' },
            { text: '第十章 Z 变换', link: '/notes/engineering-math/ch-10-z-transform' },
            { text: '第十一章 场论', link: '/notes/engineering-math/ch-11-field' }
          ]
        }
      ],
      '/writing/': [
        {
          text: '写作与排版',
          items: [
            { text: '开始之前', link: '/writing/' },
            { text: '一、LaTeX 入门指南', link: '/writing/ch-01-latex' },
            { text: '二、Markdown 小记', link: '/writing/ch-02-markdown' },
            { text: '三、Typst 初体验', link: '/writing/ch-03-typst' }
          ]
        }
      ],
      '/data-structures/': [
        {
          text: '数据结构',
          items: [
            { text: '开始之前', link: '/data-structures/' },
            { text: '第一章 基本概念与算法分析', link: '/data-structures/ch-01-basics' },
            { text: '第二章 线性表：顺序存储', link: '/data-structures/ch-02-sequential-list' },
            { text: '第三章 线性表：链式存储', link: '/data-structures/ch-03-linked-list' },
            { text: '第四章 栈', link: '/data-structures/ch-04-stack' },
            { text: '第五章 队列', link: '/data-structures/ch-05-queue' },
            { text: '第六章 数组与广义表', link: '/data-structures/ch-06-array-generalized-list' },
            { text: '第七章 树与二叉树', link: '/data-structures/ch-07-tree' },
            { text: '第八章 图', link: '/data-structures/ch-08-graph' },
            { text: '第九章 查找', link: '/data-structures/ch-09-search' },
            { text: '第十章 排序', link: '/data-structures/ch-10-sort' }
          ]
        }
      ],
      '/posts/': [
        {
          text: '随笔',
          items: [
            { text: '全部文章', link: '/posts/' },
            { text: '你好，拜访我的人', link: '/posts/hello-world' },
            { text: '日常随笔', link: '/posts/daily-note' }
          ]
        }
      ]
    },

    socialLinks: [
      { icon: 'github', link: SITE.github }
    ],

    search: {
      provider: 'local',
      options: {
        translations: {
          button: {
            buttonText: '搜索',
            buttonAriaLabel: '搜索'
          },
          modal: {
            displayDetails: '显示完整列表',
            resetButtonTitle: '清除查询',
            backButtonTitle: '关闭搜索',
            noResultsText: '没有找到',
            footer: {
              selectText: '选择',
              selectKeyAriaLabel: '回车',
              navigateText: '切换',
              navigateUpKeyAriaLabel: '上箭头',
              navigateDownKeyAriaLabel: '下箭头',
              closeText: '关闭',
              closeKeyAriaLabel: 'Esc'
            }
          }
        }
      }
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
