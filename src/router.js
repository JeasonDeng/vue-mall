import Vue from 'vue'
import VueRouter from 'vue-router'

import Home from './views/Home'
import Member from './views/Member'
import Cart from './views/Cart'
import Search from './views/Search'

Vue.use(VueRouter)

export default new VueRouter({
  routes: [
    { path: '/', redirect: '/home'},
    { path: '/home', component: Home },
    { path: '/member', component: Member },
    { path: '/cart', component: Cart },
    { path: '/search', component: Search }
  ],
  linkActiveClass: 'mui-active' // 覆盖默认路由高亮的类
})

