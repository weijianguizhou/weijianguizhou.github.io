<script setup lang="ts">
import { onBeforeUnmount, onMounted, ref } from 'vue'

const emit = defineEmits<{
  (e: 'reveal'): void
  (e: 'done'): void
}>()

const leaving = ref(false)
const revealed = ref(false)
const finished = ref(false)

let timers: number[] = []
let locked = false
let previousHtmlOverflow = ''
let previousBodyOverflow = ''

function later(fn: () => void, ms: number) {
  timers.push(window.setTimeout(fn, ms))
}

function clearTimers() {
  timers.forEach((timer) => window.clearTimeout(timer))
  timers = []
}

function reveal() {
  if (revealed.value) return
  revealed.value = true
  emit('reveal')
}

function finish() {
  if (leaving.value) return

  leaving.value = true
  reveal()
  clearTimers()

  later(() => {
    if (finished.value) return
    finished.value = true
    emit('done')
  }, 760)
}

function lockScroll() {
  if (locked) return

  previousHtmlOverflow = document.documentElement.style.overflow
  previousBodyOverflow = document.body.style.overflow
  document.documentElement.style.overflow = 'hidden'
  document.body.style.overflow = 'hidden'
  locked = true
}

function unlockScroll() {
  if (!locked) return

  document.documentElement.style.overflow = previousHtmlOverflow
  document.body.style.overflow = previousBodyOverflow
  locked = false
}

function onKeydown(event: KeyboardEvent) {
  if (event.key === 'Escape') finish()
}

onMounted(() => {
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches

  if (reduceMotion) {
    reveal()
    finished.value = true
    emit('done')
    return
  }

  lockScroll()
  window.addEventListener('keydown', onKeydown)

  // 仅开发环境：?intro-hold=1 可让开场纸页停留，便于检查排版。
  if (import.meta.env.DEV && new URLSearchParams(window.location.search).has('intro-hold')) {
    return
  }

  // 纸页停留约 2.25s，再用 0.76s 抽走；总时长约 3s。
  later(finish, 2250)
})

onBeforeUnmount(() => {
  clearTimers()
  unlockScroll()
  window.removeEventListener('keydown', onKeydown)
})
</script>

<template>
  <div
    class="intro"
    :class="{ 'is-leaving': leaving }"
    role="dialog"
    aria-modal="true"
    aria-label="正在进入个人主页"
  >
    <div class="sheet">
      <div class="sheet-grain" aria-hidden="true" />

      <div class="intro-inner">
        <div class="photo-wrap">
          <span class="tape tape-left" aria-hidden="true" />
          <span class="tape tape-right" aria-hidden="true" />
          <figure class="photo">
            <img src="/ros2/panda.webp" alt="爱吃烧饼的大熊猫" width="400" height="287" />
            <figcaption>NANJING · 2026</figcaption>
          </figure>
        </div>

        <div class="words">
          <p class="kicker">Personal Notes / 个人笔记</p>
          <h1 class="intro-title">爱吃烧饼的大熊猫</h1>
          <div class="signature">
            <p class="intro-en">Sesame Panda</p>
            <span class="seal" aria-hidden="true">熊猫</span>
          </div>
        </div>
      </div>

      <button class="skip" type="button" title="跳过开场（Esc）" @click="finish">
        跳过 <span aria-hidden="true">→</span>
      </button>
    </div>
  </div>
</template>

<style scoped>
.intro {
  position: fixed;
  inset: 0;
  z-index: 120;
  overflow: hidden;
  color: var(--ink);
  font-family: var(--serif);
}

.sheet {
  position: absolute;
  inset: 0;
  display: grid;
  place-items: center;
  min-height: 100dvh;
  background:
    radial-gradient(1000px 540px at 50% -8%, var(--accent-soft), transparent 62%),
    repeating-linear-gradient(0deg, rgba(0, 0, 0, 0.012) 0 1px, transparent 1px 3px),
    var(--paper);
  box-shadow: 0 30px 80px rgba(29, 26, 20, 0.18);
  transform: translateY(0);
  transition:
    transform 0.78s cubic-bezier(0.72, 0, 0.18, 1),
    opacity 0.62s ease 0.08s;
  will-change: transform, opacity;
}

.sheet-grain {
  position: absolute;
  inset: 0;
  pointer-events: none;
  opacity: 0.08;
  mix-blend-mode: multiply;
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='160' height='160'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='.92' numOctaves='2' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='160' height='160' filter='url(%23n)' opacity='.55'/%3E%3C/svg%3E");
}

.home-root.is-dark .sheet-grain {
  opacity: 0.1;
  mix-blend-mode: screen;
  filter: invert(1);
}

.intro-inner {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: clamp(1.4rem, 3.2vh, 2.2rem);
  width: 100%;
  max-width: 860px;
  padding: 5vh 24px 7vh;
  text-align: center;
}

.photo-wrap {
  position: relative;
  opacity: 0;
  transform: translateY(34px) rotate(-4deg) scale(0.97);
  animation: photoIn 0.92s cubic-bezier(0.18, 0.8, 0.2, 1) 0.18s forwards;
}

.photo {
  position: relative;
  margin: 0;
  padding: 10px 10px 8px;
  background: #fffdf7;
  border: 1px solid var(--border);
  box-shadow:
    0 26px 52px -30px rgba(29, 26, 20, 0.55),
    0 2px 0 rgba(29, 26, 20, 0.06);
  transform: rotate(-1.6deg);
}

.photo img {
  display: block;
  width: clamp(190px, 23vw, 276px);
  aspect-ratio: 4 / 3;
  object-fit: cover;
  filter: sepia(0.05) contrast(1.02) saturate(0.94);
}

.photo figcaption {
  margin-top: 0.55rem;
  font-family: var(--mono);
  font-size: 0.54rem;
  letter-spacing: 0.22em;
  color: var(--muted);
  text-transform: uppercase;
}

.tape {
  position: absolute;
  top: -10px;
  z-index: 2;
  width: 82px;
  height: 23px;
  background: rgba(214, 197, 158, 0.52);
  border-left: 1px solid rgba(255, 255, 255, 0.28);
  border-right: 1px solid rgba(255, 255, 255, 0.22);
  box-shadow: 0 2px 5px rgba(29, 26, 20, 0.08);
  backdrop-filter: blur(0.5px);
}

.tape-left {
  left: 11%;
  transform: rotate(-7deg);
}

.tape-right {
  right: 11%;
  transform: rotate(5deg);
}

.home-root.is-dark .tape {
  background: rgba(184, 164, 124, 0.3);
  border-color: rgba(255, 255, 255, 0.1);
}

.words {
  max-width: 100%;
}

.kicker {
  margin: 0 0 0.8rem;
  font-family: var(--sans);
  font-size: 0.62rem;
  font-weight: 600;
  letter-spacing: 0.28em;
  color: var(--accent);
  text-transform: uppercase;
  opacity: 0;
  animation: fadeUp 0.7s cubic-bezier(0.2, 0.8, 0.2, 1) 0.6s forwards;
}

.intro-title {
  margin: 0;
  font-family: var(--serif);
  font-size: clamp(2.1rem, 6.2vw, 4.4rem);
  font-weight: 500;
  line-height: 1.12;
  letter-spacing: 0.02em;
  white-space: nowrap;
  -webkit-mask-image: linear-gradient(90deg, #000 0%, #000 44%, transparent 68%, transparent 100%);
  mask-image: linear-gradient(90deg, #000 0%, #000 44%, transparent 68%, transparent 100%);
  -webkit-mask-size: 250% 100%;
  mask-size: 250% 100%;
  -webkit-mask-position: 100% 0;
  mask-position: 100% 0;
  animation: inkReveal 1.12s cubic-bezier(0.22, 0.7, 0.2, 1) 0.72s both;
}

.signature {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 1.15rem;
  margin-top: 1.05rem;
}

.intro-en {
  margin: 0;
  font-family: var(--sans);
  font-size: 0.68rem;
  font-weight: 500;
  letter-spacing: 0.46em;
  color: var(--muted);
  text-transform: uppercase;
  opacity: 0;
  animation: fadeUp 0.65s cubic-bezier(0.2, 0.8, 0.2, 1) 1.12s forwards;
}

.seal {
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 64px;
  height: 64px;
  background: #a33d2d;
  color: #f7efdf;
  font-family: var(--serif);
  font-size: 1.18rem;
  font-weight: 700;
  line-height: 1.05;
  letter-spacing: 0.04em;
  box-shadow:
    inset 0 0 0 2px #f7efdf,
    inset 0 0 0 4px #a33d2d;
  transform: rotate(-7deg) scale(1.4);
  opacity: 0;
  animation: stamp 0.46s cubic-bezier(0.18, 1.35, 0.4, 1) 1.48s forwards;
}

.seal::after {
  content: '';
  position: absolute;
  inset: 0;
  background:
    radial-gradient(circle at 16% 22%, var(--paper) 0 1px, transparent 1.6px),
    radial-gradient(circle at 82% 18%, var(--paper) 0 0.8px, transparent 1.4px),
    radial-gradient(circle at 74% 78%, var(--paper) 0 1.2px, transparent 1.8px),
    radial-gradient(circle at 30% 86%, var(--paper) 0 0.7px, transparent 1.3px);
  opacity: 0.26;
  pointer-events: none;
}

.skip {
  position: absolute;
  top: max(18px, env(safe-area-inset-top));
  right: max(20px, env(safe-area-inset-right));
  z-index: 3;
  appearance: none;
  padding: 0.38rem 0.7rem;
  background: transparent;
  border: 1px solid transparent;
  border-radius: 999px;
  color: var(--muted);
  font-family: var(--sans);
  font-size: 0.64rem;
  letter-spacing: 0.12em;
  cursor: pointer;
  opacity: 0;
  animation: fadeIn 0.5s ease 0.55s forwards;
  transition:
    color 0.2s,
    border-color 0.2s,
    background 0.2s;
}

.skip span {
  display: inline-block;
  margin-left: 0.15rem;
  transition: transform 0.2s;
}

.skip:hover,
.skip:focus-visible {
  color: var(--accent);
  border-color: var(--accent-line);
  background: var(--accent-soft);
}

.skip:hover span {
  transform: translateX(2px);
}

.intro.is-leaving {
  pointer-events: none;
}

.intro.is-leaving .sheet {
  transform: translateY(-104%);
  opacity: 0;
}

.intro.is-leaving .intro-inner {
  opacity: 0;
  transform: translateY(-10px);
  transition:
    opacity 0.32s ease,
    transform 0.42s cubic-bezier(0.4, 0, 0.2, 1);
}

.intro.is-leaving .skip {
  opacity: 0;
  transition: opacity 0.2s;
}

@keyframes photoIn {
  to {
    opacity: 1;
    transform: translateY(0) rotate(-1.6deg) scale(1);
  }
}

@keyframes fadeUp {
  from {
    opacity: 0;
    transform: translateY(8px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes fadeIn {
  to {
    opacity: 1;
  }
}

@keyframes inkReveal {
  from {
    -webkit-mask-position: 100% 0;
    mask-position: 100% 0;
  }
  to {
    -webkit-mask-position: 0 0;
    mask-position: 0 0;
  }
}

@keyframes stamp {
  0% {
    opacity: 0;
    transform: rotate(-13deg) scale(1.55);
    filter: blur(3px);
  }
  62% {
    opacity: 1;
    transform: rotate(-6deg) scale(0.96);
    filter: blur(0);
  }
  100% {
    opacity: 1;
    transform: rotate(-7deg) scale(1);
    filter: blur(0);
  }
}

@media (max-width: 680px) {
  .intro-inner {
    gap: 1.3rem;
    padding: 4vh 20px 6vh;
  }

  .photo img {
    width: min(58vw, 230px);
  }

  .kicker {
    font-size: 0.56rem;
    letter-spacing: 0.22em;
  }

  .intro-title {
    font-size: clamp(1.9rem, 9.4vw, 3rem);
    letter-spacing: 0.01em;
  }

  .signature {
    gap: 0.9rem;
    margin-top: 0.8rem;
  }

  .intro-en {
    font-size: 0.58rem;
    letter-spacing: 0.32em;
  }

  .seal {
    width: 54px;
    height: 54px;
    font-size: 1rem;
  }

  .skip {
    top: max(12px, env(safe-area-inset-top));
    right: max(12px, env(safe-area-inset-right));
  }
}

@media (prefers-reduced-motion: reduce) {
  .intro {
    display: none;
  }

  .photo-wrap,
  .kicker,
  .intro-title,
  .intro-en,
  .seal,
  .skip {
    opacity: 1;
    animation: none;
    transform: none;
    -webkit-mask-image: none;
    mask-image: none;
  }

  .sheet {
    transition: none;
  }
}
</style>
