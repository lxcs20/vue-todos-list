import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import EditView from '@/views/EditView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'todoList',
      component: HomeView
    },
    {
      path: '/todo/:id/edit',
      name: 'todoEdit',
      component: EditView
    }
  ]
})

export default router
