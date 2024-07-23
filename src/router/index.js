import { createRouter, createWebHistory } from 'vue-router'

import StartView from '@/views/StartView.vue'
import PlayView from '@/views/PlayView.vue'
import StatsView from '@/views/StatsView.vue'
import ContactView from '@/views/ContactView.vue'
import LegalView from '@/views/LegalView.vue'

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
      path: '/contact',
      name: 'Contact',
      component: ContactView
    },
    {
      path: '/legal',
      name: 'Legal',
      component: LegalView
    }
  ]
})

export default router
