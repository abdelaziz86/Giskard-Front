import { createRouter, createWebHistory } from 'vue-router'
import AdminView from '../views/AdminView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: AdminView
    },
    {
      path: '/client',
      name: 'client',
      component: () => import('../views/ClientView.vue')
    }
  ]
})

export default router
