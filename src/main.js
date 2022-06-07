import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import vuetify from './plugins/vuetify'
import Toast, { POSITION } from 'vue-toastification'
import 'vue-toastification/dist/index.css'

Vue.config.productionTip = false

Vue.use(Toast, {
  position: POSITION.TOP_CENTER,
  timeout: 1000
})

new Vue({
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount('#app')
