////////////////////////////////////////////////
// Schema Dictionary                          //
// Version 1.0.5                              //
// Release Date: 2020-04-20                   //
// Modified Date: 2020-04-20                  //
// Developed by Sergey Vikanov, MatrixBi ltd  //
// For Israel Ministry of Health.             //
// All rigths reserved © 2020.                //
//////////////////////////////////////////////// 
import 'babel-polyfill'
import Vue from 'vue'
import './plugins/vuetify'
import App from './App.vue'
import router from './router'
import VueResource from 'vue-resource'
import excel from 'vue-excel-export'
import VueCookie from 'vue-cookie'
import 'material-design-icons-iconfont/dist/material-design-icons.css'
import Vuetify from 'vuetify'


Vue.config.productionTip = false
Vue.use(VueResource)
Vue.use(excel)
Vue.use(VueCookie)
Vue.use(Vuetify, {
iconfont: 'mdi' | 'md' })



new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
