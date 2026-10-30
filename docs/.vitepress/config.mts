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
      { text: '数字电路', link: '/digital/' },
      { text: '控制工程', link: '/control/' },
      { text: 'Linux', link: '/linux/' },
      { text: 'ROS 2', link: '/ros2/' },
      {
        text: '笔记',
        items: [
          { text: '数据结构', link: '/data-structures/' },
          { text: 'Eigen 库', link: '/notes/eigen/' },
          { text: 'Git 命令', link: '/notes/git/' },
          { text: '写作与排版', link: '/writing/' },
          { text: '材料力学', link: '/notes/mechanics/' },
          { text: '常微分方程', link: '/notes/ode/' },
          { text: '概率论', link: '/notes/probability/' },
          { text: '数理统计', link: '/notes/statistics/' },
          { text: '工程数学', link: '/notes/engineering-math/' },
          { text: '高等代数', link: '/notes/linalg/' }
        ]
      },
      { text: '一些涩话', link: '/posts/' }
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
      '/linux/': [
        {
          text: 'Linux 使用教程',
          items: [
            { text: '开始之前', link: '/linux/' },
            { text: '第一章 Linux 概述与安装', link: '/linux/ch-01-linux-overview' },
            { text: '第二章 文件系统与目录结构', link: '/linux/ch-02-filesystem' },
            { text: '第三章 文件与目录操作', link: '/linux/ch-03-file-operations' },
            { text: '第四章 文本处理', link: '/linux/ch-04-text-processing' },
            { text: '第五章 用户与权限管理', link: '/linux/ch-05-users-permissions' },
            { text: '第六章 进程管理', link: '/linux/ch-06-process-management' },
            { text: '第七章 Shell 脚本基础', link: '/linux/ch-07-shell-scripting' },
            { text: '第八章 软件包管理', link: '/linux/ch-08-package-management' },
            { text: '第九章 网络与远程操作', link: '/linux/ch-09-network-remote' },
            { text: '第十章 系统管理与性能监控', link: '/linux/ch-10-system-monitoring' }
          ]
        }
      ],
      '/digital/': [
        {
          text: '数字电路',
          items: [
            { text: '开始之前', link: '/digital/' },
            { text: '第一章 数制与 BCD 码', link: '/digital/ch-01-number-systems' },
            { text: '第二章 布尔代数', link: '/digital/ch-02-boolean-algebra' },
            { text: '第三章 组合逻辑电路', link: '/digital/ch-03-combinational-logic' },
            { text: '第四章 时序逻辑电路引论', link: '/digital/ch-04-sequential-intro' },
            { text: '第五章 时序逻辑电路的分析与设计', link: '/digital/ch-05-sequential-analysis-design' }
          ]
        }
      ],
      '/control/': [
        {
          text: '控制工程基础',
          items: [
            { text: '开始之前', link: '/control/' },
            { text: '第一章 概论', link: '/control/ch-01-intro' },
            { text: '第二章 控制系统的动态数学模型', link: '/control/ch-02-model' },
            { text: '第三章 时域瞬态响应分析', link: '/control/ch-03-time-response' },
            { text: '第四章 控制系统的频率特性', link: '/control/ch-04-frequency' },
            { text: '第五章 控制系统的稳定性分析', link: '/control/ch-05-stability' },
            { text: '第六章 控制系统的误差分析和计算', link: '/control/ch-06-error' },
            { text: '第七章 控制系统的综合与校正', link: '/control/ch-07-compensation' },
            { text: '第八章 根轨迹法', link: '/control/ch-08-root-locus' },
            { text: '附录 A 典型例题讲解', link: '/control/ch-09-examples' }
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
      '/notes/linalg/': [
        {
          text: '高等代数',
          items: [
            { text: '开始之前', link: '/notes/linalg/' },
            { text: '第一章 多项式', link: '/notes/linalg/ch-01-polynomial' },
            { text: '第二章 行列式', link: '/notes/linalg/ch-02-determinant' },
            { text: '第三章 矩阵', link: '/notes/linalg/ch-03-matrix' },
            { text: '第四章 线性方程组', link: '/notes/linalg/ch-04-linear-systems' },
            { text: '第五章 二次型', link: '/notes/linalg/ch-05-quadratic-forms' },
            { text: '第六章 线性空间', link: '/notes/linalg/ch-06-linear-space' },
            { text: '第七章 线性变换', link: '/notes/linalg/ch-07-linear-transformations' },
            { text: '第八章 λ-矩阵与相似标准形', link: '/notes/linalg/ch-08-lambda-matrix' },
            { text: '第九章 欧氏空间', link: '/notes/linalg/ch-09-euclidean-space' },
            { text: '第十章 双线性函数与对偶空间', link: '/notes/linalg/ch-10-bilinear-dual' },
            { text: '第十一章 解析几何', link: '/notes/linalg/ch-11-analytic-geometry' },
            { text: '附录 A 定理与证明手法', link: '/notes/linalg/ch-12-appendix-a' },
            { text: '附录 B 计算套路', link: '/notes/linalg/ch-13-appendix-b' },
            { text: '附录 C 矩阵求导', link: '/notes/linalg/ch-14-appendix-c' },
            { text: '附录 D 讲义里超出考纲的部分', link: '/notes/linalg/ch-15-appendix-d' },
          ]
        }
      ],
      '/notes/math-analysis/': [
        {
          text: '数学分析',
          items: [
            { text: '第一章 函数极限与连续性', link: '/notes/math-analysis/ch-01-limits' }
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
      '/notes/eigen/': [
        {
          text: 'Eigen 库使用指南',
          items: [
            { text: '开始之前', link: '/notes/eigen/' }
          ]
        },
        {
          text: '基础入门',
          items: [
            { text: '第一章 Matrix 类', link: '/notes/eigen/ch-01-matrix' },
            { text: '第二章 矩阵与向量运算', link: '/notes/eigen/ch-02-vector-ops' },
            { text: '第三章 数组类与系数运算', link: '/notes/eigen/ch-03-array' }
          ]
        },
        {
          text: '高级操作',
          items: [
            { text: '第四章 块操作', link: '/notes/eigen/ch-04-block' },
            { text: '第五章 高级初始化', link: '/notes/eigen/ch-05-init' },
            { text: '第六章 切片与索引', link: '/notes/eigen/ch-06-slice' },
            { text: '第七章 归约、访问者与广播', link: '/notes/eigen/ch-07-reduction' }
          ]
        },
        {
          text: '线性求解',
          items: [
            { text: '第八章 分解概述与选择', link: '/notes/eigen/ch-08-decomposition' },
            { text: '第九章 LU 分解', link: '/notes/eigen/ch-09-lu' },
            { text: '第十章 QR 分解与最小二乘', link: '/notes/eigen/ch-10-qr' },
            { text: '第十一章 Cholesky 分解', link: '/notes/eigen/ch-11-cholesky' },
            { text: '第十二章 SVD 分解', link: '/notes/eigen/ch-12-svd' },
            { text: '第十三章 特征值与特征向量', link: '/notes/eigen/ch-13-eigen' }
          ]
        },
        {
          text: '几何变换',
          items: [
            { text: '第十四章 旋转的表达', link: '/notes/eigen/ch-14-rotation' },
            { text: '第十五章 仿射变换', link: '/notes/eigen/ch-15-affine' },
            { text: '第十六章 几何实战', link: '/notes/eigen/ch-16-geometry' }
          ]
        },
        {
          text: '实战应用',
          items: [
            { text: '第十七章 最小二乘与 PCA', link: '/notes/eigen/ch-17-least-squares-pca' },
            { text: '第十八章 卡尔曼滤波与点云配准', link: '/notes/eigen/ch-18-kalman-icp' },
            { text: '第十九章 数值求解与性能技巧', link: '/notes/eigen/ch-19-numerics' }
          ]
        }
      ],
      '/notes/git/': [
        {
          text: 'Git 命令笔记',
          items: [
            { text: '开始之前', link: '/notes/git/' },
            { text: '第一章 安装与全局配置', link: '/notes/git/ch-01-install' },
            { text: '第二章 首次初始化与日常流程', link: '/notes/git/ch-02-workflow' },
            { text: '第三章 版本回溯与远程同步', link: '/notes/git/ch-03-history' },
            { text: '第四章 常见报错处理', link: '/notes/git/ch-04-errors' },
            { text: '第五章 .gitignore 配置', link: '/notes/git/ch-05-gitignore' },
            { text: '第六章 Windows 高频踩坑', link: '/notes/git/ch-06-windows' }
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
          text: '一些涩话',
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
