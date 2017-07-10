// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
// import Vue from 'vue'
// import App from './App'
// import router from './router'
import store from './store'


import Vue from 'vue'
import moment from 'moment'
import App from './App'
import router from './router'
import locale from 'element-ui/lib/locale/lang/en'
import axios from 'axios';
import VueMaterial from 'vue-material';
import Element from 'element-ui'
import VueAwesomeSwiper from 'vue-awesome-swiper'
import 'element-ui/lib/theme-default/index.css'
import 'vue-material/dist/vue-material.css'

Vue.use(VueMaterial);
Vue.use(VueAwesomeSwiper);
Vue.use(Element);
Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: { App }
})
