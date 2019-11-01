import breadCrumb from './breadcrumb.vue'
import getChannels from './channels.vue'

export default {
  install (Vue) {
    Vue.component(breadCrumb.name, breadCrumb)
    Vue.component(getChannels.name, getChannels)
  }
}
