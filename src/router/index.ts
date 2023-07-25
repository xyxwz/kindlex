import Vue from 'vue'
import VueRouter, { RouteConfig } from 'vue-router'
import FlipClockView from '@/views/FlipClockView.vue'
import PreClockView from '@/views/PreClockView.vue'
import Pre7ClockView from '@/views/Pre7ClockView.vue'
import PadClockView from '@/views/PadClockView.vue'

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
    name: 'pre7clock',
    component: Pre7ClockView,
    meta: {
      title: '插画预览'
    }
  },
  {
    path: '/preview',
    name: 'preclock',
    component: PreClockView,
    meta: {
      title: '插画预览'
    }
  }
]

const router = new VueRouter({
  mode: 'hash',
  base: process.env.BASE_URL,
  routes
})

export default router
