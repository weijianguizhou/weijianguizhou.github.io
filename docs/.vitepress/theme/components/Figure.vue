<script setup lang="ts">
withDefaults(
  defineProps<{
    src: string
    alt?: string
    caption?: string
    width?: number | string
  }>(),
  { alt: '', caption: '', width: 0 }
)
</script>

<template>
  <figure class="nb-figure">
    <img
      :src="src"
      :alt="alt || caption"
      loading="lazy"
      decoding="async"
      :style="width ? { width: typeof width === 'number' ? `${width}px` : width, maxWidth: '100%' } : undefined"
    />
    <figcaption v-if="caption">{{ caption }}</figcaption>
  </figure>
</template>
