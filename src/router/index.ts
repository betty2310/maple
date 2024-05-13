import { createRouter, createWebHistory } from 'vue-router'
import { supabase } from '@/lib/supabaseClient'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import('@/views/HomeView.vue')
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
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('@/views/AboutView.vue')
    },
    {
      path: '/projects',
      name: 'projects',
      component: () => import('@/views/ProjectsView.vue'),
      beforeEnter: async (to, from, next) => {
        const { data } = await supabase.auth.getSession()
        const currentUser = data?.session?.user
        if (!currentUser) next('signin')
        else next()
      }
    }
  ]
})


export default router
