import Vue from 'vue'
import axios from 'axios'
import moment from 'moment'

import LyTab from 'ly-tab'

Vue.use(LyTab)

import './lib/css/mui.min.css'
import './lib/css/icons-extra.css'
import './css/base.css'

// import { Header, Swipe, SwipeItem, Button, Lazyload } from 'mint-ui'
import MintUI from 'mint-ui'
import 'mint-ui/lib/style.css'

Vue.use(MintUI)

// Vue.component(Header.name, Header)
// Vue.component(Swipe.name, Swipe)
// Vue.component(SwipeItem.name, SwipeItem)
// Vue.component(Button.name, Button)
// Vue.use(Lazyload)

import VuePreview from 'vue-preview'
Vue.use(VuePreview, {
  mainClass: 'pswp--minimal--dark',
  barsSize: {top: 0, bottom: 0},
  captionEl: false,
  fullscreenEl: true,
  shareEl: true,
  bgOpacity: 0.9,
  tapToClose: true,
  tapToToggleControls: false
})

axios.defaults.baseURL = 'http://www.liulongbin.top:3005'

import App from './App'
import router from './router'

// 定义全局过滤器
Vue.filter('dataFormat', function(data, pattern="YYYY-MM-DD HH:mm:ss") {
  return moment(data).format(pattern)
})

new Vue({
  el:'#app',
  render: h => h(App),
  router
})