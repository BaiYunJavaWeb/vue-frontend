import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import('../views/HomeView.vue'),
      meta: {
        title: 'Shopping'
      }
    },
    {
      path: '/manage',
      name: 'manage',
      component: () => import('../views/AdminView.vue'),
      meta: {
        title: 'Shopping后台管理'
      }
    },
    {
      path: '/adminlogin',
      name: 'adminlogin',
      component: () => import('../views/AdminLogin.vue'),
      meta: {
        title: '管理员登录'
      }
    }
  ]
})

router.beforeEach((to, from, next) => {
  if (to.meta.title) {
    document.title = to.meta.title as string
  }
  next()
})

export default router
