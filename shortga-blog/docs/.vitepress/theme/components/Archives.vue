<template>
    <div class="flex flex-col items-center mx-auto space-y-8 md:justify-center md:flex-row md:space-x-8 md:mt-8">
        <div class="w-full md:w-2/3 mx-auto md:mx-0 pl-4 md:pl-0">
            <div class="space-y-6 md:space-y-8">
                <template v-for="(yearList, yearIndex) in yearPosts" :key="yearIndex">
                    <div class="space-y-2 ml-4">
                        <div class="text-2xl ml-4">{{ yearList[0] }}</div>
                        <div class="space-y-2">
                            <template v-for="(article, index) in yearList[1]" :key="index">
                                <a :href="article.url" class="flex items-center space-x-2 md:space-x-4 ml-4">
                                    <div class="text-gray-500 text-base md:text-lg ml-4">{{ article.date.slice(5) }}</div>
                                    <div class="text-base md:text-lg">{{ article.title }}</div>
                                </a>
                            </template>
                        </div>
                    </div>
                </template>
            </div>
        </div>
    </div>
</template>

<script lang="ts" setup>
import { computed } from 'vue'
import { data } from '../posts.data'
import { createArchives } from "../functions";

const yearPosts = computed(() => createArchives(data))
</script>

<style scoped>
a:hover .text-lg,
a:hover .text-base,
a:hover .text-gray-500 {
    color: #10b981;
}
</style>