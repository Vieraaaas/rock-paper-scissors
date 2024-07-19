import { createRouter, createWebHistory } from 'vue-router'

import StartView from '@/views/StartView.vue'
import PlayView from '@/views/PlayView.vue'
import StatsView from '@/views/StatsView.vue'
import AboutView from '@/views/AboutView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'Start',
      component: StartView
    },
    {
      path: '/play',
      name: 'Play',
      component: PlayView
    },
    {
      path: '/stats',
      name: 'Stats',
      component: StatsView
    },
    {
      path: '/about',
      name: 'About',
      component: AboutView
    }
  ]
})

export default router
