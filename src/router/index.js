import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import EditView from '@/views/EditView.vue'
import TestView from '@/views/testView.vue'

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
    },
    {
      path: '/test',
      name: 'testview',
      component: TestView
    }
  ]
})

export default router
