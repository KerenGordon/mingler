import Vue from 'vue'

//import { Carousel3d, Slide } from 'vue-carousel-3d';
//import ElementUI from 'element-ui'
import Router from 'vue-router'
import Home from '@/pages/Home'
import Splash from '@/pages/Splash'
import Login from '@/pages/Login'
import Edit from '@/pages/Edit'
import Browse from '@/pages/Browse'
import Matches from '@/pages/Matches'
import Chat from '@/pages/Chat'
import IlansComp from '@/pages/IlansComp'

Vue.use(Router)
//Vue.use(Carousel3d)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Splash',
      component: Splash
    },{
      path: '/login',
      name: 'Login',
      component: Login
    },{
      path: '/edit',
      name: 'Edit',
      component: Edit
    },{
      path: '/browse',
      name: 'Browse',
      component: Browse
    },{
      path: '/matches',
      name: 'Matches',
      component: Matches
    },{
      path: '/chat',
      name: 'Chat',
      component: Chat
    },{
      path: '/ilans',
      name: 'Ilans',
      component: IlansComp
    }
  ]
})
