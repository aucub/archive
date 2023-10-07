import Layout from './components/Layout.vue'
import Archives from "./components/Archives.vue";
import Tags from "./components/Tags.vue";
import './tailwind.postcss'
import DefaultTheme from 'vitepress/theme-without-fonts'

export default {
  ...DefaultTheme,
  Layout: Layout,
  enhanceApp({ app }) {
    app.component('Archives', Archives)
    app.component('Tags', Tags)
  }
}
