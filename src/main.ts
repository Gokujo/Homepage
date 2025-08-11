import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import router from './router'
import { i18n } from '@/i18n'
import { createPinia } from 'pinia'

const app = createApp(App)
app.use(createPinia())
app.use(router)
app.use(i18n)
app.mount('#app')

// Регистрация собственного сервис-воркера для кеширования
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/sw.js').catch(() => {})
  })
}


