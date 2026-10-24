<script setup lang="ts">
import { onBeforeUnmount, onMounted, ref } from 'vue'

const progress = ref(0)
const visible = ref(false)

function onScroll() {
  const el = document.documentElement
  const max = el.scrollHeight - el.clientHeight
  progress.value = max > 0 ? Math.min(1, el.scrollTop / max) : 0
  visible.value = el.scrollTop > 160
}

onMounted(() => {
  onScroll()
  window.addEventListener('scroll', onScroll, { passive: true })
  window.addEventListener('resize', onScroll)
})

onBeforeUnmount(() => {
  window.removeEventListener('scroll', onScroll)
  window.removeEventListener('resize', onScroll)
})
</script>

<template>
  <div class="av-progress" :class="{ 'is-visible': visible }" aria-hidden="true">
    <span class="av-progress-bar" :style="{ transform: `scaleX(${progress})` }" />
  </div>
</template>
