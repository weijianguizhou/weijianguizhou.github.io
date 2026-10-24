<script setup lang="ts">
import { computed, nextTick, onMounted, ref } from 'vue'
import { useData, useRoute } from 'vitepress'

const { frontmatter } = useData()
const route = useRoute()

const series = computed(() => (frontmatter.value.series as string) || '')
const chapter = computed(() => (frontmatter.value.chapter as string | number) || '')
const minutes = ref(0)

function measure() {
  const el = document.querySelector('.vp-doc')
  if (!el) return
  const chars = (el.textContent || '').replace(/\s+/g, '').length
  minutes.value = Math.max(1, Math.round(chars / 420))
}

onMounted(() => nextTick(measure))
// 站内跳转不会重新挂载 Layout，路由变了再量一次
if (typeof window !== 'undefined') {
  // @ts-expect-error vitepress 的 router 在 client 端可用
  window.addEventListener('vitepress:routeChanged', () => nextTick(measure))
}
</script>

<template>
  <div v-if="series" class="av-docmeta">
    <span class="av-docmeta-series">{{ series }}</span>
    <template v-if="chapter">
      <span class="av-docmeta-dot">·</span>
      <span>第 {{ chapter }} 章</span>
    </template>
    <template v-if="minutes">
      <span class="av-docmeta-dot">·</span>
      <span>约 {{ minutes }} 分钟</span>
    </template>
  </div>
</template>
