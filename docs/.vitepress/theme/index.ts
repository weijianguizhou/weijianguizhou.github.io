import DefaultTheme from 'vitepress/theme'
import Layout from './Layout.vue'
import Figure from './components/Figure.vue'
import 'katex/dist/katex.min.css'
import './custom.css'

export default {
  extends: DefaultTheme,
  Layout,
  enhanceApp({ app }: { app: any }) {
    // 全局图片组件：<Figure src="/mechanics/xxx.webp" caption="图 3.1　……" />
    app.component('Figure', Figure)
  }
}
