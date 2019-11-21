import Vue from 'vue'
import VueRouter from 'vue-router'

import Home from './components/tabbar/Home'
import Member from './components/tabbar/Member'
import Cart from './components/tabbar/Cart'
import Search from './components/tabbar/Search'
import NewsList from './components/news/NewsList'
import NewsInfo from './components/news/NewsInfo'
import PhotoList from './components/photos/PhotoList'
import PhotoInfo from './components/photos/PhotoInfo'
import GoodsList from './components/goods/GoodsList'
import GoodsInfo from './components/goods/GoodsInfo'
import GoodsDetail from './components/goods/GoodsDetail'
import Comment from './components/subComponents/Comment'

Vue.use(VueRouter)

export default new VueRouter({
  routes: [
    { path: '/', redirect: '/home' },
    { path: '/home', component: Home },
    { path: '/member', component: Member },
    { path: '/cart', component: Cart },
    { path: '/search', component: Search },
    { path: '/home/newslist', component: NewsList },
    { path: '/home/newsinfo/:id', component: NewsInfo },
    { path: '/home/photolist', component: PhotoList },
    { path: '/home/photoinfo/:id', component: PhotoInfo },
    { path: '/home/goodslist', component: GoodsList },
    {
      path: '/home/goodsinfo/:id', component: GoodsInfo, children: [
        { path: 'detail', component: GoodsDetail },
        { path: 'comment', component: Comment },
        { path: '', redirect: 'detail' },
      ],
    },

  ],
  linkActiveClass: 'mui-active' // 覆盖默认路由高亮的类
})

