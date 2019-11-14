import Vue from 'vue'
import VueRouter from 'vue-router'

import Home from './components/tabbar/Home'
import Member from './components/tabbar/Member'
import Cart from './components/tabbar/Cart'
import Search from './components/tabbar/Search'
import NewsList from './components/news/NewsList'
import NewsInfo from './components/news/NewsInfo'

Vue.use(VueRouter)

export default new VueRouter({
  routes: [
    { path: '/', redirect: '/home'},
    { path: '/home', component: Home },
    { path: '/member', component: Member },
    { path: '/cart', component: Cart },
    { path: '/search', component: Search },
    { path: '/home/newslist', component: NewsList },
    { path: '/home/newsinfo/:id', component: NewsInfo }
  ],
  linkActiveClass: 'mui-active' // 覆盖默认路由高亮的类
})

