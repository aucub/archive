<template>
    <div class="flex justify-center">
        <div class="w-full md:w-4/5">
            <div
                class="flex flex-wrap justify-start md:justify-between items-center space-y-4 md:space-y-0 md:space-x-4 mt-8">
                <span @click="toggleTag(key)" v-for="(item, key) in tagPosts" :key="key"
                    class="bg-gray-200 rounded-full px-4 py-2 cursor-pointer hover:bg-gray-300">
                    <span class="text-lg font-bold">{{ key }}</span>
                    <span class="ml-2">{{ tagPosts[key].length }}</span>
                </span>
                <div class="md:ml-auto"></div>
            </div>

            <div class="text-2xl font-bold mt-8 mb-4 ml-4 md:ml-4">{{ selectTag }}</div>

            <div class="flex flex-col space-y-4 ml-4 md:ml-4">
                <a :href="`/tags?selectTag=${selectTag}`" v-for="(article, index) in tagPosts[selectTag]" :key="index"
                    class="flex items-center">
                    <a :href="article.url" class="flex flex-wrap items-center">
                        <div class="text-gray-500 text-lg md:mr-4 flex-grow">{{ article.date }}</div>
                        <div class="text-lg font-medium text-right">{{ article.title }}</div>
                    </a>
                </a>
            </div>
        </div>
    </div>
</template>

<script lang="ts" setup>
import { computed, ref } from 'vue'
import { initTags } from '../functions'
import { data } from '../posts.data'

let url = location.href.split('?')[1]
let params = new URLSearchParams(url)

const tagPosts = computed(() => initTags(data))
let selectTag = ref(params.get('selectTag') ? params.get('selectTag') : '')

const toggleTag = (tag: string) => {
    selectTag.value = tag
}
</script>

<style scoped>
a:hover .text-lg,
a:hover .text-gray-500 {
    color: #10b981;
}
</style>