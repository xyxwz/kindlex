import Vue from 'vue'
import VueRouter, { RouteConfig } from 'vue-router'
import FlipClockView from '@/views/FlipClockView.vue'
import PreClockView from '@/views/PreClockView.vue'
import FlipClockTView from '@/views/FlipClockTView.vue'

Vue.use(VueRouter)

const routes: Array<RouteConfig> = [
  {
    path: '/',
    name: 'clock',
    component: FlipClockView,
    meta: {
      title: 'Kindle时钟'
    }
  },
  {
    path: '/preview',
    name: 'preclock',
    component: PreClockView,
    meta: {
      title: '插画预览'
    }
  },
  {
    path: '/i',
    name: 'clockT',
    component: FlipClockTView,
    meta: {
      title: 'iPad时钟'
    }
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

// // 页面标题设置
// router.beforeEach((to, _from, _next) => {
//   /* 路由发生变化修改页面title */
//   if (to.meta.title) {
//     document.title = to.meta.title
//   }
// })

export default router
