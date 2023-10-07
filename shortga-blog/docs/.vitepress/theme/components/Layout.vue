<script setup lang="ts">
import DefaultTheme from 'vitepress/theme'
import Comments from './Comments.vue'
import Page from './Page.vue'
import Title from './Title.vue'
import Progress from './Progress.vue'

const { Layout } = DefaultTheme
</script>

<template>
  <Layout>
    <template #doc-top>
      <Progress />
    </template>
    <template #doc-before>
      <Title />
    </template>
    <template #doc-after>
      <Comments />
    </template>
    <template #home-hero-after>
      <Page />
    </template>
  </Layout>
</template>
