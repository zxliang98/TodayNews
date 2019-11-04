import Vue from 'vue'
import VueRouter from 'vue-router'

import localUser from '@/utils/localuser'

import loginPage from '@/views/login/index.vue'
import homeIndex from '@/views/home'
import welcomeIndex from '@/views/welcome'
import article from '@/views/article'
import images from '@/views/images'
import publish from '@/views/publish'
import comment from '../views/comment'
import setting from '../views/setting'

import error from '@/views/404'

Vue.use(VueRouter)

let router = new VueRouter({
  routes: [
    {
      path: '/login',
      component: loginPage
    },
    {
      path: '/',
      component: homeIndex,
      children: [
        {
          path: '/',
          component: welcomeIndex
        },
        {
          path: '/article',
          component: article
        },
        {
          path: '/images',
          component: images
        },
        {
          path: '/publish',
          component: publish
        },
        {
          path: '/comment',
          component: comment
        },
        {
          path: '/setting',
          component: setting
        }
      ]
    },
    {
      path: '*',
      component: error
    }
  ]
})

// 设置一个路由的全局前置守卫，处理每一个路由
router.beforeEach((to, from, next) => {
  // 如果要去的不是login页面，并且user不存在，就返回登录界面
  let user = localUser.getUser()
  if (to.path !== '/login' && !user) {
    return next({ path: '/login' })
  }
  next()
})

export default router
