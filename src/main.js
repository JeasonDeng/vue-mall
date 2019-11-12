import Vue from 'vue'

import './lib/css/mui.min.css'
import './lib/css/icons-extra.css'

import { Header, Swipe, SwipeItem } from 'mint-ui'

Vue.component(Header.name, Header)
Vue.component(Swipe.name, Swipe)
Vue.component(SwipeItem.name, SwipeItem)

import App from './App'
import router from './router'

new Vue({
  el:'#app',
  render: h => h(App),
  router
})