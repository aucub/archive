<script setup lang="ts">
import { useData } from 'vitepress'
import { ref, watch } from 'vue';
const { title, isDark } = useData()

watch(
  () => isDark,
  (newVal) => {
    const scriptEl = document.querySelector('.comments script')
    if (scriptEl) {
      scriptEl.setAttribute('data-theme', newVal ? 'noborder_dark' : 'noborder_light')
      scriptEl.removeAttribute('src')
      scriptEl.setAttribute('async', '')
    }
  },
  { immediate: true, deep: true, flush: 'post' }
)

</script>
<template>
  <div class="comments">
    <component :is="'script'" :key="title" src="https://giscus.app/client.js" data-repo="aucub/aucub.github.io"
      data-repo-id="R_kgDOGUcwVA" data-category="Announcements" data-category-id="DIC_kwDOGUcwVM4CTz4P"
      data-mapping="title" data-strict="0" data-reactions-enabled="1" data-emit-metadata="0" data-input-position="top"
      data-lang="zh-CN" :data-theme="isDark ? 'noborder_dark' : 'noborder_light'" async />
  </div>
</template>