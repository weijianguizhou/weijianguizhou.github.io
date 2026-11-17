<script setup lang="ts">
import { computed, ref } from 'vue'
import { useData } from 'vitepress'
import VPNavBarSearch from 'vitepress/dist/client/theme-default/components/VPNavBarSearch.vue'
import IntroScene from './IntroScene.vue'

/* ============================================================
 * 首页。改内容只看这一段的三个对象：profile / recent / sections
 * ============================================================ */

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
  closing?: boolean
}

const toneMap: Record<Tone, string> = {
  sage: '#6f7d5e',
  mist: '#7c8a8a',
  stone: '#8a8274',
  clay: '#a06a4f',
  sand: '#b08a5a',
  violet: '#7b6b8a',
  teal: '#4f7d78',
  amber: '#a9793f',
  umber: '#7a5a44'
}

const toneColor = (tone: Tone) => toneMap[tone]

const profile = {
  name: '爱吃烧饼的大熊猫',
  en: 'Sesame Panda',
  tagline: '一个对力学和机器人感兴趣的本科生~',
  bio: '我是南京理工大学的一名本科生，平时关心力学、机器人和控制。这个站点用来整理学过的课程、做过的项目和踩过的坑，也记录一些还没想清楚的问题。',
  portrait: '/ros2/panda.webp',
  facts: ['南京理工大学', '力学与机器人'],
  github: 'https://github.com/weijianguizhou',
  email: 'wei_zhou@njust.edu.cn'
}

/** 刊头第二行的方向链接（顺序 = 页面顺序） */
const topLinks = [
  { text: 'ROS 2', link: '/ros2/' }
]

/** 最近校订：手动维护，一条一行，按时间倒序 */
const recent = [
  { tag: 'ROS 2', title: 'ROS 2 连载扩到 7 章，补节点、话题、colcon 与通信', link: '/ros2/', date: '11-17' },
  { tag: '数据结构', title: '上线数据结构连载（10 章）与随笔分区', link: '/data-structures/', date: '10-26' }
]

/** 九个方向 */
const sections: Section[] = [
  {
    id: 'robotics',
    title: '机器人',
    en: 'ROBOTICS',
    desc: 'ROS 2 从 Ubuntu、WSL 环境一路到节点与架构的完整记录，全是踩过的坑。',
    tone: 'sage',
    notes: [
      {
        title: 'ROS 2 学习记录（连载）',
        cover: 'ROS 2',
        meta: '2026 年 11 月 · 7 章',
        desc: '从 Ubuntu、WSL 环境一路到 ROS 2 架构、节点、话题、colcon 构建与通信，全是踩过的坑。',
        link: '/ros2/',
        lang: 'UBUNTU 24.04',
        tone: 'sage',
        badge: '连载',
        chapters: 7,
        image: '/ros2/talker-listener.webp'
      }
    ]
  },
  {
    id: 'physics',
    title: '普通物理',
    en: 'GENERAL PHYSICS',
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
    id: 'math',
    title: '数学基础',
    en: 'MATHEMATICS',
    desc: '工程数学、概率论与数理统计：公式推导和速查表按章整理。',
    tone: 'violet',
    notes: [
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
    desc: '数据结构：从基本概念、线性表到树、图、查找与排序。',
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
const { isDark } = useData()

const openId = ref<string | null>('robotics')
const introVisible = ref(true)
const introDone = ref(false)

function handleIntroReveal() {
  introDone.value = true
}

function handleIntroDone() {
  introDone.value = true
  introVisible.value = false
}

function toggle(id: string) {
  openId.value = openId.value === id ? null : id
}

const isExternal = (link: string) => /^https?:\/\//.test(link)

const chaptersOf = (s: Section) => s.notes.reduce((n, item) => n + item.chapters, 0)
const totalNotes = computed(() => sections.reduce((n, s) => n + s.notes.length, 0))
const totalChapters = computed(() => sections.reduce((n, s) => n + chaptersOf(s), 0))
const totalSections = sections.length

const shortMeta = (p: Note) => {
  const core = p.meta.replace(/^2026(\s*年\s*\d+\s*月)?\s*·\s*/, '')
  return p.badge ? `${core} · ${p.badge}` : core
}

const formatDate = (d: string) => d.replace('-', '.')

const year = new Date().getFullYear()
</script>

<template>
  <div class="home-root" :class="{ 'is-dark': isDark, 'is-ready': introDone }">
    <div class="grain" aria-hidden="true" />
    <IntroScene v-if="introVisible" @reveal="handleIntroReveal" @done="handleIntroDone" />

    <!-- ===== 刊头 ===== -->
    <header class="masthead" :inert="introVisible">
      <div class="page masthead-inner">
        <div class="masthead-top">
          <a class="brand" href="#top">
            <span class="brand-en">{{ profile.en }}</span>
            <span class="brand-cn">个人笔记</span>
          </a>
          <div class="masthead-meta">
            <span>南京</span>
            <span>{{ year }}</span>
          </div>
          <div class="masthead-actions">
            <VPNavBarSearch />
            <button
              class="theme-toggle"
              type="button"
              :aria-label="isDark ? '切换到浅色模式' : '切换到深色模式'"
              @click="isDark = !isDark"
            >
              {{ isDark ? '浅色' : '深色' }}
            </button>
          </div>
        </div>
        <nav class="topnav" aria-label="主导航">
          <a v-for="(l, idx) in topLinks" :key="l.link" :href="l.link">
            <span>{{ String(idx + 1).padStart(2, '0') }}</span>{{ l.text }}
          </a>
        </nav>
      </div>
    </header>

    <main id="top" :inert="introVisible">
      <!-- ===== Hero ===== -->
      <section class="hero page">
        <div class="hero-copy">
          <p class="kicker"><span class="kicker-line" />Personal Notes / 个人笔记</p>
          <h1>{{ profile.name }}</h1>
          <p class="hero-en">{{ profile.en }}</p>
          <p class="tagline">{{ profile.tagline }}</p>
          <p class="hero-bio">{{ profile.bio }}</p>
          <div class="hero-meta">
            <div class="facts">
              <span v-for="f in profile.facts" :key="f">{{ f }}</span>
            </div>
            <div class="contacts">
              <a :href="profile.github" target="_blank" rel="noreferrer">GitHub ↗</a>
              <a :href="`mailto:${profile.email}`">Email ↗</a>
              <a href="/posts/">一些涩话 ↗</a>
            </div>
          </div>
        </div>
        <aside class="hero-side">
          <figure class="portrait">
            <img :src="profile.portrait" :alt="profile.name" width="400" height="287" />
            <figcaption>{{ profile.en }} · {{ year }}</figcaption>
          </figure>
          <div class="stats">
            <div>
              <strong>{{ String(totalNotes).padStart(2, '0') }}</strong>
              <span>篇笔记</span>
            </div>
            <div>
              <strong>{{ totalChapters }}</strong>
              <span>章</span>
            </div>
            <div>
              <strong>{{ String(totalSections).padStart(2, '0') }}</strong>
              <span>个方向</span>
            </div>
          </div>
        </aside>
      </section>

      <!-- ===== 最近校订 ===== -->
      <section class="recent page">
        <div class="section-head">
          <div>
            <p class="eyebrow">§ 01 · Recently Revised</p>
            <h2>最近校订</h2>
          </div>
          <p class="section-note">{{ String(recent.length).padStart(2, '0') }} 条 · {{ year }} 年 11 月</p>
        </div>
        <div class="revision-list">
          <a v-for="r in recent" :key="r.title" class="revision" :href="r.link">
            <time>{{ formatDate(r.date) }}</time>
            <span class="rev-tag">{{ r.tag }}</span>
            <span class="rev-title">{{ r.title }}</span>
            <span class="rev-arrow">↗</span>
          </a>
        </div>
      </section>

      <!-- ===== 全部笔记（目录式手风琴） ===== -->
      <section class="index page">
        <div class="section-head">
          <div>
            <p class="eyebrow">§ 02 · Index / 目录</p>
            <h2>全部笔记</h2>
          </div>
          <p class="section-note">{{ String(totalSections).padStart(2, '0') }} 个方向 · {{ totalNotes }} 份笔记</p>
        </div>

        <div class="index-list">
          <article
            v-for="(s, i) in sections"
            :key="s.id"
            class="index-item"
            :class="{ open: openId === s.id }"
            :style="{ '--tone': toneColor(s.tone) }"
          >
            <button
              class="index-head"
              type="button"
              :aria-expanded="openId === s.id"
              :aria-controls="`panel-${s.id}`"
              @click="toggle(s.id)"
            >
              <span class="index-num">{{ String(i + 1).padStart(2, '0') }}</span>
              <span class="index-main">
                <span class="index-en"><i />{{ s.en }}</span>
                <span class="index-title">{{ s.title }}</span>
                <span class="index-desc">{{ s.desc }}</span>
              </span>
              <span class="index-count">{{ s.notes.length }} 份 · {{ chaptersOf(s) }} 章</span>
              <span class="chevron" aria-hidden="true" />
            </button>

            <div :id="`panel-${s.id}`" class="index-panel">
              <div class="index-panel-inner">
                <div class="toc" :class="{ single: s.notes.length === 1 }">
                  <a
                    v-for="(p, j) in s.notes"
                    :key="p.title"
                    class="toc-row"
                    :href="p.link"
                    :target="isExternal(p.link) ? '_blank' : undefined"
                    :rel="isExternal(p.link) ? 'noreferrer' : undefined"
                  >
                    <span class="toc-num">{{ String(j + 1).padStart(2, '0') }}</span>
                    <span class="toc-title">{{ p.title }}</span>
                    <span class="toc-meta">{{ shortMeta(p) }}</span>
                    <img
                      v-if="p.image"
                      class="toc-thumb"
                      :src="p.image"
                      :alt="`${p.title} 代表图`"
                      loading="lazy"
                      decoding="async"
                    />
                    <span
                      v-else
                      class="toc-thumb placeholder"
                      :style="{ '--tone': toneColor(p.tone) }"
                    >{{ p.cover.slice(0, 1) }}</span>
                  </a>
                </div>
              </div>
            </div>
          </article>
        </div>
      </section>

      <!-- ===== Colophon ===== -->
      <footer class="colophon page">
        <div class="colophon-mark">Sesame Panda · Colophon</div>
        <div class="colophon-grid">
          <div>
            <h3>排印</h3>
            <p>VitePress 排印，KaTeX 排公式；纸张纹理、页边线与目录版式为本页手写。</p>
          </div>
          <div>
            <h3>字体</h3>
            <p>标题与正文使用 Palatino / 思源宋体回退，标签与数字使用无衬线体与等宽体。</p>
          </div>
          <div>
            <h3>版权</h3>
            <p>© {{ year }} {{ profile.name }}。内容未经许可请勿转载，欢迎来信讨论。</p>
          </div>
        </div>
        <div class="colophon-bottom">
          <span>南京 · {{ year }}</span>
          <span>
            Made with care, revised slowly.
            <a href="#top">回到页首 ↑</a>
          </span>
        </div>
      </footer>
    </main>
  </div>
</template>

<style scoped>
.home-root {
  --paper: #f8f3e7;
  --paper-deep: #f1ead9;
  --ink: #1d1a14;
  --sub: #4a4438;
  --muted: #7a7263;
  --border: #ded5c3;
  --border-soft: #e9e1d1;
  --card: #f2ebdc;
  --accent: #9a3b2a;
  --accent-soft: rgba(154, 59, 42, 0.075);
  --accent-line: rgba(154, 59, 42, 0.32);
  --serif: "et-book", "Palatino Linotype", Palatino, "Book Antiqua", Georgia, "Songti SC", "Noto Serif SC", "Source Han Serif SC", "SimSun", serif;
  --sans: Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", "PingFang SC", "Hiragino Sans GB", "Microsoft YaHei", sans-serif;
  --mono: ui-monospace, "SFMono-Regular", Menlo, Consolas, "Liberation Mono", monospace;
  --wrap: 1120px;
  --measure: 39rem;

  min-height: 100vh;
  position: relative;
  background:
    radial-gradient(1100px 560px at 50% -12%, rgba(154, 59, 42, 0.045), transparent 62%),
    var(--paper);
  color: var(--ink);
  font-family: var(--serif);
  font-size: 16px;
  line-height: 1.75;
  -webkit-font-smoothing: antialiased;
  text-rendering: optimizeLegibility;
}

.home-root.is-dark {
  --paper: #17140e;
  --paper-deep: #1d1911;
  --ink: #eee7d7;
  --sub: #c9c0ae;
  --muted: #948a78;
  --border: #332e24;
  --border-soft: #29251d;
  --card: #1e1a13;
  --accent: #d98a72;
  --accent-soft: rgba(217, 138, 114, 0.1);
  --accent-line: rgba(217, 138, 114, 0.34);

  background:
    radial-gradient(1100px 560px at 50% -12%, rgba(217, 138, 114, 0.055), transparent 62%),
    var(--paper);
}

.home-root ::selection {
  background: var(--accent);
  color: var(--paper);
}

.home-root a {
  color: inherit;
  text-decoration: none;
}

.home-root img {
  display: block;
  max-width: 100%;
}

.home-root button {
  font: inherit;
  color: inherit;
}

.grain {
  position: fixed;
  inset: 0;
  z-index: 0;
  pointer-events: none;
  opacity: 0.08;
  mix-blend-mode: multiply;
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='160' height='160'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='.92' numOctaves='2' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='160' height='160' filter='url(%23n)' opacity='.55'/%3E%3C/svg%3E");
}

.home-root.is-dark .grain {
  opacity: 0.1;
  mix-blend-mode: screen;
  filter: invert(1);
}

.page {
  width: 100%;
  max-width: var(--wrap);
  margin: 0 auto;
  padding-left: 40px;
  padding-right: 40px;
  position: relative;
  z-index: 1;
}

/* ---------- masthead ---------- */
.masthead {
  border-bottom: 1px solid var(--border);
  position: relative;
  z-index: 2;
}

.masthead-inner {
  padding-top: 1.15rem;
}

.masthead-top {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1.5rem;
  padding-bottom: 0.95rem;
}

.brand {
  display: inline-flex;
  align-items: baseline;
  gap: 0.7rem;
  white-space: nowrap;
}

.brand-en {
  font-family: var(--sans);
  font-size: 0.72rem;
  font-weight: 600;
  letter-spacing: 0.3em;
  text-transform: uppercase;
}

.brand-cn {
  font-family: var(--sans);
  font-size: 0.68rem;
  letter-spacing: 0.12em;
  color: var(--muted);
}

.brand-cn::before {
  content: '/';
  margin-right: 0.7rem;
  color: var(--border);
}

.masthead-meta {
  font-family: var(--mono);
  font-size: 0.64rem;
  letter-spacing: 0.16em;
  color: var(--muted);
  text-transform: uppercase;
}

.masthead-meta span + span::before {
  content: '·';
  margin: 0 0.55rem;
  color: var(--border);
}

.masthead-actions {
  display: flex;
  align-items: center;
  gap: 0.75rem;
}

.masthead-actions :deep(.VPNavBarSearch) {
  padding-left: 0;
  flex-grow: 0;
}

.masthead-actions :deep(.DocSearch-Button) {
  height: auto;
  padding: 0.28rem 0.68rem;
  border: 1px solid var(--border);
  border-radius: 999px;
  background: transparent;
  font-family: var(--sans);
  font-size: 0.66rem;
  letter-spacing: 0.08em;
  color: var(--muted);
  transition: color 0.2s, border-color 0.2s, background 0.2s;
}

.masthead-actions :deep(.DocSearch-Button:hover) {
  color: var(--accent);
  border-color: var(--accent-line);
  background: var(--accent-soft);
}

.masthead-actions :deep(.DocSearch-Button-Keys),
.masthead-actions :deep(.DocSearch-Search-Icon) {
  display: none;
}

.masthead-actions :deep(.DocSearch-Button-Placeholder) {
  font-size: 0.66rem;
  padding: 0;
}

.theme-toggle {
  appearance: none;
  background: transparent;
  border: 1px solid var(--border);
  border-radius: 999px;
  padding: 0.28rem 0.76rem;
  font-family: var(--sans);
  font-size: 0.66rem;
  letter-spacing: 0.12em;
  color: var(--muted);
  cursor: pointer;
  transition: color 0.2s, border-color 0.2s, background 0.2s;
}

.theme-toggle:hover {
  color: var(--accent);
  border-color: var(--accent-line);
  background: var(--accent-soft);
}

.topnav {
  display: flex;
  flex-wrap: wrap;
  gap: 0.35rem 1.45rem;
  padding: 0.7rem 0 0.85rem;
  border-top: 1px solid var(--border-soft);
}

.topnav a {
  display: inline-flex;
  align-items: baseline;
  gap: 0.38rem;
  font-family: var(--sans);
  font-size: 0.76rem;
  color: var(--sub);
  letter-spacing: 0.03em;
  transition: color 0.2s;
}

.topnav a span {
  font-family: var(--mono);
  font-size: 0.56rem;
  color: var(--accent);
  opacity: 0.8;
}

.topnav a:hover {
  color: var(--accent);
}

/* ---------- hero ---------- */
.hero {
  display: grid;
  grid-template-columns: minmax(0, 1fr) 272px;
  gap: 4.2rem;
  align-items: start;
  padding-top: 4.2rem;
  padding-bottom: 3.6rem;
}

.hero-copy {
  max-width: 44rem;
}

.kicker {
  display: flex;
  align-items: center;
  gap: 0.8rem;
  margin: 0 0 1.35rem;
  font-family: var(--sans);
  font-size: 0.66rem;
  font-weight: 600;
  letter-spacing: 0.26em;
  text-transform: uppercase;
  color: var(--accent);
}

.kicker-line {
  display: inline-block;
  width: 2.4rem;
  height: 1px;
  background: var(--accent-line);
}

h1 {
  margin: 0;
  font-family: var(--serif);
  font-size: clamp(2.55rem, 5.55vw, 4.75rem);
  font-weight: 500;
  line-height: 1.08;
  letter-spacing: 0.015em;
}

.hero-en {
  margin: 0.65rem 0 0;
  font-family: var(--sans);
  font-size: 0.68rem;
  font-weight: 500;
  letter-spacing: 0.42em;
  text-transform: uppercase;
  color: var(--muted);
}

.tagline {
  margin: 1.55rem 0 0;
  font-size: 1.18rem;
  color: var(--sub);
  letter-spacing: 0.01em;
}

.hero-bio {
  max-width: var(--measure);
  margin: 1.15rem 0 0;
  padding-left: 1rem;
  border-left: 2px solid var(--accent-line);
  font-size: 0.98rem;
  line-height: 1.95;
  color: var(--sub);
}

.hero-meta {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-between;
  gap: 0.8rem 1.4rem;
  margin-top: 1.65rem;
  padding-top: 1rem;
  border-top: 1px solid var(--border-soft);
  font-family: var(--sans);
  font-size: 0.7rem;
  letter-spacing: 0.04em;
  color: var(--muted);
}

.facts {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 0.5rem 1rem;
}

.facts span {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
}

.facts span::before {
  content: '';
  width: 4px;
  height: 4px;
  background: var(--accent);
  border-radius: 50%;
  opacity: 0.7;
}

.contacts {
  display: flex;
  gap: 1.1rem;
}

.contacts a {
  border-bottom: 1px solid var(--border);
  padding-bottom: 0.1rem;
  transition: color 0.2s, border-color 0.2s;
}

.contacts a:hover {
  color: var(--accent);
  border-color: var(--accent-line);
}

.hero-side {
  padding-top: 0.45rem;
}

.portrait {
  margin: 0;
  padding: 10px 10px 8px;
  background: #fffdf7;
  border: 1px solid var(--border);
  box-shadow: 0 22px 46px -28px rgba(29, 26, 20, 0.5);
  transform: rotate(-1.4deg);
  transition: transform 0.55s cubic-bezier(0.2, 0.8, 0.2, 1), box-shadow 0.55s;
}

.home-root.is-dark .portrait {
  background: #242017;
}

.portrait:hover {
  transform: rotate(0deg) translateY(-2px);
  box-shadow: 0 28px 52px -26px rgba(0, 0, 0, 0.55);
}

.portrait img {
  width: 100%;
  aspect-ratio: 4 / 3;
  object-fit: cover;
  filter: sepia(0.06) contrast(0.99) saturate(0.94);
}

.portrait figcaption {
  margin-top: 0.55rem;
  font-family: var(--mono);
  font-size: 0.58rem;
  letter-spacing: 0.18em;
  text-align: center;
  color: var(--muted);
  text-transform: uppercase;
}

.stats {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  margin-top: 1.55rem;
  padding-top: 0.9rem;
  border-top: 1px solid var(--ink);
}

.stats div {
  padding-left: 0.8rem;
  border-left: 1px solid var(--border);
}

.stats div:first-child {
  padding-left: 0;
  border-left: 0;
}

.stats strong {
  display: block;
  font-family: var(--serif);
  font-size: 1.38rem;
  font-weight: 500;
  line-height: 1.1;
  letter-spacing: 0.02em;
}

.stats span {
  display: block;
  margin-top: 0.28rem;
  font-family: var(--sans);
  font-size: 0.56rem;
  letter-spacing: 0.14em;
  color: var(--muted);
  text-transform: uppercase;
}

/* ---------- sections ---------- */
.section-head {
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  gap: 1.5rem;
  padding-bottom: 0.7rem;
  border-bottom: 1px solid var(--ink);
}

.eyebrow {
  margin: 0 0 0.35rem;
  font-family: var(--sans);
  font-size: 0.62rem;
  font-weight: 600;
  letter-spacing: 0.24em;
  text-transform: uppercase;
  color: var(--accent);
}

.section-head h2 {
  margin: 0;
  font-family: var(--serif);
  font-size: 2.15rem;
  font-weight: 500;
  line-height: 1.1;
  letter-spacing: 0.02em;
}

.section-note {
  margin: 0 0 0.18rem;
  font-family: var(--mono);
  font-size: 0.62rem;
  letter-spacing: 0.12em;
  color: var(--muted);
  white-space: nowrap;
}

.recent {
  padding-top: 3.2rem;
}

.revision-list {
  margin-top: 0.15rem;
}

.revision {
  display: grid;
  grid-template-columns: 4.2rem 7.5rem minmax(0, 1fr) 1.4rem;
  align-items: baseline;
  gap: 1rem;
  padding: 0.92rem 0.4rem 0.92rem 0;
  border-bottom: 1px solid var(--border-soft);
  transition: background 0.2s, padding-left 0.2s;
}

.revision:hover {
  background: var(--accent-soft);
  padding-left: 0.5rem;
}

.revision time {
  font-family: var(--mono);
  font-size: 0.64rem;
  letter-spacing: 0.08em;
  color: var(--muted);
}

.rev-tag {
  font-family: var(--sans);
  font-size: 0.6rem;
  letter-spacing: 0.1em;
  color: var(--accent);
  text-transform: uppercase;
}

.rev-title {
  font-size: 1.02rem;
  line-height: 1.55;
  color: var(--sub);
  transition: color 0.2s;
}

.revision:hover .rev-title {
  color: var(--ink);
}

.rev-arrow {
  font-family: var(--sans);
  font-size: 0.8rem;
  color: var(--muted);
  text-align: right;
  transition: transform 0.2s, color 0.2s;
}

.revision:hover .rev-arrow {
  transform: translate(2px, -2px);
  color: var(--accent);
}

.index {
  padding-top: 4.4rem;
}

.index-list {
  margin-top: 0.2rem;
}

.index-item {
  border-bottom: 1px solid var(--border);
}

.index-item:first-child {
  border-top: 1px solid var(--border);
}

.index-head {
  display: grid;
  grid-template-columns: 4.3rem minmax(0, 1fr) auto 1.6rem;
  align-items: center;
  gap: 1.2rem;
  width: 100%;
  padding: 1.35rem 0;
  background: none;
  border: 0;
  text-align: left;
  cursor: pointer;
}

.index-num {
  font-family: var(--serif);
  font-size: 2.45rem;
  font-weight: 400;
  line-height: 1;
  letter-spacing: -0.02em;
  color: var(--tone, var(--accent));
  opacity: 0.86;
  transition: transform 0.3s, opacity 0.3s;
}

.index-head:hover .index-num {
  transform: translateX(4px);
  opacity: 1;
}

.index-main {
  min-width: 0;
}

.index-en {
  display: flex;
  align-items: center;
  gap: 0.45rem;
  font-family: var(--sans);
  font-size: 0.58rem;
  font-weight: 600;
  letter-spacing: 0.22em;
  text-transform: uppercase;
  color: var(--muted);
}

.index-en i {
  display: inline-block;
  width: 5px;
  height: 5px;
  border-radius: 50%;
  background: var(--tone, var(--accent));
  opacity: 0.8;
}

.index-title {
  display: block;
  margin-top: 0.18rem;
  font-size: 1.55rem;
  line-height: 1.25;
  letter-spacing: 0.02em;
  transition: color 0.2s;
}

.index-head:hover .index-title {
  color: var(--accent);
}

.index-desc {
  display: block;
  margin-top: 0.28rem;
  max-width: 48rem;
  font-size: 0.86rem;
  line-height: 1.7;
  color: var(--muted);
}

.index-count {
  font-family: var(--mono);
  font-size: 0.61rem;
  letter-spacing: 0.08em;
  color: var(--muted);
  white-space: nowrap;
}

.chevron {
  position: relative;
  width: 1.6rem;
  height: 1.6rem;
}

.chevron::before,
.chevron::after {
  content: '';
  position: absolute;
  top: 50%;
  width: 0.62rem;
  height: 1px;
  background: var(--muted);
  transition: transform 0.3s, background 0.3s;
}

.chevron::before {
  left: 0.1rem;
  transform: rotate(40deg);
}

.chevron::after {
  right: 0.1rem;
  transform: rotate(-40deg);
}

.index-item.open .chevron::before {
  transform: rotate(-40deg);
  background: var(--accent);
}

.index-item.open .chevron::after {
  transform: rotate(40deg);
  background: var(--accent);
}

.index-panel {
  display: grid;
  grid-template-rows: 0fr;
  transition: grid-template-rows 0.5s cubic-bezier(0.2, 0.8, 0.2, 1);
}

.index-item.open .index-panel {
  grid-template-rows: 1fr;
}

.index-panel-inner {
  overflow: hidden;
  min-height: 0;
}

.toc {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 0 2.4rem;
  padding: 0.15rem 0 1.7rem 5.5rem;
}

.toc.single {
  grid-template-columns: 1fr;
}

.toc-row {
  display: grid;
  grid-template-columns: 2rem minmax(0, 1fr) auto 72px;
  align-items: center;
  gap: 0.75rem;
  min-height: 4.1rem;
  padding: 0.55rem 0;
  border-top: 1px solid var(--border-soft);
  transition: background 0.2s;
}

.toc-row:hover {
  background: var(--accent-soft);
}

.toc-num {
  font-family: var(--mono);
  font-size: 0.58rem;
  color: var(--muted);
}

.toc-title {
  font-size: 0.94rem;
  line-height: 1.45;
  color: var(--sub);
  transition: color 0.2s;
}

.toc-row:hover .toc-title {
  color: var(--accent);
}

.toc-meta {
  font-family: var(--mono);
  font-size: 0.56rem;
  letter-spacing: 0.04em;
  color: var(--muted);
  white-space: nowrap;
}

.toc-thumb {
  width: 72px;
  height: 46px;
  object-fit: cover;
  border: 1px solid var(--border);
  filter: saturate(0.82) contrast(0.98);
  transition: transform 0.3s, filter 0.3s;
}

.toc-row:hover .toc-thumb {
  transform: scale(1.045);
  filter: saturate(1) contrast(1);
}

.toc-thumb.placeholder {
  display: grid;
  place-items: center;
  background: var(--card);
  color: var(--tone, var(--accent));
  font-family: var(--serif);
  font-size: 1.15rem;
  font-style: italic;
  filter: none;
}

/* ---------- colophon ---------- */
.colophon {
  margin-top: 5.8rem;
  padding-top: 1.6rem;
  padding-bottom: 3.2rem;
  border-top: 3px double var(--border);
}

.colophon-mark {
  font-family: var(--sans);
  font-size: 0.6rem;
  font-weight: 600;
  letter-spacing: 0.28em;
  text-transform: uppercase;
  color: var(--accent);
}

.colophon-grid {
  display: grid;
  grid-template-columns: 1.2fr 1fr 1fr;
  gap: 2.5rem;
  margin-top: 1.25rem;
}

.colophon h3 {
  margin: 0 0 0.45rem;
  font-family: var(--sans);
  font-size: 0.6rem;
  font-weight: 600;
  letter-spacing: 0.18em;
  text-transform: uppercase;
  color: var(--muted);
}

.colophon p {
  margin: 0;
  max-width: 30rem;
  font-size: 0.8rem;
  line-height: 1.85;
  color: var(--muted);
}

.colophon-bottom {
  display: flex;
  align-items: baseline;
  justify-content: space-between;
  gap: 1rem;
  margin-top: 2.2rem;
  padding-top: 0.75rem;
  border-top: 1px solid var(--border-soft);
  font-family: var(--mono);
  font-size: 0.58rem;
  letter-spacing: 0.12em;
  color: var(--muted);
  text-transform: uppercase;
}

.colophon-bottom a {
  border-bottom: 1px solid var(--border);
}

.colophon-bottom a:hover {
  color: var(--accent);
  border-color: var(--accent-line);
}

/* ---------- entrance ---------- */
@keyframes pageFadeUp {
  from {
    opacity: 0;
    transform: translateY(12px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes portraitFadeIn {
  from {
    opacity: 0;
    transform: translateY(12px) rotate(-1.4deg);
  }
  to {
    opacity: 1;
    transform: rotate(-1.4deg);
  }
}

.home-root.is-ready .masthead { animation: pageFadeUp 0.75s cubic-bezier(0.2, 0.8, 0.2, 1) 0ms both; }
.home-root.is-ready .kicker   { animation: pageFadeUp 0.75s cubic-bezier(0.2, 0.8, 0.2, 1) 80ms both; }
.home-root.is-ready h1        { animation: pageFadeUp 0.75s cubic-bezier(0.2, 0.8, 0.2, 1) 140ms both; }
.home-root.is-ready .hero-en  { animation: pageFadeUp 0.75s cubic-bezier(0.2, 0.8, 0.2, 1) 200ms both; }
.home-root.is-ready .tagline  { animation: pageFadeUp 0.75s cubic-bezier(0.2, 0.8, 0.2, 1) 260ms both; }
.home-root.is-ready .hero-bio { animation: pageFadeUp 0.75s cubic-bezier(0.2, 0.8, 0.2, 1) 320ms both; }
.home-root.is-ready .hero-meta{ animation: pageFadeUp 0.75s cubic-bezier(0.2, 0.8, 0.2, 1) 380ms both; }
.home-root.is-ready .portrait { animation: portraitFadeIn 0.8s cubic-bezier(0.2, 0.8, 0.2, 1) 280ms both; }
.home-root.is-ready .stats    { animation: pageFadeUp 0.75s cubic-bezier(0.2, 0.8, 0.2, 1) 420ms both; }
.home-root.is-ready .recent   { animation: pageFadeUp 0.75s cubic-bezier(0.2, 0.8, 0.2, 1) 480ms both; }
.home-root.is-ready .index    { animation: pageFadeUp 0.75s cubic-bezier(0.2, 0.8, 0.2, 1) 550ms both; }
.home-root.is-ready .colophon { animation: pageFadeUp 0.75s cubic-bezier(0.2, 0.8, 0.2, 1) 620ms both; }

/* ---------- responsive ---------- */
@media (max-width: 1040px) {
  .page {
    padding-left: 30px;
    padding-right: 30px;
  }
  .hero {
    grid-template-columns: minmax(0, 1fr) 244px;
    gap: 3rem;
  }
  .toc {
    padding-left: 4.8rem;
    gap: 0 1.6rem;
  }
}

@media (max-width: 900px) {
  .masthead-meta {
    display: none;
  }
  .hero {
    grid-template-columns: 1fr;
    gap: 2.6rem;
    padding-top: 3.2rem;
  }
  .hero-side {
    display: grid;
    grid-template-columns: 196px 1fr;
    gap: 1.6rem;
    align-items: start;
  }
  .portrait {
    max-width: 196px;
  }
  .stats {
    margin-top: 0;
    padding-top: 1rem;
  }
  .topnav {
    flex-wrap: nowrap;
    overflow-x: auto;
    gap: 0.3rem 0.95rem;
    scrollbar-width: none;
  }
  .topnav::-webkit-scrollbar {
    display: none;
  }
  .topnav a {
    flex: 0 0 auto;
    font-size: 0.7rem;
  }
  .toc {
    grid-template-columns: 1fr;
    padding-left: 4.8rem;
  }
  .colophon-grid {
    grid-template-columns: 1fr 1fr;
    gap: 1.6rem 2rem;
  }
  .colophon-grid > div:last-child {
    grid-column: 1 / -1;
  }
}

@media (max-width: 680px) {
  .page {
    padding-left: 20px;
    padding-right: 20px;
  }
  .masthead-top {
    padding-bottom: 0.8rem;
  }
  .brand-en {
    font-size: 0.64rem;
    letter-spacing: 0.24em;
  }
  .brand-cn {
    display: none;
  }
  .topnav {
    gap: 0.3rem 1rem;
  }
  .topnav a {
    font-size: 0.7rem;
  }
  .hero {
    padding-top: 2.6rem;
    padding-bottom: 2.6rem;
  }
  h1 {
    font-size: clamp(2.2rem, 10.5vw, 3.4rem);
  }
  .tagline {
    font-size: 1.04rem;
  }
  .hero-bio {
    font-size: 0.93rem;
  }
  .hero-side {
    grid-template-columns: 148px 1fr;
    gap: 1.2rem;
  }
  .portrait {
    padding: 7px 7px 6px;
  }
  .portrait figcaption {
    font-size: 0.5rem;
  }
  .stats {
    grid-template-columns: repeat(3, 1fr);
  }
  .stats strong {
    font-size: 1.05rem;
  }
  .stats span {
    font-size: 0.5rem;
    letter-spacing: 0.08em;
  }
  .section-head {
    align-items: flex-start;
    flex-direction: column;
    gap: 0.4rem;
  }
  .section-head h2 {
    font-size: 1.75rem;
  }
  .section-note {
    margin-bottom: 0;
  }
  .revision {
    grid-template-columns: 3.4rem minmax(0, 1fr) 1.2rem;
    gap: 0.6rem;
  }
  .rev-tag {
    display: none;
  }
  .index-head {
    grid-template-columns: 2.5rem minmax(0, 1fr) 1.2rem;
    gap: 0.7rem;
    padding: 1.05rem 0;
  }
  .index-num {
    font-size: 1.65rem;
  }
  .index-title {
    font-size: 1.28rem;
  }
  .index-desc {
    font-size: 0.78rem;
  }
  .index-count {
    display: none;
  }
  .toc {
    padding-left: 0;
    padding-bottom: 1.2rem;
  }
  .toc-row {
    grid-template-columns: 1.6rem minmax(0, 1fr) 58px;
    gap: 0.55rem;
    min-height: 3.5rem;
  }
  .toc-meta {
    display: none;
  }
  .toc-thumb {
    width: 58px;
    height: 38px;
  }
  .colophon {
    margin-top: 4rem;
  }
  .colophon-grid {
    grid-template-columns: 1fr;
    gap: 1.2rem;
  }
  .colophon-bottom {
    flex-direction: column;
    gap: 0.35rem;
  }
}

@media (prefers-reduced-motion: reduce) {
  *,
  *::before,
  *::after {
    transition-duration: 0.01ms !important;
    animation-duration: 0.01ms !important;
  }
}
</style>
