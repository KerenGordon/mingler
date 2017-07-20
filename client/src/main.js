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


Vue.directive('draggable', {
  bind: function (el) {
    el.style.position = 'absolute';
    var startX, startY, initialMouseX, initialMouseY;

    function mousemove(e) {
      var dx = e.clientX - initialMouseX;
      var dy = e.clientY - initialMouseY;
      el.style.top = startY + dy + 'px';
      el.style.left = startX + dx + 'px';
      return false;
    }

    function mouseup() {
      document.removeEventListener('mousemove', mousemove);
      document.removeEventListener('mouseup', mouseup);
    }

    el.addEventListener('mousedown', function (e) {
      e.preventDefault();
      
      startX = el.offsetLeft;
      startY = el.offsetTop;
      initialMouseX = e.clientX;
      initialMouseY = e.clientY;
      document.addEventListener('mousemove', mousemove);
      document.addEventListener('mouseup', mouseup);
      return false;
    });
  }
})

//================================================
// definition of a directive to allow change position of element by dragging it
Vue.directive('draggable-touch', {
  bind: function (el) {
    el.style.position = 'absolute';
    var startX, startY, initialMouseX, initialMouseY;
    console.log('Started')
    function mousemove(e) {
      var dx = e.clientX - initialMouseX;
      var dy = e.clientY - initialMouseY;
      var dx = e.changedTouches[0].clientX - initialMouseX;
      var dy = e.changedTouches[0].clientY - initialMouseY;
      el.style.top = startY + dy + 'px';
      el.style.left = startX + dx + 'px';
      return false;
    }
    function mouseup() {
      document.removeEventListener('touchmove', mousemove);
      document.removeEventListener('touchend', mouseup);
      
    }

    el.addEventListener('touchstart', function (e) {
      e.stopPropagation();
      startX = el.offsetLeft;
      startY = el.offsetTop;
      initialMouseX = e.changedTouches[0].clientX;
      initialMouseY = e.changedTouches[0].clientY;
      document.addEventListener('touchmove', mousemove);
      document.addEventListener('touchend', mouseup);
      console.log('ended',el)
      return false;
    });
  }
})

//==========================================================

