<script setup lang="ts">
import { computed, ref } from 'vue'
import VPNavBarSearch from 'vitepress/dist/client/theme-default/components/VPNavBarSearch.vue'

/* ============================================================
 * 首页。改内容只看这一段的三个数组：profile / recent / sections
 * ============================================================ */

/** 索引区外观：
 *  'list'  —— 单列细线目录，一屏能看到 5 个方向（默认，最安静）
 *  'cards' —— 双列带封面图的卡片，点开变全宽
 */
const INDEX_STYLE: 'list' | 'cards' = 'list'

type Tone = 'sage' | 'mist' | 'stone' | 'clay' | 'sand' | 'violet' | 'teal' | 'amber' | 'umber'

type Note = {
  title: string
  cover: string
  meta: string
  desc: string
  link: string
  lang: string
  tone: Tone
  badge?: string
  chapters: number
  image?: string
}

type Section = {
  id: string
  title: string
  en: string
  desc: string
  tone: Tone
  notes: Note[]
  /** 收尾卡：跨列显示，右侧补一段「关于本站」 */
  closing?: boolean
}

const profile = {
  name: '爱吃烧饼的大熊猫',
  en: 'Sesame Panda',
  tagline: '一个对力学和机器人感兴趣的本科生~',
  facts: ['南京理工大学', '力学与机器人'],
  github: 'https://github.com/weijianguizhou',
  email: 'wei_zhou@njust.edu.cn'
}

/** 刊头第二行的方向链接（顺序 = 页面顺序） */
const topLinks = [
  { text: '普通物理', link: '/notes/physics-electromagnetism' },
  { text: '流体力学', link: '/fluids/' },
  { text: '数字电路', link: '/digital/' },
  { text: '控制工程', link: '/control/' },
  { text: 'Linux', link: '/linux/' },
  { text: 'ROS 2', link: '/ros2/' },
  { text: '数据结构', link: '/data-structures/' },
  { text: '写作与排版', link: '/writing/' },
  { text: '随笔', link: '/posts/' }
]

/** 最近更新：手动维护，一条一行，按时间倒序 */
const recent = [
  { tag: '控制', title: '控制工程：第八章 根轨迹法与典型例题', link: '/control/', date: '10-30' },
  { tag: 'Linux', title: '新增 Linux 使用教程（10 章连载）', link: '/linux/', date: '10-30' },
  { tag: '数字电路', title: '补入第三至五章：组合逻辑、时序分析与设计', link: '/digital/', date: '10-28' },
  { tag: '计算机', title: '新增 Eigen 库指南（19 章）与 Git 命令笔记', link: '/notes/eigen/', date: '10-28' },
  { tag: '数据结构', title: '上线数据结构连载（10 章）与随笔分区', link: '/data-structures/', date: '10-26' }
]

/** 九个方向。tone 决定卡片底色和左侧色条 */
const sections: Section[] = [
  {
    id: 'robotics',
    title: '机器人',
    en: 'ROBOTICS',
    desc: 'ROS 2 从 Ubuntu、WSL 环境一路到节点编译的完整记录，全是踩过的坑。',
    tone: 'sage',
    notes: [
      {
        title: 'ROS 2 学习记录（连载）',
        cover: 'ROS 2',
        meta: '2026 年 10 月 · 7 章',
        desc: '从 Ubuntu、WSL 环境一路到 ROS 2 架构与编译，全是踩过的坑。',
        link: '/ros2/',
        lang: 'UBUNTU 26.04',
        tone: 'sage',
        badge: '连载',
        chapters: 7,
        image: '/ros2/talker-listener.webp'
      }
    ]
  },
  {
    id: 'electronics',
    title: '电子',
    en: 'ELECTRONICS',
    desc: '数字电路：数制与编码、布尔代数、组合与时序逻辑，配电路图与芯片符号。',
    tone: 'mist',
    notes: [
      {
        title: '数字电路（连载）',
        cover: '数字电路',
        meta: '2026 · 5 章',
        desc: '数制与编码、布尔代数、组合与时序逻辑，配电路图与芯片符号。',
        link: '/digital/',
        lang: 'DIGITAL CIRCUITS',
        tone: 'sand',
        badge: '连载',
        chapters: 5,
        image: '/digital/and-circuit.webp'
      }
    ]
  },
  {
    id: 'physics',
    title: '物理',
    en: 'PHYSICS',
    desc: '静电场、电磁感应、热辐射、原子物理与物理实验，公式按篇排版。',
    tone: 'stone',
    notes: [
      {
        title: '电磁学笔记',
        cover: '电磁学',
        meta: '2026 · 静电场到电磁波',
        desc: '静电场、导体与电介质、稳恒磁场、电磁感应、麦克斯韦方程组与电磁波。',
        link: '/notes/physics-electromagnetism',
        lang: 'ELECTROMAGNETISM',
        tone: 'stone',
        badge: '笔记',
        chapters: 1,
        image: '/physics/electric-field.jpg'
      },
      {
        title: '量子物理笔记',
        cover: '量子物理',
        meta: '2026 · 热辐射到量子力学',
        desc: '热辐射与光的粒子性、原子的核式结构、玻尔模型、物质波、量子力学基础。',
        link: '/notes/physics-quantum',
        lang: 'QUANTUM PHYSICS',
        tone: 'mist',
        badge: '笔记',
        chapters: 1,
        image: '/physics/compton-scattering.webp'
      },
      {
        title: '原子物理笔记',
        cover: '原子物理',
        meta: '2026 · 碱金属到壳层结构',
        desc: '碱金属原子、多电子原子、原子的壳层结构，含 LS 与 jj 耦合的能级图。',
        link: '/notes/physics-atoms',
        lang: 'ATOMIC PHYSICS',
        tone: 'clay',
        badge: '笔记',
        chapters: 1,
        image: '/physics/rutherford-scattering.webp'
      },
      {
        title: '普通物理实验',
        cover: '物理实验',
        meta: '2026 · 九个实验',
        desc: '迈克尔逊干涉仪、衍射光栅、三棱镜等九个实验的原理与 MOOC 题整理。',
        link: '/notes/physics-labs',
        lang: 'PHYSICS LABS',
        tone: 'sage',
        badge: '实验',
        chapters: 1,
        image: '/physics/michelson-principle.webp'
      }
    ]
  },
  {
    id: 'mechanics',
    title: '力学与工程',
    en: 'MECHANICS & ENGINEERING',
    desc: '从材料力学的强度、刚度、稳定性，到流体力学的连续介质模型与张量。',
    tone: 'clay',
    notes: [
      {
        title: '材料力学',
        cover: '材料力学',
        meta: '2026 · 13 章 + 附录',
        desc: '从轴向拉压到能量法，低碳钢拉伸曲线、应力单元体都在里面。',
        link: '/notes/mechanics/',
        lang: 'MECHANICS',
        tone: 'clay',
        badge: '已学完',
        chapters: 14,
        image: '/mechanics/mild-steel-curve.webp'
      },
      {
        title: '流体力学（连载）',
        cover: '流体力学',
        meta: '2026 年 10 月 · 课程笔记',
        desc: '从连续介质模型、粘性到界面现象，张量代数与场论放在附录，公式都排版好了。',
        link: '/fluids/',
        lang: 'FLUID MECHANICS',
        tone: 'mist',
        badge: '连载',
        chapters: 2,
        image: '/fluids/stress-state.webp'
      }
    ]
  },
  {
    id: 'control',
    title: '控制',
    en: 'CONTROL',
    desc: '古典控制理论：建模、时域响应、频率特性、稳定性、误差、校正与根轨迹。',
    tone: 'sand',
    notes: [
      {
        title: '控制工程基础（连载）',
        cover: '控制工程',
        meta: '2026 年 10 月 · 8 章 + 例题',
        desc: '从微分方程与传递函数讲起，走完时域、频域、稳定性、稳态误差、校正与根轨迹，附典型例题。',
        link: '/control/',
        lang: 'CONTROL ENGINEERING',
        tone: 'stone',
        badge: '连载',
        chapters: 9,
        image: '/control/thermostat-system.webp'
      }
    ]
  },
  {
    id: 'math',
    title: '数学基础',
    en: 'MATHEMATICS',
    desc: '工程数学、常微分方程、概率论与数理统计：公式推导和速查表按章整理。',
    tone: 'violet',
    notes: [
      {
        title: '数学分析',
        cover: '数学分析',
        meta: '2026 · 第 1 章',
        desc: '第一章：函数极限与连续性——极限的 ε-δ 定义、无穷小量的阶、连续函数与闭区间上的性质。',
        link: '/notes/math-analysis/ch-01-limits',
        lang: 'MATHEMATICAL ANALYSIS',
        tone: 'stone',
        badge: '更新中',
        chapters: 1,
        image: '/math-analysis/fig-03-36ad41c2.webp'
      },
      {
        title: '高等代数笔记',
        cover: '高等代数',
        meta: '2026 · 11 章 + 4 附录',
        desc: '多项式、行列式、矩阵、线性方程组、二次型、线性空间与线性变换、λ-矩阵、欧氏空间与对偶空间。',
        link: '/notes/linalg/',
        lang: 'HIGHER ALGEBRA',
        tone: 'sage',
        badge: '已学完',
        chapters: 11,
        image: '/notes/linalg.webp'
      },
      {
        title: '工程数学',
        cover: '工程数学',
        meta: '2026 · 11 章连载',
        desc: '复变函数、级数、留数、Fourier 与 Laplace 变换、场论，按章整理。',
        link: '/notes/engineering-math/',
        lang: 'ENGINEERING MATH',
        tone: 'mist',
        badge: '已学完',
        chapters: 11,
        image: '/notes/emath-fourier.png'
      },
      {
        title: '常微分方程',
        cover: '常微分方程',
        meta: '2026 · 6 章',
        desc: '初等积分法、解的存在定理、高阶方程、线性方程组与非线性方程。',
        link: '/notes/ode/',
        lang: 'ODE',
        tone: 'stone',
        badge: '已学完',
        chapters: 6,
        image: '/notes/ode-lorenz.png'
      },
      {
        title: '概率论',
        cover: '概率论',
        meta: '2026 · 4 章',
        desc: '随机事件、随机变量、多维随机变量与数字特征。',
        link: '/notes/probability/',
        lang: 'PROBABILITY',
        tone: 'sage',
        badge: '已学完',
        chapters: 4,
        image: '/notes/prob-1.webp'
      },
      {
        title: '数理统计',
        cover: '数理统计',
        meta: '2026 · 3 章',
        desc: '基本概念、参数估计与假设检验，配 χ² 与 t 分布图。',
        link: '/notes/statistics/',
        lang: 'STATISTICS',
        tone: 'clay',
        badge: '已学完',
        chapters: 3,
        image: '/notes/chi2-density.webp'
      }
    ]
  },
  {
    id: 'computer',
    title: '计算机',
    en: 'COMPUTER SCIENCE',
    desc: '数据结构、Eigen 库、Git 与 Linux：从基本概念、矩阵分解到版本管理。',
    tone: 'teal',
    notes: [
      {
        title: '数据结构（10 章）',
        cover: '数据结构',
        meta: '2026 年 10 月 · 10 章 + 习题',
        desc: '基本概念、线性表、栈与队列、数组、树、图、查找与排序，含原始笔记图示与课后习题解答。',
        link: '/data-structures/',
        lang: 'DATA STRUCTURES',
        tone: 'sage',
        badge: '连载',
        chapters: 10,
        image: '/data-structures/ch01-fig01.webp'
      },
      {
        title: 'Eigen 库使用指南（19 章）',
        cover: 'Eigen',
        meta: '2026 年 10 月 · 19 章',
        desc: '从 Matrix 类、块操作与归约，到 LU / QR / SVD 分解、旋转与仿射变换，再到卡尔曼滤波与点云配准。',
        link: '/notes/eigen/',
        lang: 'EIGEN / C++',
        tone: 'clay',
        badge: '连载',
        chapters: 19,
        image: '/eigen/eigen.png'
      },
      {
        title: 'Git 命令笔记（6 章）',
        cover: 'Git',
        meta: '2026 年 10 月 · 6 章',
        desc: '安装与全局配置、日常四步、版本回溯、常见报错处理与 .gitignore，附 Windows 高频踩坑。',
        link: '/notes/git/',
        lang: 'GIT',
        tone: 'stone',
        badge: '速查',
        chapters: 6
      },
      {
        title: 'Linux 使用教程（连载）',
        cover: 'Linux',
        meta: '2026 年 10 月 · 10 章',
        desc: '操作系统概念、文件系统与权限、Shell 脚本、包管理与系统运维，每章配实操示例和习题。',
        link: '/linux/',
        lang: 'LINUX',
        tone: 'mist',
        badge: '连载',
        chapters: 10
      }
    ]
  },
  {
    id: 'writing',
    title: '写作与排版',
    en: 'WRITING & TYPESETTING',
    desc: 'LaTeX、Markdown、Typst 三套写作工具的使用记录：装环境踩的坑、常用语法，和各自适合写什么。',
    tone: 'amber',
    notes: [
      {
        title: 'LaTeX 入门指南',
        cover: 'LaTeX',
        meta: '2026 年 10 月 · 入门手册',
        desc: '从 TeX Live 装了 20 个小时，到公式、表格、交叉引用——写给朋友，也写给以后忘了命令的自己。',
        link: '/writing/ch-01-latex',
        lang: 'LATEX',
        tone: 'sand',
        badge: '入门',
        chapters: 1,
        image: '/writing/latex-cover.webp'
      },
      {
        title: 'Markdown 小记',
        cover: 'Markdown',
        meta: '2026 年 9 月 · 语法与编辑器',
        desc: 'Obsidian 和 VSCode 怎么选，标题、表格、公式怎么写；被同学问出来的速查小抄。',
        link: '/writing/ch-02-markdown',
        lang: 'MARKDOWN',
        tone: 'sage',
        badge: '小记',
        chapters: 1,
        image: '/writing/markdown-cover.webp'
      },
      {
        title: 'Typst 初体验',
        cover: 'Typst',
        meta: '2026 年 10 月 · 新工具试写',
        desc: '花一晚上照官方教程走了一遍：标记更轻、预览更实时，公式和图片还顺手吗？',
        link: '/writing/ch-03-typst',
        lang: 'TYPST',
        tone: 'mist',
        badge: '尝鲜',
        chapters: 1,
        image: '/writing/typst-glacier.webp'
      }
    ]
  },
  {
    id: 'essays',
    title: '随笔',
    en: 'ESSAYS',
    desc: '一些没头没尾的念头、读书与写作的碎片，顺手记在这里。',
    tone: 'umber',
    closing: true,
    notes: [
      {
        title: '一些涩话',
        cover: '随笔',
        meta: '2026 年 10 月 · 随笔与自述',
        desc: '自我介绍、日常随笔，以及“你好，拜访我的人”——写给朋友，也写给以后的自己。',
        link: '/posts/',
        lang: 'ESSAYS',
        tone: 'clay',
        badge: '随笔',
        chapters: 2,
        image: '/avatar.jpg'
      }
    ]
  }
]

/* ============================================================
 * 逻辑：手风琴一次只开一个；统计数字从 sections 算
 * ============================================================ */
const openId = ref<string | null>(null)

function toggle(id: string) {
  openId.value = openId.value === id ? null : id
}

const isExternal = (link: string) => /^https?:\/\//.test(link)

const chaptersOf = (s: Section) => s.notes.reduce((n, item) => n + item.chapters, 0)
const totalNotes = computed(() => sections.reduce((n, s) => n + s.notes.length, 0))
const totalChapters = computed(() => sections.reduce((n, s) => n + chaptersOf(s), 0))
const totalSections = sections.length

/** 卡片样式下每条分区顶部的代表图：取第一篇有图的笔记 */
const stripOf = (s: Section) => s.notes.find((n) => n.image)?.image

const year = new Date().getFullYear()
</script>

<template>
  <div class="page" :class="`style-${INDEX_STYLE}`">
    <!-- ===== 刊头：刊名 + 联系方式 + 方向行（不吸顶） ===== -->
    <header class="mast">
      <div class="wrap">
        <div class="mast-top">
          <a class="mast-name" href="/">{{ profile.en }}</a>
          <div class="mast-meta">
            <a :href="profile.github" target="_blank" rel="noreferrer">GitHub ↗</a>
            <span class="dot">·</span>
            <VPNavBarSearch />
          </div>
        </div>
        <nav class="mast-nav">
          <a v-for="l in topLinks" :key="l.link" :href="l.link">{{ l.text }}</a>
        </nav>
      </div>
    </header>

    <div class="wrap">
      <!-- ===== Hero ===== -->
      <section class="hero">
        <div class="hero-main">
          <h1>{{ profile.name }}</h1>
          <p class="tagline">{{ profile.tagline }}</p>
          <ul class="facts">
            <li v-for="f in profile.facts" :key="f">{{ f }}</li>
          </ul>
          <p class="contact">
            <a :href="profile.github" target="_blank" rel="noreferrer">GitHub</a>
            <span class="dot">·</span>
            <a :href="`mailto:${profile.email}`">{{ profile.email }}</a>
            <span class="dot">·</span>
            <a href="/posts/">一些涩话</a>
          </p>
        </div>
        <div class="hero-side">
          <img class="photo" src="/avatar.jpg" :alt="profile.name" width="132" height="132" />
          <dl class="stats">
            <div><dt>{{ totalNotes }}</dt><dd>份笔记</dd></div>
            <div><dt>{{ totalChapters }}</dt><dd>章正文</dd></div>
            <div><dt>{{ totalSections }}</dt><dd>个方向</dd></div>
          </dl>
        </div>
      </section>

      <!-- ===== 最近更新 ===== -->
      <section class="recent">
        <div class="sec-head">
          <h2>最近更新</h2>
          <span class="en">RECENT</span>
          <span class="rule" />
        </div>
        <ul class="upd">
          <li v-for="r in recent" :key="r.title">
            <a :href="r.link">
              <span class="upd-tag">{{ r.tag }}</span>
              <span class="upd-title">{{ r.title }}</span>
              <span class="upd-date">{{ r.date }}</span>
            </a>
          </li>
        </ul>
      </section>

      <!-- ===== 索引 ===== -->
      <section class="index">
        <div class="sec-head">
          <h2>全部笔记</h2>
          <span class="en">INDEX</span>
          <span class="rule" />
          <span class="more">点开看课程卡片</span>
        </div>

        <div class="grid">
          <article
            v-for="(s, i) in sections"
            :key="s.id"
            class="card"
            :class="[`t-${s.tone}`, { 'is-open': openId === s.id, 'is-closing': s.closing }]"
          >
            <div v-if="INDEX_STYLE === 'cards' && stripOf(s)" class="strip">
              <span class="num">{{ String(i + 1).padStart(2, '0') }}</span>
              <img :src="stripOf(s)" :alt="`${s.title}代表图`" loading="lazy" decoding="async" />
            </div>

            <button
              type="button"
              class="card-head"
              :aria-expanded="openId === s.id"
              :aria-controls="`panel-${s.id}`"
              @click="toggle(s.id)"
            >
              <span class="card-idx">{{ String(i + 1).padStart(2, '0') }}</span>
              <span class="card-main">
                <span class="card-en">{{ s.en }}</span>
                <span class="card-title">{{ s.title }}</span>
                <span class="card-desc">{{ s.desc }}</span>
                <span v-if="INDEX_STYLE === 'cards'" class="card-chips">
                  <span v-for="n in s.notes" :key="n.title" class="chip">{{ n.cover }}</span>
                </span>

                <span v-if="s.closing" class="closing">
                  <span class="closing-p">
                    这个站是我本科阶段学习笔记的公开存档：用 VitePress 写成，公式走 KaTeX，
                    图片压成 webp。写得不一定对，但都是我真正算过一遍的东西。
                  </span>
                  <span class="closing-links">
                    <a :href="profile.github" target="_blank" rel="noreferrer">GitHub</a>
                    <a :href="`mailto:${profile.email}`">邮件</a>
                    <a href="/posts/">随笔</a>
                    <a href="/about">关于</a>
                  </span>
                </span>
              </span>
              <span class="card-right">
                <span class="count">{{ s.notes.length }} 份 · {{ chaptersOf(s) }} 章</span>
                <span class="chev" aria-hidden="true" />
              </span>
            </button>

            <div :id="`panel-${s.id}`" class="panel">
              <div class="panel-clip">
                <div class="panel-body">
                  <div class="notes" :class="{ one: s.notes.length === 1 }">
                    <div v-for="p in s.notes" :key="p.title" class="note" :class="`t-${p.tone}`">
                      <a
                        class="cover"
                        :href="p.link"
                        :target="isExternal(p.link) ? '_blank' : undefined"
                        :rel="isExternal(p.link) ? 'noreferrer' : undefined"
                      >
                        <img v-if="p.image" :src="p.image" :alt="`${p.title} 代表图`" loading="lazy" />
                        <span class="cover-lang">{{ p.lang }}</span>
                      </a>
                      <h3>
                        <a
                          :href="p.link"
                          :target="isExternal(p.link) ? '_blank' : undefined"
                          :rel="isExternal(p.link) ? 'noreferrer' : undefined"
                        >{{ p.title }}</a>
                      </h3>
                      <p class="note-meta">
                        <span v-if="p.badge" class="badge">{{ p.badge }}</span>{{ p.meta }}
                      </p>
                      <p class="note-desc">{{ p.desc }}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </article>
        </div>
      </section>
    </div>

    <footer class="foot">
      <div class="wrap">
        <span>© {{ year }} {{ profile.name }}</span>
        <span>用 VitePress 搭建 · 部署在 GitHub Pages</span>
      </div>
    </footer>
  </div>
</template>

<style scoped>
/* ===== 骨架 ===== */
.page {
  min-height: 100vh;
  background: var(--av-bg);
  color: var(--av-fg);
}

.wrap {
  max-width: 68rem;
  margin: 0 auto;
  padding: 0 2rem;
}

/* ===== 刊头 ===== */
.mast {
  border-bottom: 1px solid var(--av-border);
}

.mast .wrap {
  padding-top: 1.5rem;
  padding-bottom: 0.9rem;
}

.mast-top {
  display: flex;
  align-items: baseline;
  justify-content: space-between;
  gap: 2rem;
}

.mast-name {
  font-family: var(--av-mono);
  font-size: 0.68rem;
  letter-spacing: 0.22em;
  text-transform: uppercase;
  color: var(--av-sub);
  white-space: nowrap;
}

.mast-name:hover {
  color: var(--av-fg);
}

.mast-meta {
  display: flex;
  align-items: center;
  gap: 0.7rem;
  font-family: var(--av-sans);
  font-size: 0.76rem;
  color: var(--av-muted);
  white-space: nowrap;
}

.mast-meta a:hover {
  color: var(--av-fg);
}

.mast-meta .dot {
  color: var(--av-border);
}

/* 刊头里的搜索：去掉默认的方框胶囊，只留一行文字 */
.mast-meta :deep(.VPNavBarSearch) {
  padding-left: 0;
  flex-grow: 0;
}

.mast-meta :deep(.DocSearch-Button) {
  height: auto;
  padding: 0;
  border: 0;
  border-radius: 0;
  background: transparent;
  font-size: 0.76rem;
  color: var(--av-muted);
}

.mast-meta :deep(.DocSearch-Button:hover) {
  background: transparent;
  color: var(--av-fg);
}

.mast-meta :deep(.DocSearch-Button-Keys),
.mast-meta :deep(.DocSearch-Search-Icon) {
  display: none;
}

.mast-meta :deep(.DocSearch-Button-Placeholder) {
  font-size: 0.76rem;
  padding: 0;
}

.mast-nav {
  display: flex;
  flex-wrap: wrap;
  gap: 1.45rem;
  margin-top: 0.85rem;
  font-family: var(--av-sans);
  font-size: 0.82rem;
  color: var(--av-sub);
}

.mast-nav a {
  position: relative;
  padding-bottom: 1px;
}

.mast-nav a::after {
  content: '';
  position: absolute;
  left: 0;
  bottom: 0;
  height: 1px;
  width: 0;
  background: currentColor;
  transition: width 0.2s ease;
}

.mast-nav a:hover {
  color: var(--av-accent);
}

.mast-nav a:hover::after {
  width: 100%;
}

/* ===== Hero ===== */
.hero {
  display: grid;
  grid-template-columns: minmax(0, 1fr) auto;
  gap: 2.5rem;
  align-items: start;
  padding: 2.9rem 0 2.2rem;
}

h1 {
  margin: 0 0 0.5rem;
  font-size: 2.55rem;
  line-height: 1.15;
  font-weight: 700;
  letter-spacing: -0.02em;
}

.tagline {
  margin: 0 0 1rem;
  font-size: 1.02rem;
  color: var(--av-sub);
}

.facts {
  display: flex;
  flex-wrap: wrap;
  gap: 0.4rem;
  margin: 0 0 1.1rem;
  padding: 0;
  list-style: none;
}

.facts li {
  font-family: var(--av-sans);
  font-size: 0.76rem;
  color: var(--av-sub);
  border: 1px solid var(--av-border);
  border-radius: 999px;
  padding: 0.16rem 0.6rem;
  background: var(--av-card);
}

.contact {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 0.55rem;
  margin: 0;
  font-family: var(--av-sans);
  font-size: 0.84rem;
  color: var(--av-muted);
}

.contact a {
  color: var(--av-fg);
  border-bottom: 1px solid var(--av-border);
  padding-bottom: 1px;
  white-space: nowrap;
}

.contact a:hover {
  border-bottom-color: var(--av-fg);
}

.contact .dot {
  color: var(--av-border);
}

.hero-side {
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  gap: 1.1rem;
}

.photo {
  width: 132px;
  height: 132px;
  object-fit: cover;
  border-radius: 12px;
  border: 1px solid var(--av-border);
}

.stats {
  display: flex;
  gap: 1.4rem;
  margin: 0;
}

.stats div {
  border-left: 1px solid var(--av-border);
  padding-left: 1rem;
}

.stats dt {
  font-family: var(--av-mono);
  font-size: 1.28rem;
  font-weight: 600;
  letter-spacing: -0.02em;
  line-height: 1.2;
}

.stats dd {
  margin: 0;
  font-family: var(--av-sans);
  font-size: 0.72rem;
  color: var(--av-muted);
  letter-spacing: 0.04em;
}

/* ===== 区块标题 ===== */
.sec-head {
  display: flex;
  align-items: baseline;
  gap: 0.8rem;
  margin: 0 0 1.1rem;
}

.sec-head h2 {
  margin: 0;
  font-size: 1.18rem;
  font-weight: 650;
  letter-spacing: -0.01em;
}

.sec-head .en {
  font-family: var(--av-mono);
  font-size: 0.64rem;
  letter-spacing: 0.18em;
  text-transform: uppercase;
  color: var(--av-muted);
}

.sec-head .rule {
  flex: 1;
  height: 1px;
  background: var(--av-border);
}

.sec-head .more {
  font-family: var(--av-sans);
  font-size: 0.76rem;
  color: var(--av-muted);
}

/* ===== 最近更新 ===== */
.recent {
  padding-bottom: 2.6rem;
}

.upd {
  margin: 0;
  padding: 0;
  list-style: none;
  border-top: 1px solid var(--av-border);
}

.upd li {
  border-bottom: 1px solid var(--av-border);
}

.upd a {
  display: grid;
  grid-template-columns: 6rem 1fr auto;
  gap: 1rem;
  align-items: center;
  padding: 0.62rem 0;
}

.upd a:hover .upd-title {
  color: var(--av-accent);
}

.upd-tag {
  font-family: var(--av-mono);
  font-size: 0.64rem;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: var(--av-muted);
}

.upd-title {
  font-size: 0.94rem;
  transition: color 0.16s ease;
}

.upd-date {
  font-family: var(--av-mono);
  font-size: 0.7rem;
  color: var(--av-muted);
}

/* ===== 方向配色：真实色相，深浅各一套 ===== */
.t-sage   { --tone: #4e6852; --tint: #e9eee7; }
.t-mist   { --tone: #546876; --tint: #e8edf0; }
.t-stone  { --tone: #585c68; --tint: #e9eaee; }
.t-clay   { --tone: #7e5240; --tint: #f3e9e3; }
.t-sand   { --tone: #78603c; --tint: #f4eddd; }
.t-violet { --tone: #5a5470; --tint: #eae8f1; }
.t-teal   { --tone: #456b6b; --tint: #e5efed; }
.t-amber  { --tone: #8a6b34; --tint: #f5eedb; }
.t-umber  { --tone: #6b5b52; --tint: #efe9e5; }

:global(html.dark) .t-sage   { --tone: #8fb397; --tint: #1b211c; }
:global(html.dark) .t-mist   { --tone: #93b0c2; --tint: #1a2126; }
:global(html.dark) .t-stone  { --tone: #9aa0b0; --tint: #1c1e23; }
:global(html.dark) .t-clay   { --tone: #c09079; --tint: #271a15; }
:global(html.dark) .t-sand   { --tone: #c3a066; --tint: #272115; }
:global(html.dark) .t-violet { --tone: #a49dc4; --tint: #1e1b26; }
:global(html.dark) .t-teal   { --tone: #7fb5ad; --tint: #182323; }
:global(html.dark) .t-amber  { --tone: #c7a862; --tint: #262013; }
:global(html.dark) .t-umber  { --tone: #b39c90; --tint: #211c19; }

/* ===== 索引 ===== */
.index {
  padding-bottom: 3rem;
}

.grid {
  display: grid;
  gap: 0.9rem;
}

.card {
  position: relative;
  overflow: hidden;
  border: 1px solid var(--av-border);
  border-radius: 14px;
  background: var(--tint);
  transition: border-color 0.18s ease, transform 0.18s ease, box-shadow 0.18s ease,
    background-color 0.18s ease;
}

.card::before {
  content: '';
  position: absolute;
  left: 0;
  top: 0;
  bottom: 0;
  width: 3px;
  background: var(--tone);
  opacity: 0.62;
  transition: opacity 0.18s ease;
  z-index: 3;
}

.card:hover::before,
.card.is-open::before {
  opacity: 1;
}

.card.is-open {
  border-color: var(--av-fg);
  box-shadow: 0 16px 44px rgba(0, 0, 0, 0.08);
}

.card-head {
  position: relative;
  display: grid;
  grid-template-columns: minmax(0, 1fr) auto;
  gap: 1rem;
  width: 100%;
  padding: 1.05rem 1.3rem 1.05rem 1.45rem;
  border: 0;
  background: transparent;
  font: inherit;
  color: inherit;
  text-align: left;
  cursor: pointer;
}

.card-head:focus-visible {
  outline: 2px solid var(--av-accent);
  outline-offset: -3px;
}

.card-idx {
  display: none;
  font-family: var(--av-mono);
  font-size: 0.68rem;
  color: var(--tone);
}

.card-main {
  display: flex;
  flex-direction: column;
  min-width: 0;
}

.card-en {
  font-family: var(--av-mono);
  font-size: 0.6rem;
  letter-spacing: 0.16em;
  text-transform: uppercase;
  color: var(--av-muted);
  margin-bottom: 0.16rem;
}

.card-title {
  display: block;
  font-size: 1.24rem;
  font-weight: 650;
  letter-spacing: -0.01em;
  line-height: 1.35;
}

.card-desc {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  margin-top: 0.35rem;
  font-size: 0.84rem;
  line-height: 1.65;
  color: var(--av-sub);
}

.card-chips {
  display: flex;
  flex-wrap: wrap;
  gap: 0.3rem;
  margin-top: 0.85rem;
}

.chip {
  font-family: var(--av-sans);
  font-size: 0.68rem;
  color: var(--av-sub);
  border: 1px solid color-mix(in srgb, var(--tone) 20%, transparent);
  border-radius: 999px;
  padding: 0.04rem 0.45rem;
  background: color-mix(in srgb, var(--av-bg) 70%, transparent);
}

.card-right {
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  justify-content: center;
  gap: 0.45rem;
}

.count {
  font-family: var(--av-mono);
  font-size: 0.68rem;
  color: var(--tone);
  opacity: 0.9;
  white-space: nowrap;
}

.chev {
  width: 7px;
  height: 7px;
  border-right: 1.5px solid var(--av-sub);
  border-bottom: 1.5px solid var(--av-sub);
  transform: rotate(45deg);
  transition: transform 0.24s ease;
}

.card.is-open .chev {
  transform: rotate(225deg);
}

/* 收尾卡里的「关于本站」 */
.closing {
  display: block;
  margin-top: 0.55rem;
  max-width: 44rem;
}

.closing-p {
  display: block;
  font-size: 0.86rem;
  line-height: 1.75;
  color: var(--av-sub);
}

.closing-links {
  display: flex;
  flex-wrap: wrap;
  gap: 1.1rem;
  margin-top: 0.9rem;
  font-family: var(--av-sans);
  font-size: 0.8rem;
}

.closing-links a {
  color: var(--av-fg);
  border-bottom: 1px solid var(--av-border);
  padding-bottom: 1px;
}

.closing-links a:hover {
  border-bottom-color: var(--av-fg);
}

/* 展开面板 */
.panel {
  display: grid;
  grid-template-rows: 0fr;
  transition: grid-template-rows 0.38s cubic-bezier(0.22, 0.61, 0.36, 1);
}

.card.is-open .panel {
  grid-template-rows: 1fr;
}

.panel-clip {
  min-height: 0;
  overflow: hidden;
}

.panel-body {
  padding: 0 1.45rem 1.2rem;
}

.notes {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1.5rem 1.4rem;
  padding-top: 1.1rem;
  border-top: 1px solid color-mix(in srgb, var(--tone) 24%, transparent);
}

.cover {
  position: relative;
  display: block;
  overflow: hidden;
  aspect-ratio: 16 / 10;
  border-radius: 9px;
  border: 1px solid var(--av-border);
  background: var(--av-card);
}

.cover img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
  transition: transform 0.5s ease;
}

.cover:hover img {
  transform: scale(1.04);
}

.cover-lang {
  position: absolute;
  left: 0.7rem;
  top: 0.6rem;
  font-family: var(--av-mono);
  font-size: 0.6rem;
  letter-spacing: 0.13em;
  text-transform: uppercase;
  color: #fff;
  text-shadow: 0 1px 8px rgba(0, 0, 0, 0.65);
}

.note h3 {
  margin: 0.75rem 0 0.15rem;
  font-size: 0.98rem;
  font-weight: 600;
}

.note h3 a:hover {
  color: var(--av-accent);
}

.note-meta {
  display: flex;
  align-items: center;
  gap: 0.45rem;
  margin: 0;
  font-family: var(--av-sans);
  font-size: 0.72rem;
  color: var(--av-muted);
}

.badge {
  font-family: var(--av-sans);
  font-size: 0.62rem;
  padding: 0.02rem 0.32rem;
  border-radius: 4px;
  background: color-mix(in srgb, var(--tone) 16%, transparent);
  color: var(--tone);
}

.note-desc {
  margin: 0.35rem 0 0;
  font-size: 0.82rem;
  line-height: 1.6;
  color: var(--av-sub);
}

/* ===== 样式 A：双列图卡 ===== */
.style-cards .grid {
  grid-template-columns: 1fr 1fr;
  align-items: stretch;
}

.style-cards .card {
  display: flex;
  flex-direction: column;
}

.style-cards .card-head {
  flex: 1 1 auto;
}

.style-cards .card-idx {
  display: none;
}

.style-cards .card.is-open {
  grid-column: 1 / -1;
}

.style-cards .strip {
  position: relative;
  height: 112px;
  overflow: hidden;
  flex: 0 0 auto;
  transition: height 0.3s ease;
}

.style-cards .card.is-open .strip {
  height: 0;
}

.style-cards .strip img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center 42%;
  filter: saturate(0.9) contrast(0.98);
  transition: transform 0.6s ease, filter 0.3s ease;
}

.style-cards .card:hover .strip img {
  transform: scale(1.04);
  filter: saturate(1);
}

.style-cards .strip::after {
  content: '';
  position: absolute;
  inset: 0;
  background: linear-gradient(
    to bottom,
    color-mix(in srgb, var(--tint) 14%, transparent) 0%,
    color-mix(in srgb, var(--tint) 48%, transparent) 45%,
    color-mix(in srgb, var(--tint) 92%, transparent) 82%,
    var(--tint) 100%
  );
}

.style-cards .strip .num {
  position: absolute;
  left: 1.15rem;
  top: 0.62rem;
  z-index: 2;
  font-family: var(--av-mono);
  font-size: 0.6rem;
  letter-spacing: 0.12em;
  color: #fff;
  background: color-mix(in srgb, var(--tone) 78%, #000);
  padding: 0.1rem 0.38rem;
  border-radius: 4px;
}

.style-cards .card:hover {
  transform: translateY(-2px);
  box-shadow: 0 10px 28px rgba(0, 0, 0, 0.07);
}

.style-cards .card.is-open {
  border-color: var(--av-fg);
  box-shadow: 0 16px 44px rgba(0, 0, 0, 0.08);
  transform: none;
}

/* 收尾卡横排 */
.style-cards .card.is-closing {
  grid-column: 1 / -1;
  display: grid;
  grid-template-columns: 19rem minmax(0, 1fr);
  align-items: stretch;
}

.style-cards .card.is-closing .strip {
  height: 100%;
  min-height: 150px;
}

.style-cards .card.is-closing .panel {
  grid-column: 1 / -1;
}

/* ===== 样式 B：单列细线目录 ===== */
.style-list .grid {
  gap: 0;
}

.style-list .card {
  background: transparent;
  border: 0;
  border-bottom: 1px solid var(--av-border);
  border-radius: 0;
}

.style-list .card:hover {
  background: color-mix(in srgb, var(--tone) 5%, transparent);
}

.style-list .card.is-open {
  background: var(--tint);
  border: 1px solid var(--av-border);
  border-radius: 14px;
  margin: 0.4rem 0;
  box-shadow: none;
}

.style-list .card-head {
  grid-template-columns: 2.4rem minmax(0, 1fr) auto;
  gap: 0 1.1rem;
  padding: 0.82rem 0.9rem 0.86rem 1rem;
}

.style-list .card-idx {
  display: block;
  grid-column: 1;
  grid-row: 1 / span 3;
  align-self: start;
  padding-top: 0.34rem;
  opacity: 0.9;
}

.style-list .card-main {
  grid-column: 2;
  grid-row: 1 / span 3;
}

.style-list .card-en {
  display: none;
}

.style-list .card-title {
  font-size: 1.06rem;
  line-height: 1.5;
}

.style-list .card-desc {
  -webkit-line-clamp: 1;
  margin-top: 0.06rem;
  font-size: 0.81rem;
  line-height: 1.55;
  color: var(--av-muted);
}

.style-list .card-chips {
  display: none;
}

.style-list .card-right {
  grid-column: 3;
  grid-row: 1 / span 3;
  justify-content: center;
}

.style-list .closing {
  margin-top: 0.55rem;
}

/* ===== 页脚 ===== */
.foot {
  border-top: 1px solid var(--av-border);
  padding: 1.6rem 0 2.6rem;
  font-family: var(--av-sans);
  font-size: 0.76rem;
  color: var(--av-muted);
}

.foot .wrap {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  justify-content: space-between;
}

/* ===== 响应式 ===== */
@media (max-width: 1000px) {
  .style-cards .grid {
    grid-template-columns: 1fr;
  }

  .style-cards .card.is-closing {
    grid-template-columns: 1fr;
  }

  .style-cards .card.is-closing .strip {
    height: 130px;
    min-height: 0;
  }

  .notes {
    grid-template-columns: 1fr;
  }
}

@media (max-width: 820px) {
  .mast .wrap {
    padding-top: 1.1rem;
    padding-bottom: 0.7rem;
  }

  .mast-meta {
    display: none;
  }

  .mast-nav {
    flex-wrap: nowrap;
    overflow-x: auto;
    scrollbar-width: none;
    gap: 1.15rem;
    margin-top: 0.6rem;
    padding-bottom: 2px;
    font-size: 0.78rem;
    -webkit-mask-image: linear-gradient(to right, #000 86%, transparent);
    mask-image: linear-gradient(to right, #000 86%, transparent);
  }

  .mast-nav::-webkit-scrollbar {
    display: none;
  }

  .mast-nav a {
    white-space: nowrap;
  }

  .hero {
    grid-template-columns: 1fr;
    gap: 1.6rem;
    padding: 2.2rem 0 1.4rem;
  }

  h1 {
    font-size: 1.85rem;
  }

  .hero-side {
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    gap: 1rem;
  }

  .photo {
    width: 92px;
    height: 92px;
    border-radius: 10px;
  }

  .stats {
    gap: 1rem;
  }

  .stats dt {
    font-size: 1.05rem;
  }

  .upd a {
    grid-template-columns: 1fr auto;
    gap: 0.2rem 0.8rem;
  }

  .upd-tag {
    grid-column: 1 / -1;
    font-size: 0.6rem;
  }

  .wrap {
    padding: 0 1.15rem;
  }

  .style-list .card-head {
    grid-template-columns: 2rem minmax(0, 1fr) auto;
    gap: 0 0.7rem;
    padding: 0.78rem 0.6rem 0.82rem 0.75rem;
  }

  .panel-body {
    padding: 0 1.1rem 1.1rem;
  }
}

@media (prefers-reduced-motion: reduce) {
  .card,
  .card::before,
  .chev,
  .panel,
  .cover img,
  .style-cards .strip,
  .style-cards .strip img,
  .upd-title,
  .mast-nav a::after {
    transition: none;
  }
}
</style>
