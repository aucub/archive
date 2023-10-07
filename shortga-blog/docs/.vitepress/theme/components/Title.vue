<template>
    <div class="header py-4">
        <h2 class="text-2xl font-bold">{{ pageData.title }}</h2>
        <p class="my-2"> <time datetime="{{ publishDate }}">{{ publishDate }}</time> </p>
        <p class="my-2"> 本文最后更新于:<time datetime="{{ updatedDate }}">{{ updatedDate }}</time> </p>
        <p class="my-2"> 字数:{{ wordCount }} 个字 预计阅读时间:{{ wordTime }} 分钟 </p>
        <div class="post-tags flex flex-wrap">
            <a v-for="item in pageData.frontmatter.tags" :key="item" :href="`/tags?selectTag=${item}`"
                class="tag mr-2 mb-2 hover:text-green-500 hover:font-medium">#{{ item }}</a>
        </div>
    </div>
</template>
<script lang="ts" setup>
import { useData, onContentUpdated } from "vitepress";
import { computed, onMounted, ref } from "vue";
type pageData = {
    description: string;
    title: string;
    frontmatter: object;
    headers: object[];
    lastUpdated: number;
};
const pageData: pageData = useData().page;
const publishDate = ref("");
const updatedDate = ref("");
onContentUpdated(() => {
    const { frontmatter } = pageData.value;
    const date = new Date(frontmatter.date)
    date.setUTCHours(0)
    publishDate.value = date.toLocaleDateString('zh-CN', {
        year: 'numeric',
        month: 'short',
        day: 'numeric'
    })
    const updated = new Date(frontmatter.updated)
    updated.setUTCHours(0)
    updatedDate.value = updated.toLocaleDateString('zh-CN', {
        year: 'numeric',
        month: 'short',
        day: 'numeric'
    })
});

onMounted(() => {
    analyze()
})

let wordCount = ref(0)
const wordTime = computed(() => {
    return ~~((wordCount.value / 275))
})

const $des = ref<HTMLDivElement>()

const analyze = () => {
    document.querySelectorAll('.meta-des').forEach((v) => v.remove())
    const docDomContainer = window.document.querySelector('#VPContent')
    const words =
        docDomContainer?.querySelector('.content-container .main')?.textContent ||
        ''
    wordCount.value = countWord(words)
    docDomContainer?.querySelector('h1')?.after($des.value!)
}

function countWord(data: string) {
    const pattern =
        /[a-zA-Z0-9_\u0392-\u03c9\u00c0-\u00ff\u0600-\u06ff\u0400-\u04ff]+|[\u4e00-\u9fff\u3400-\u4dbf\uf900-\ufaff\u3040-\u309f\uac00-\ud7af]+/g
    const m = data.match(pattern)
    let count = 0
    if (!m) {
        return 0
    }
    for (let i = 0; i < m.length; i += 1) {
        if (m[i].charCodeAt(0) >= 0x4e00) {
            count += m[i].length
        } else {
            count += 1
        }
    }
    return count
}

</script>
<style scoped>
.header {
    font-size: 0.875rem;
    line-height: 1.25rem;
    margin-bottom: 1em;
    padding-bottom: 1em;
    border-bottom: 1px dashed #c7c7c7;
}

.tag:hover {
    color: #10b981;
}
</style>