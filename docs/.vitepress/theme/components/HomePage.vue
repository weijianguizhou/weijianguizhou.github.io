<script setup lang="ts">
import { computed, ref } from 'vue'

type Note = {
  title: string
  cover: string
  meta: string
  desc: string
  link: string
  lang: string
  tone: string
  image?: string
  badge?: string
  chapters: number
}

type Section = {
  id: string
  title: string
  en: string
  desc: string
  tone: string
  notes: Note[]
  // 右侧「N 门 · M 章」的量词，默认是「门 / 章」；写作类分区用「种 / 篇」
  noteUnit?: string
  chapterUnit?: string
}

const profile = {
  name: '爱吃烧饼的大熊猫',
  en: 'Sesame Panda',
  tagline: '一个对力学和机器人感兴趣的本科生~',
  facts: [
    '南京理工大学 · 力学与机器人方向',
    '最近在做：ROS 2、流体力学、数字电路'
  ],
  github: 'https://github.com/weijianguizhou',
  email: 'wei_zhou@njust.edu.cn'
}

// 首页按方向分成若干大分区，点开才展开里面的课程卡片
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
        meta: '2026 年 10 月 · 7 章连载',
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
    desc: '普通物理课程笔记：静电场、电磁感应、热辐射、原子物理与物理实验，公式按篇排版。',
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
    ],
    noteUnit: '篇'
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
    id: 'math',
    title: '数学基础',
    en: 'MATHEMATICS',
    desc: '工程数学、常微分方程、概率论与数理统计：公式推导和速查表按章整理。',
    tone: 'sage',
    notes: [
      {
        title: '数学分析',
        cover: '数学分析',
        meta: '2026 · 第 1 章',
        desc: '第一章：函数极限与连续性——极限的 ε-δ 定义、无穷小量的阶、连续函数与闭区间上的性质，配 TikZ 重绘示意图。',
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
        desc: '多项式、行列式、矩阵、线性方程组、二次型、线性空间与线性变换、λ-矩阵、欧氏空间、双线性函数与对偶空间，附四个附录。',
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
    desc: '数据结构、Eigen 库与 Git：从基本概念、矩阵分解到版本管理，配 C++ 实现与命令速查。',
    tone: 'mist',
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
      }
    ]
  },
  {
    id: 'writing',
    title: '写作与排版',
    en: 'WRITING & TYPESETTING',
    desc: 'LaTeX、Markdown、Typst 三套写作工具的使用记录：装环境踩的坑、常用语法，和各自适合写什么。',
    tone: 'sand',
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
    ],
    noteUnit: '种',
    chapterUnit: '篇'
  },
  {
    id: 'essays',
    title: '随笔',
    en: 'ESSAYS',
    desc: '一些没头没尾的念头、读书与写作的碎片，顺手记在这里。',
    tone: 'stone',
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
    ],
    noteUnit: '篇',
    chapterUnit: '则'
  }
]

// 默认展开第一个分区，让首屏有内容；之后手风琴式一次只开一个
const openId = ref<string | null>(sections[0].id)

function toggle(id: string) {
  openId.value = openId.value === id ? null : id
}

const isExternal = (link: string) => /^https?:\/\//.test(link)
const totalChapters = computed(() => sections.reduce((n, s) => n + chaptersOf(s), 0))
const totalNotes = computed(() => sections.reduce((n, s) => n + s.notes.length, 0))

function chaptersOf(s: Section) {
  return s.notes.reduce((n, item) => n + item.chapters, 0)
}

const year = new Date().getFullYear()
</script>

<template>
  <div class="av-page">
    <div class="av-wrap">
      <header class="av-hero">
        <div class="av-hero-text">
          <h1>{{ profile.name }}</h1>
          <p class="av-tagline">{{ profile.tagline }}</p>
          <ul class="av-facts">
            <li v-for="f in profile.facts" :key="f">{{ f }}</li>
          </ul>
          <p class="av-contact">
            <a :href="profile.github" target="_blank" rel="noreferrer">GitHub</a>
            <span class="av-sep">·</span>
            <a :href="`mailto:${profile.email}`">{{ profile.email }}</a>
            <span class="av-sep">·</span>
            <a href="/posts/">一些涩话</a>
          </p>
        </div>
        <img class="av-photo" src="/avatar.jpg" :alt="profile.name" width="168" height="168" />
      </header>

      <section class="av-work">
        <div class="av-work-head">
          <h2>笔记</h2>
          <p class="av-work-intro">
            {{ totalNotes }} 份笔记、约 {{ totalChapters }} 章内容，按方向分成 {{ sections.length }} 个分区。
            点开分区看课程卡片，鼠标移到卡片上会浮现这份笔记的代表图。
            全部代码在
            <a :href="`${profile.github}?tab=repositories`" target="_blank" rel="noreferrer">GitHub</a>。
          </p>
        </div>

        <div class="av-sections">
          <article
            v-for="s in sections"
            :key="s.id"
            class="av-section"
            :class="[`tone-${s.tone}`, { 'is-open': openId === s.id }]"
          >
            <button
              type="button"
              class="av-section-head"
              :aria-expanded="openId === s.id"
              :aria-controls="`panel-${s.id}`"
              @click="toggle(s.id)"
            >
              <span class="av-section-ghost" aria-hidden="true">{{ s.title.slice(0, 1) }}</span>
              <span class="av-section-main">
                <span class="av-section-en">{{ s.en }}</span>
                <span class="av-section-title">{{ s.title }}</span>
                <span class="av-section-desc">{{ s.desc }}</span>
                <span class="av-section-tags">
                  <span v-for="n in s.notes" :key="n.title" class="av-chip">{{ n.cover }}</span>
                </span>
              </span>
              <span class="av-section-side">
                <span class="av-section-count">
                  {{ s.notes.length }} {{ s.noteUnit || '门' }} · {{ chaptersOf(s) }} {{ s.chapterUnit || '章' }}
                </span>
                <span class="av-chevron" aria-hidden="true" />
              </span>
            </button>

            <div :id="`panel-${s.id}`" class="av-panel" :class="{ 'is-open': openId === s.id }">
              <div class="av-panel-clip">
                <div class="av-panel-body">
                  <div class="av-list" :class="{ 'is-single': s.notes.length === 1 }">
                    <div
                      v-for="p in s.notes"
                      :key="p.title"
                      class="av-item"
                      :class="{ 'is-feature': s.notes.length === 1 }"
                    >
                      <a
                        class="av-cover"
                        :class="`tone-${p.tone}`"
                        :data-ghost="p.cover.slice(0, 1)"
                        :href="p.link"
                        :target="isExternal(p.link) ? '_blank' : undefined"
                        :rel="isExternal(p.link) ? 'noreferrer' : undefined"
                      >
                        <img
                          v-if="p.image"
                          class="av-cover-img"
                          :src="p.image"
                          :alt="`${p.title} 代表图`"
                          loading="lazy"
                          decoding="async"
                        />
                        <span class="av-cover-lang">{{ p.lang }}</span>
                        <span class="av-cover-title">{{ p.cover }}</span>
                      </a>
                      <h3 class="av-item-title">
                        <a
                          :href="p.link"
                          :target="isExternal(p.link) ? '_blank' : undefined"
                          :rel="isExternal(p.link) ? 'noreferrer' : undefined"
                        >{{ p.title }}</a>
                      </h3>
                      <p class="av-item-meta">
                        <span v-if="p.badge" class="av-badge">{{ p.badge }}</span>{{ p.meta }}
                      </p>
                      <p class="av-item-desc">{{ p.desc }}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </article>
        </div>
      </section>

      <footer class="av-footer">
        <p>© {{ year }} {{ profile.name }} · 用 VitePress 搭建 · 部署在 Netlify 与 GitHub Pages</p>
      </footer>
    </div>
  </div>
</template>

<style scoped>
.av-page {
  min-height: 100vh;
  background: var(--av-bg);
  color: var(--av-fg);
}

.av-wrap {
  max-width: 44rem;
  margin: 0 auto;
  padding: 4.5rem 1.5rem 3rem;
}

/* ---------- hero ---------- */
.av-hero {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 2.5rem;
}

.av-hero-text {
  flex: 1 1 auto;
  min-width: 0;
}

h1 {
  margin: 0 0 0.55rem;
  font-size: 2.1rem;
  line-height: 1.2;
  font-weight: 700;
  letter-spacing: -0.015em;
}

.av-tagline {
  margin: 0 0 1.1rem;
  font-size: 1rem;
  color: var(--av-sub);
}

.av-facts {
  margin: 0 0 1.2rem;
  padding-left: 1.1rem;
  font-size: 0.95rem;
  line-height: 1.75;
}

.av-facts li::marker {
  color: var(--av-muted);
}

.av-contact {
  margin: 0;
  font-size: 0.9rem;
  color: var(--av-muted);
}

.av-contact a {
  color: var(--av-fg);
  text-decoration: underline;
  text-underline-offset: 2px;
  text-decoration-thickness: 1px;
}

.av-contact a:hover {
  opacity: 0.7;
}

.av-sep {
  margin: 0 0.45rem;
  color: var(--av-muted);
  opacity: 0.55;
}

.av-photo {
  flex: 0 0 auto;
  width: 168px;
  height: 168px;
  object-fit: cover;
  border-radius: 10px;
  border: 1px solid var(--av-border);
}

/* ---------- 笔记区 ---------- */
.av-work {
  margin-top: 3.5rem;
}

.av-work-head h2 {
  margin: 0 0 0.45rem;
  font-size: 1.5rem;
  font-weight: 600;
  letter-spacing: -0.01em;
}

.av-work-intro {
  margin: 0 0 1.8rem;
  font-size: 0.9rem;
  line-height: 1.75;
  color: var(--av-muted);
}

.av-work-intro a {
  color: var(--av-fg);
  text-decoration: underline;
  text-underline-offset: 2px;
}

/* ---------- 分区大卡片 ---------- */
.av-sections {
  display: grid;
  gap: 1rem;
}

.av-section {
  position: relative;
  overflow: hidden;
  border: 1px solid var(--av-border);
  border-radius: 12px;
  background: var(--av-card);
  background-image: linear-gradient(135deg, rgba(0, 0, 0, 0.015), rgba(0, 0, 0, 0.045));
  transition: border-color 0.18s ease, background-color 0.18s ease, box-shadow 0.18s ease;
}

.av-section:hover {
  border-color: var(--av-muted);
}

.av-section.is-open {
  border-color: var(--av-fg);
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.06);
}

.av-section-head {
  position: relative;
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 1.2rem;
  width: 100%;
  padding: 1.3rem 1.45rem;
  border: 0;
  background: transparent;
  color: inherit;
  font: inherit;
  text-align: left;
  cursor: pointer;
}

.av-section-head:focus-visible {
  outline: 2px solid var(--av-accent);
  outline-offset: -2px;
}

.av-section-ghost {
  position: absolute;
  right: 1rem;
  bottom: -1.4rem;
  font-size: 6.6rem;
  line-height: 1;
  font-weight: 700;
  color: var(--av-fg);
  opacity: 0.04;
  pointer-events: none;
  user-select: none;
  transition: opacity 0.2s ease;
}

.av-section.is-open .av-section-ghost {
  opacity: 0.055;
}

.av-section-main {
  position: relative;
  z-index: 1;
  display: flex;
  flex-direction: column;
  gap: 0.28rem;
  min-width: 0;
}

.av-section-en {
  font-family: var(--vp-font-family-mono);
  font-size: 0.66rem;
  letter-spacing: 0.16em;
  text-transform: uppercase;
  color: var(--av-muted);
}

.av-section-title {
  font-size: 1.32rem;
  font-weight: 650;
  letter-spacing: -0.01em;
  line-height: 1.35;
}

.av-section-desc {
  max-width: 34rem;
  font-size: 0.88rem;
  line-height: 1.7;
  color: var(--av-sub);
}

.av-section-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 0.4rem;
  margin-top: 0.55rem;
}

.av-chip {
  display: inline-block;
  padding: 0.1rem 0.5rem;
  border: 1px solid var(--av-border);
  border-radius: 999px;
  background: var(--av-bg);
  font-size: 0.72rem;
  line-height: 1.6;
  color: var(--av-sub);
}

.av-section-side {
  position: relative;
  z-index: 1;
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  gap: 0.7rem;
  flex: 0 0 auto;
  padding-top: 0.15rem;
}

.av-section-count {
  font-family: var(--vp-font-family-mono);
  font-size: 0.68rem;
  letter-spacing: 0.06em;
  color: var(--av-muted);
  white-space: nowrap;
}

.av-chevron {
  width: 8px;
  height: 8px;
  margin-right: 2px;
  border-right: 1.5px solid var(--av-sub);
  border-bottom: 1.5px solid var(--av-sub);
  transform: rotate(45deg);
  transition: transform 0.22s ease;
}

.av-section.is-open .av-chevron {
  transform: rotate(225deg);
}

/* 展开面板：grid 0fr → 1fr 的纯 CSS 高度动画 */
.av-panel {
  display: grid;
  grid-template-rows: 0fr;
  transition: grid-template-rows 0.38s cubic-bezier(0.22, 0.61, 0.36, 1);
}

.av-panel.is-open {
  grid-template-rows: 1fr;
}

.av-panel-clip {
  min-height: 0;
  overflow: hidden;
}

.av-panel-body {
  padding: 0.2rem 1.45rem 1.6rem;
}

/* ---------- 分区内的课程卡片 ---------- */
.av-list {
  display: grid;
  grid-template-columns: 1fr;
  gap: 2rem 1.6rem;
  align-items: start;
  padding-top: 0.9rem;
  border-top: 1px solid var(--av-border);
}

@media (min-width: 640px) {
  .av-list {
    grid-template-columns: 1fr 1fr;
  }

  .av-list.is-single {
    grid-template-columns: 1fr;
  }
}

.av-cover {
  position: relative;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  aspect-ratio: 16 / 10;
  padding: 1.15rem 1.3rem;
  border: 1px solid var(--av-border);
  border-radius: 10px;
  background: var(--av-bg);
  background-image: linear-gradient(135deg, rgba(0, 0, 0, 0.015), rgba(0, 0, 0, 0.05));
  color: var(--av-fg);
  text-decoration: none;
  transition: transform 0.18s ease, box-shadow 0.18s ease;
}

.av-cover::after {
  content: attr(data-ghost);
  position: absolute;
  right: 0.9rem;
  bottom: 0.3rem;
  font-size: 3.6rem;
  line-height: 1;
  color: var(--av-fg);
  opacity: 0.05;
  pointer-events: none;
  user-select: none;
  transition: opacity 0.32s ease;
}

.av-cover:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 22px rgba(0, 0, 0, 0.07);
}

/* 悬停浮现代表图 */
.av-cover-img {
  position: absolute;
  inset: 0;
  z-index: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  opacity: 0;
  transform: scale(1.06);
  transition: opacity 0.32s ease, transform 0.7s cubic-bezier(0.22, 0.61, 0.36, 1);
  pointer-events: none;
}

.av-cover::before {
  content: '';
  position: absolute;
  inset: 0;
  z-index: 1;
  background: linear-gradient(
    to top,
    rgba(12, 10, 8, 0.84) 0%,
    rgba(12, 10, 8, 0.5) 38%,
    rgba(12, 10, 8, 0.24) 70%,
    rgba(12, 10, 8, 0.24) 100%
  );
  opacity: 0;
  transition: opacity 0.32s ease;
  pointer-events: none;
}

.av-cover-lang,
.av-cover-title {
  position: relative;
  z-index: 2;
  transition: color 0.32s ease;
}

.av-cover:hover .av-cover-img,
.av-cover:focus-visible .av-cover-img {
  opacity: 1;
  transform: scale(1);
}

.av-cover:hover::before,
.av-cover:focus-visible::before {
  opacity: 1;
}

.av-cover:hover::after,
.av-cover:focus-visible::after {
  opacity: 0;
}

.av-cover:hover .av-cover-lang,
.av-cover:hover .av-cover-title,
.av-cover:focus-visible .av-cover-lang,
.av-cover:focus-visible .av-cover-title {
  color: #fff;
  text-shadow: 0 1px 12px rgba(0, 0, 0, 0.55), 0 1px 2px rgba(0, 0, 0, 0.45);
}

.tone-sand {
  background-image: linear-gradient(135deg, rgba(120, 96, 60, 0.06), rgba(0, 0, 0, 0.045));
}

.tone-sage {
  background-image: linear-gradient(135deg, rgba(78, 104, 82, 0.07), rgba(0, 0, 0, 0.045));
}

.tone-clay {
  background-image: linear-gradient(135deg, rgba(126, 82, 64, 0.07), rgba(0, 0, 0, 0.045));
}

.tone-stone {
  background-image: linear-gradient(135deg, rgba(88, 92, 104, 0.07), rgba(0, 0, 0, 0.045));
}

.tone-mist {
  background-image: linear-gradient(135deg, rgba(84, 104, 118, 0.07), rgba(0, 0, 0, 0.045));
}

.av-cover-lang {
  font-family: var(--vp-font-family-mono);
  font-size: 0.68rem;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  color: var(--av-muted);
}

.av-cover-title {
  font-size: 1.22rem;
  font-weight: 600;
  letter-spacing: -0.01em;
  max-width: 92%;
  line-height: 1.25;
}

.av-item-title {
  margin: 0.85rem 0 0.2rem;
  font-size: 1.02rem;
  font-weight: 600;
}

/* 分区里只有一门课时，卡片转成「封面在左、文字在右」的横向大卡，避免右半边空着 */
@media (min-width: 640px) {
  .av-item.is-feature {
    display: grid;
    grid-template-columns: 14rem minmax(0, 1fr);
    grid-template-rows: auto auto 1fr;
    gap: 0.15rem 1.5rem;
    align-items: start;
  }

  .av-item.is-feature .av-cover {
    grid-column: 1;
    grid-row: 1 / span 3;
    aspect-ratio: 4 / 3;
  }

  .av-item.is-feature .av-item-title {
    grid-column: 2;
    grid-row: 1;
    margin-top: 0.15rem;
  }

  .av-item.is-feature .av-item-meta {
    grid-column: 2;
    grid-row: 2;
  }

  .av-item.is-feature .av-item-desc {
    grid-column: 2;
    grid-row: 3;
    max-width: 30rem;
  }
}

.av-item-title a {
  color: var(--av-fg);
  text-decoration: none;
  border-bottom: 1px solid transparent;
}

.av-item-title a:hover {
  border-bottom-color: var(--av-fg);
}

.av-item-meta {
  margin: 0 0 0.3rem;
  font-size: 0.8rem;
  color: var(--av-muted);
}

.av-badge {
  display: inline-block;
  margin-right: 0.45rem;
  padding: 0.05rem 0.42rem;
  border: 1px solid var(--av-border);
  border-radius: 999px;
  font-size: 0.7rem;
  line-height: 1.5;
  color: var(--av-sub);
  background: var(--av-bg);
  vertical-align: 1px;
}

.av-item-desc {
  margin: 0;
  font-size: 0.92rem;
  line-height: 1.7;
  color: var(--av-sub);
}

/* ---------- footer ---------- */
.av-footer {
  margin-top: 3.5rem;
  padding-top: 1.2rem;
  border-top: 1px solid var(--av-border);
  font-size: 0.78rem;
  color: var(--av-muted);
}

.av-footer p {
  margin: 0;
}

@media (max-width: 640px) {
  .av-wrap {
    padding: 3rem 1.1rem 2.5rem;
  }

  .av-hero {
    gap: 1.1rem;
  }

  h1 {
    font-size: 1.7rem;
  }

  .av-photo {
    width: 88px;
    height: 88px;
    border-radius: 8px;
  }

  .av-section-head {
    flex-direction: column;
    gap: 0.9rem;
    padding: 1.15rem 1.1rem;
  }

  .av-section-side {
    flex-direction: row;
    align-items: center;
    gap: 0.9rem;
    width: 100%;
    justify-content: space-between;
  }

  .av-section-ghost {
    font-size: 4.6rem;
    bottom: -0.8rem;
  }

  .av-panel-body {
    padding: 0 1.1rem 1.3rem;
  }

  .av-cover-title {
    font-size: 1.2rem;
  }
}

@media (prefers-reduced-motion: reduce) {
  .av-panel,
  .av-chevron,
  .av-section,
  .av-cover,
  .av-cover::before,
  .av-cover::after,
  .av-cover-img,
  .av-cover-lang,
  .av-cover-title {
    transition: none;
  }

  .av-cover-img {
    transform: none;
  }
}

/* 触屏设备没有 hover，用 :active 兜底 */
@media (hover: none) {
  .av-cover:active .av-cover-img {
    opacity: 1;
    transform: scale(1);
  }

  .av-cover:active::before {
    opacity: 1;
  }

  .av-cover:active .av-cover-lang,
  .av-cover:active .av-cover-title {
    color: #fff;
  }
}
</style>
