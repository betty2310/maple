import { createRouter, createWebHistory } from 'vue-router'
import { supabase } from '@/lib/supabaseClient'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import('@/views/ProjectsView.vue'),
      beforeEnter: async (to, from, next) => {
        const { data } = await supabase.auth.getSession()
        const currentUser = data?.session?.user
        if (!currentUser) next('playground')
        else next()
      }
    },
    {
      path: '/playground',
      name: 'playground',
      component: () => import('@/views/Playground.vue')
    },
    {
      path: '/signin',
      name: 'signin',
      component: () => import('@/views/SigninView.vue'),
      beforeEnter: async (to, from, next) => {
        const { data } = await supabase.auth.getSession()
        const currentUser = data?.session?.user
        if (currentUser) next('/')
        else next()
      }
    },
    {
      path: '/project/:name/:id',
      name: 'project',
      component: () => import('@/views/ProjectView.vue')
    },
    { path: '/:pathMatch(.*)*', component: () => import('@/views/PagenotfoundView.vue') }
  ]
})

export default router
