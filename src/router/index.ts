import Vue from 'vue'
import VueRouter, { RouteConfig } from 'vue-router'
import FlipClockView from '@/views/FlipClockView.vue'
import PreClockView from '@/views/PreClockView.vue'
import PadClockView from '@/views/PadClockView.vue'
import TimeView from '@/views/TimeView.vue'

Vue.use(VueRouter)

const routes: Array<RouteConfig> = [
  {
    path: '/',
    name: 'clock',
    component: FlipClockView,
    meta: {
      title: 'Kindle插画时钟'
    }
  },
  {
    path: '/i',
    name: 'padclock',
    component: PadClockView,
    meta: {
      title: 'iPad插画时钟'
    }
  },
  {
    path: '/p',
    name: 'preclock',
    component: PreClockView,
    meta: {
      title: '插画预览'
    }
  },
  {
    path: '/t',
    name: 'Time',
    component: TimeView,
    meta: {
      title: '时间'
    }
  }
]

const router = new VueRouter({
  mode: 'hash',
  base: process.env.BASE_URL,
  routes
})

export default router
