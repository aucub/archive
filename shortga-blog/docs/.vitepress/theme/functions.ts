type Post = {
    title: string
    url: string
    date: string
    datesort: number
    tags: string[]
    description: string
}

export function initTags(post: Post[]) {
    const tagPosts: any = {}
    for (let index = 0; index < post.length; index++) {
        const element = post[index]
        const tags = element.tags
        if (tags) {
            tags.forEach((item) => {
                if (tagPosts[item]) {
                    tagPosts[item].push(element)
                } else {
                    tagPosts[item] = []
                    tagPosts[item].push(element)
                }
            })
        }
    }
    return tagPosts
}
export function createArchives(posts: Post[]) {
    const yearPosts: { [year: number]: Post[] } = {}

    for (const post of posts) {
        if (post.date) {
            const year = parseInt(post.date.substring(0, 4))
            const datesort = Date.parse(post.date)
            const postWithDateSort: Post = { ...post, datesort }

            if (year in yearPosts) {
                yearPosts[year].push(postWithDateSort)
            } else {
                yearPosts[year] = [postWithDateSort]
            }
        }
    }
    Object.values(yearPosts).forEach((posts) => {
        posts.sort((a, b) => b.datesort - a.datesort)
    })
    const sortedYearPosts = Object.entries(yearPosts).sort(([yearA], [yearB]) => parseInt(yearB) - parseInt(yearA))
    return sortedYearPosts
}