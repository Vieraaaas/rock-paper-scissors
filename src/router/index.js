import { createRouter, createWebHistory } from 'vue-router'

import StartView from '@/views/StartView.vue'
import PlayView from '@/views/PlayView.vue'

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
    }
  ]
})

export default router
