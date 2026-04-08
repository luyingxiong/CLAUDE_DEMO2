import { createRouter, createWebHashHistory } from 'vue-router'
import NeiKongMatrix from '@/views/NeiKongMatrix/index.vue'
import ControlFlow from '@/views/ControlFlow/index.vue'
import DailyQuiz from '@/views/DailyQuiz/index.vue'
import AiAssistant from '@/views/AiAssistant/index.vue'

const routes = [
  { path: '/', redirect: '/matrix' },
  { path: '/matrix', component: NeiKongMatrix, meta: { title: '内控矩阵' } },
  { path: '/flow', component: ControlFlow, meta: { title: '控制流程' } },
  { path: '/quiz', component: DailyQuiz, meta: { title: '每日一题' } },
  { path: '/ai', component: AiAssistant, meta: { title: '问答助手' } },
]

export default createRouter({
  history: createWebHashHistory(),
  routes,
})
