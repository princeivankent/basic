import Vue from 'vue'
import App from './App.vue'
import router from './router.js'
import {store} from './store/index'
import ApiService from './services/api.service'
import { TokenService } from './services/storage.service'

ApiService.init(process.env.APP_URL)

// If token exists set header
if (TokenService.getToken()) {
  ApiService.setHeader()
}

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')