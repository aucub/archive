import { createContentLoader } from 'vitepress'
import matter from 'gray-matter'

export interface Post {
  title: string
  url: string
  date: string
  datesort: number
  tags: string[]
  description: string
}

declare const data: Post[]
export { data }

export default createContentLoader('posts/*.md', {
  includeSrc: true,
  transform: (raw) => {
    return raw
      .map((post) => ({
        title: post.frontmatter.title,
        url: post.url,
        date: formatDate(post.frontmatter.date),
        datesort: Math.floor(post.frontmatter.date.getTime() / 1000),
        tags: post.frontmatter.tags,
        description: getTextSummary(post.src),
      }))
      .sort((a, b) => b.datesort - a.datesort)
  }
})

function formatDate(raw: string): Post['date'] {
  const date = new Date(raw)
  date.setUTCHours(0)
  return date.toLocaleDateString('zh-CN', {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  })
}

function getTextSummary(text: string | undefined) {
  if (text === undefined) {
    return ''
  }
  const file = matter(text, {
    excerpt: true,
    excerpt_separator: '<!-- more -->'
  })
  const excerpt = file.excerpt
  if (excerpt === '' || excerpt === undefined || excerpt === null) {
    return file.content
      // 除去标题
      ?.replace(/#/g, '')
      // 除去图片
      ?.replace(/!\[.*?\]\(.*?\)/g, '')
      // 除去链接
      ?.replace(/\[(.*?)\]\(.*?\)/g, '$1')
      // 除去加粗
      ?.replace(/\*\*(.*?)\*\*/g, '$1')
      ?.split('\n')
      ?.filter((v) => !!v)
      ?.slice(1)
      ?.join('\n')
      ?.replace(/>(.*)/, '')
      ?.slice(0, 170)
  }
  return excerpt
}

