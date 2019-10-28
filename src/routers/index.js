import Vue from 'vue'
import VueRouter from 'vue-router'

import loginPage from '@/views/login/index.vue'
import homeIndex from '@/views/home'
import welcomeIndex from '@/views/welcome'

import error from '@/views/404'

Vue.use(VueRouter)

export default new VueRouter({
  routes: [
    {
      path: '/login',
      component: loginPage
    }, {
      path: '/',
      component: homeIndex,
      children: [{
        path: '/',
        component: welcomeIndex
      }]
    },
    {
      path: '*',
      component: error
    }
  ]
})
