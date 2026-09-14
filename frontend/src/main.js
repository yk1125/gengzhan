import { createApp } from 'vue'
import { createPinia } from 'pinia'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
import 'animate.css'
import './style.css'

import App from './App.vue'
import router from './router'
import { useThemeStore } from './stores/theme'

const app = createApp(App)
const pinia = createPinia()

// 注册所有图标
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component)
}

app.use(pinia)
app.use(router)
app.use(ElementPlus)

// 主题：按当地时间 19:00—07:00 转暗；页头两态按钮可手动切换（选择到下一个边界到期）。
// 在 mount 之前 init，避免首屏先闪一下错的颜色。
const themeStore = useThemeStore(pinia)
themeStore.init()
themeStore.armBoundaryRefresh()

app.mount('#app')
