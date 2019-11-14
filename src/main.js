import Vue from 'vue'
import axios from 'axios'
import moment from 'moment'

import './lib/css/mui.min.css'
import './lib/css/icons-extra.css'
import './css/base.css'

import { Header, Swipe, SwipeItem } from 'mint-ui'

Vue.component(Header.name, Header)
Vue.component(Swipe.name, Swipe)
Vue.component(SwipeItem.name, SwipeItem)

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