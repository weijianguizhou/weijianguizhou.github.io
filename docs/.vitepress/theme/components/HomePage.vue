<script setup lang="ts">
type Project = {
  title: string
  cover: string
  meta: string
  desc: string
  link: string
  lang: string
  tone: string
  image?: string
  badge?: string
}

const profile = {
  name: '魏舟',
  en: 'Wei Zhou',
  tagline: '一个对力学和机器人感兴趣的本科生~',
  facts: [
    '南京理工大学 · 力学与机器人方向',
    '最近在做：ROS 2、流体力学、数字电路'
  ],
  github: 'https://github.com/weijianguizhou',
  email: 'wei_zhou@njust.edu.cn'
}

// 所有笔记都做成卡片。image 是「鼠标悬停时浮现的那张代表图」，
// 移开鼠标后卡片回到默认的纯排版封面（CSS 过渡，不依赖 JS）。
const notes: Project[] = [
  {
    title: 'ROS 2 学习记录（连载）',
    cover: 'ROS 2',
    meta: '2026 年 10 月 · 7 章连载',
    desc: '从 Ubuntu、WSL 环境一路到 ROS 2 架构与编译，全是踩过的坑。',
    link: '/ros2/',
    lang: 'UBUNTU 26.04',
    tone: 'sage',
    badge: '连载',
    image: '/ros2/talker-listener.webp'
  },
  {
    title: '流体力学（连载）',
    cover: '流体力学',
    meta: '2026 年 10 月 · 课程笔记',
    desc: '从连续介质模型、粘性到张量代数，公式都排版好了。',
    link: '/fluids/',
    lang: 'FLUID MECHANICS',
    tone: 'mist',
    badge: '连载',
    image: '/fluids/stress-state.webp'
  },
  {
    title: '数字电路（连载）',
    cover: '数字电路',
    meta: '2026 年 10 月 · 课程笔记',
    desc: '数制与编码、布尔代数与逻辑门，配逻辑电路图。',
    link: '/digital/',
    lang: 'DIGITAL CIRCUITS',
    tone: 'sand',
    badge: '连载',
    image: '/digital/and-circuit.webp'
  },
  {
    title: '材料力学',
    cover: '材料力学',
    meta: '2026 · 13 章 + 附录',
    desc: '从轴向拉压到能量法，低碳钢拉伸曲线、应力单元体都在里面。',
    link: '/notes/mechanics/',
    lang: 'MECHANICS',
    tone: 'clay',
    badge: '已学完',
    image: '/mechanics/mild-steel-curve.webp'
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
    image: '/notes/ode-lorenz.png'
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
    image: '/notes/chi2-density.webp'
  }
]

const year = new Date().getFullYear()

// 站内链接不开新标签页，站外链接才开
const isExternal = (link: string) => /^https?:\/\//.test(link)
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
            <a href="/posts/">写作</a>
            <span class="av-sep">·</span>
            <a href="/about.html">关于</a>
          </p>
        </div>
        <img class="av-photo" src="/avatar.jpg" :alt="profile.name" width="168" height="168" />
      </header>

      <section class="av-work">
        <h2>笔记</h2>
        <p class="av-work-intro">
          <a href="/posts/">写作</a>、课程笔记，和最近的学习记录。全部代码在
          <a :href="`${profile.github}?tab=repositories`" target="_blank" rel="noreferrer">GitHub</a>。
          鼠标移到卡片上，会浮现这份笔记里的一张代表图；移开就收回去。
        </p>

        <div class="av-list">
          <article v-for="p in notes" :key="p.title" class="av-item">
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

/* ---------- work ---------- */
.av-work {
  margin-top: 3.5rem;
}

.av-work h2 {
  margin: 0 0 0.45rem;
  font-size: 1.5rem;
  font-weight: 600;
  letter-spacing: -0.01em;
}

.av-work-intro {
  margin: 0 0 2.2rem;
  font-size: 0.9rem;
  color: var(--av-muted);
}

.av-work-intro a {
  color: var(--av-fg);
  text-decoration: underline;
  text-underline-offset: 2px;
}

.av-list {
  display: grid;
  grid-template-columns: 1fr;
  gap: 2.4rem 1.6rem;
  align-items: start;
}

@media (min-width: 640px) {
  .av-list {
    grid-template-columns: 1fr 1fr;
  }
}

.av-item {
  margin-bottom: 0;
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
  background: var(--av-card);
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
}

.av-cover:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 22px rgba(0, 0, 0, 0.07);
}

/* ---------- 悬停浮现代表图 ---------- */
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

/* 压在图片上的一层暗渐变，保证浮起时标题仍然看得清 */
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

.av-cover::after {
  transition: opacity 0.32s ease;
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
  background: var(--av-card);
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

  .av-cover-title {
    font-size: 1.2rem;
  }
}

@media (prefers-reduced-motion: reduce) {
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

/* 触屏设备没有 hover，保持纯排版封面即可，不做额外展开 */
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
