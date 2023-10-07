import { getThemeConfig, defineConfig } from '@sugarat/theme/node'

const blogTheme = getThemeConfig({
  // 开启离线的全文搜索支持（如构建报错可注释下面的配置再次尝试）
  search: 'pagefind'
})

export default defineConfig({
  base: '/rithbralmonk-blog/',
  extends: blogTheme,
  lang: 'zh-cn',
  title: 'blog',
  vite: {
    optimizeDeps: {
      include: ['element-plus'],
      exclude: ['@sugarat/theme']
    }
  },
  lastUpdated: true,
  themeConfig: {
    lastUpdatedText: '上次更新于',
    footer: {
      message: '',
      copyright:
        ''
    }
  }
})
