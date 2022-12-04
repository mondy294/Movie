import Vue from 'vue'
import App from './App.vue'

import * as API from './api'

import 'swiper/css/swiper.css'

import 'element-ui/lib/theme-chalk/index.css';
import { Button, Dialog } from 'element-ui'
Vue.use(Button)
Vue.use(Dialog)


//引入路由
import router from './router/index'

Vue.config.productionTip = false

new Vue({
  render: h => h(App),
  router,
  beforeCreate() {
    Vue.prototype.$bus = this
    Vue.prototype.$API = API
  }
}).$mount('#app')
