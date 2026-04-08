import { createApp } from 'vue'
import Vant from 'vant'
import 'vant/lib/index.css'
import router from './router'
import App from './App.vue'
import './assets/styles/global.css'

createApp(App).use(Vant).use(router).mount('#app')
