<script setup lang="ts">
import DefaultTheme from 'vitepress/theme'
import { useData } from 'vitepress'
import HomePage from './components/HomePage.vue'

const { frontmatter } = useData()
const DefaultLayout = DefaultTheme.Layout
</script>

<template>
  <HomePage v-if="frontmatter.customLayout === 'home'" />
  <DefaultLayout v-else />
</template>
