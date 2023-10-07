import { defineConfig } from 'vitepress'

export default defineConfig({
  base: '/',
  lang: 'zh-CN',
  title: `shortga's blog`,
  description: `shortga's blog`,
  lastUpdated: true,
  cleanUrls: true,
  ignoreDeadLinks: true,
  markdown: {
    theme: 'github-dark-dimmed',
    lineNumbers: true
  },
  head: [
    [
      'script',
      {
        async: '',
        src: 'https://www.googletagmanager.com/gtag/js?id=G-2LX9REEBTP'
      }
    ],
    [
      'script',
      {},
      `window.dataLayer = window.dataLayer || [];
      function gtag(){ dataLayer.push(arguments); }
      gtag('js', new Date());
      gtag('config', 'G-2LX9REEBTP');`
    ],
    [
      'style',
      {},
      `@import url('https://fonts.googleapis.com/css2?family=Noto+Sans+SC:wght@400;700&display=swap');`
    ],
    [
      'style',
      {},
      `@import url('https://fonts.googleapis.com/css2?family=JetBrains+Mono:ital,wght@0,400;0,700;1,400;1,700&display=swap');`
    ],
    [
      'style',
      {},
      `@import url('https://fonts.googleapis.com/css2?family=Noto+Serif+SC:wght@400;700&display=swap');`
    ]
  ],
  themeConfig: {
    logo: '/favicon.png',
    siteTitle: `shortga's blog`,
    outline: [2, 3],
    outlineTitle: '目录',
    lastUpdated: {
      text: '上次更新于',
      formatOptions: {
        dateStyle: 'full',
        timeStyle: 'medium'
      }
    },
    search: {
      provider: 'local'
    },
    nav: [
      { text: 'Home', link: '/' },
      { text: 'Archives', link: '/archives' },
      { text: 'Tags', link: '/tags' }
    ],
    socialLinks: [
      { icon: 'github', link: 'https://github.com/aucub/shortga-blog' }
    ],
    editLink: {
      pattern: 'https://github.com/aucub/shortga-blog/edit/master/docs/:path',
      text: 'Edit this page on GitHub'
    }
  }
})

