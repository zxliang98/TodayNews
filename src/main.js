import Vue from 'vue'
import App from './App.vue'

import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'

import './style/upload.css'

import router from '@/routers'

import plugin from './components'

import axios from '@/api'

Vue.prototype.$http = axios

Vue.config.productionTip = false

Vue.use(ElementUI)
Vue.use(plugin)

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
