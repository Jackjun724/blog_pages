// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import './permission'
import './assets/iconfont.css'
import api from './api'
import store from './store/loader'
// import './mock'
import './utils/axios/init.js'

Vue.config.devtools = process.env.NODE_ENV === 'development'
Vue.config.productionTip = false

Vue.use(api)
Vue.use(store)

new Vue({
  el: '#app',
  router,
  components: {App},
  template: '<App/>'
})
