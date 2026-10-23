<script setup lang="ts">
type Project = {
  title: string
  cover: string
  meta: string
  desc: string
  link: string
  lang: string
  tone: string
}

const profile = {
  name: '魏舟',
  en: 'Wei Zhou',
  tagline: '一个对力学和机器人感兴趣的本科生~',
  facts: [
    '南京理工大学 · 力学与机器人方向',
    '最近在做：ROS 2、多体系统动力学'
  ],
  github: 'https://github.com/weijianguizhou',
  email: 'wei_zhou@njust.edu.cn'
}

const projects: Project[] = [
  {
    title: 'ROS 2 学习记录（连载）',
    cover: 'ROS 2',
    meta: '2026 年 10 月 · 教程',
    desc: '从配置 WSL 2、装 ROS 2 Humble 到写出第一个节点，按章节一步步来。',
    link: '/ros2/',
    lang: 'Ubuntu 22.04',
    tone: 'sage'
  },
  {
    title: '多体系统动力学',
    cover: '动力学',
    meta: '2026 年 9 月 · 课程',
    desc: '多体系统动力学的课程笔记与推导。',
    link: 'https://github.com/weijianguizhou/mutibodysysytemdynamics',
    lang: 'TeX',
    tone: 'mist'
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
        <img class="av-photo" src="/avatar.png" :alt="profile.name" width="168" height="168" />
      </header>

      <section class="av-work">
        <h2>Work</h2>
        <p class="av-work-intro">
          <a href="/posts/">写作</a>、课程笔记，和最近的学习记录。全部代码在
          <a :href="`${profile.github}?tab=repositories`" target="_blank" rel="noreferrer">GitHub</a>。
        </p>

        <div class="av-list">
          <article v-for="p in projects" :key="p.title" class="av-item">
            <a
              class="av-cover"
              :class="`tone-${p.tone}`"
              :data-ghost="p.cover.slice(0, 1)"
              :href="p.link"
              :target="isExternal(p.link) ? '_blank' : undefined"
              :rel="isExternal(p.link) ? 'noreferrer' : undefined"
            >
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
            <p class="av-item-meta">{{ p.meta }}</p>
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
</style>
