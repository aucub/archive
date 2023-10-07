<script setup lang="ts">
import { computed, ref } from 'vue';
import { data } from '../posts.data'

const posts = data.map((post) => {
  return {
    url: post.url,
    title: post.title,
    date: post.date,
    tags: post.tags,
    description: post.description
  }
})

const pageSize = 7
const pageTotal = Math.ceil(posts.length / pageSize)
const pageNumber = ref(1)

const pagePosts = computed(() => {
  const start = (pageNumber.value - 1) * pageSize
  const end = Math.min(pageNumber.value * pageSize, posts.length)
  return posts.slice(start, end)
})

</script>

<template>
  <div class="post-list flex flex-wrap justify-center p-4">
    <a v-for="(post, index) of pagePosts" :key="index" :href="post.url"
      class="post-item flex flex-col items-start mx-4 mb-4 w-full md:w-3/4">
      <h2 class="post-title text-2xl mb-2 hover:text-green-500">{{ post.title }}</h2>
      <p class="post-description text-sm mb-2 hover:text-green-500">{{ post.description }}</p>
      <div class="post-meta flex justify-between items-center w-full">
        <span class="post-date text-xs">{{ post.date }}</span>
        <div class="post-tags">
          <a v-for="item in post.tags" :key="item" :href="`/tags?selectTag=${item}`"
            class="tag text-xs bg-gray-200 rounded px-2 hover:text-green-500">{{ item }}</a>
        </div>
      </div>
    </a>

  </div>
  <div class="pagination">
    <a class="link" :class="{ active: pageNumber === i }" v-for="i in pageTotal" :key="i" @click="pageNumber = i">{{ i
    }}</a>
  </div>
</template>
<style scoped>
.post-title:hover {
  color: #10b981;
}

.post-description:hover {
  color: #10b981;
}

.tag:hover {
  color: #10b981;
}

.pagination {
  margin-top: 16px;
  margin-bottom: 16px;
  display: flex;
  justify-content: center;
  align-items: flex-end;
}

.pagination:hover {
  cursor: pointer;
  color: black;
  text-decoration: underline;
}

.link {
  display: inline-block;
  width: 24px;
  text-align: center;
  border: 1px var(--vp-c-divider-light) solid;
  border-right: none;
  font-weight: 400;
}

.link.active {
  background: var(--vp-c-text-1);
  color: var(--vp-c-text-inverse-1);
  border: 1px solid var(--vp-c-text-1) !important;
}

.link:first-child {
  border-bottom-left-radius: 2px;
  border-top-left-radius: 2px;
}

.link:last-child {
  border-bottom-right-radius: 2px;
  border-top-right-radius: 2px;
  border-right: 1px var(--vp-c-divider-light) solid;
}
</style>