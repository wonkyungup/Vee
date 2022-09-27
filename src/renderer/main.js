import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'
import VueElectron from 'vue-electron'
import Vuetify from 'vuetify'
import 'vuetify/dist/vuetify.min.css'
import '@mdi/font/css/materialdesignicons.css'

Vue.config.productionTip = false
if (!process.env.IS_WEB) Vue.use(VueElectron)

Vue.use(Vuetify)

/* eslint-disable no-new */
new Vue({
  vuetify: new Vuetify({
    icons: { iconfont: 'mdi' },
    theme: {
      dark: window.matchMedia('(prefers-color-scheme: dark)').matches,
      options: { cspNonce: 'dQw4w9WgXcQ' }
    }
  }),
  components: { App },
  router,
  store,
  template: '<App/>'
}).$mount('#app')