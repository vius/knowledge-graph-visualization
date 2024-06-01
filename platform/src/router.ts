import { createRouter, createWebHashHistory } from 'vue-router'
import Dashboard from '@/pages/auction/index.vue'

const routes = [
  { path: '/dashboard', component: Dashboard },
  { path: '/:catchAll(.*)', redirect: '/dashboard' }
  // { path: '/', redirect: '/product-detail' },
  // { path: '/:catchAll(.*)', redirect: '/agents' },
]
export const router = createRouter({
  // 4. 内部提供了 history 模式的实现。为了简单起见，我们在这里使用 hash 模式。
  history: createWebHashHistory(),
  routes, // `routes: routes` 的缩写
})

