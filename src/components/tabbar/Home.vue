<template>
  <div>
    <Lunbotu :lunbotu="lunbotu" :isFull="true" />
    <ul class="mui-table-view mui-grid-view mui-grid-9">
      <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3">
        <router-link to="/home/newslist">
          <img src="../../images/menu1.png" />
          <div class="mui-media-body">News</div>
        </router-link>
      </li>
      <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3">
        <router-link to="/home/photolist">
          <img src="../../images/menu2.png" />
          <div class="mui-media-body">Photos</div>
        </router-link>
      </li>
      <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3">
        <a href="#">
          <img src="../../images/menu3.png" />
          <div class="mui-media-body">Chat</div>
        </a>
      </li>
      <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3">
        <a href="#">
          <img src="../../images/menu4.png" />
          <div class="mui-media-body">location</div>
        </a>
      </li>
      <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3">
        <a href="#">
          <img src="../../images/menu5.png" />
          <div class="mui-media-body">Search</div>
        </a>
      </li>
      <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3">
        <router-link to="/home/goodslist">
          <img src="../../images/menu6.png" />
          <div class="mui-media-body">Phone</div>
        </router-link>
      </li>
    </ul>
  </div>
</template>

<script>
import axios from 'axios'
import { Toast } from 'mint-ui'

import Lunbotu from '../subComponents/Lunbotu'

export default {
  data() {
    return {
      lunbotu: []
    }
  },
  created() {
    this.getlunbo()
  },
  methods: {
    getlunbo() {
      axios.get('api/getlunbo')
        .then(res => {
          if (res.data.status === 0) {
            this.lunbotu = res.data.message
          } else {
            Toast('获取轮播图数据失败!')
          }
        })
    }
  },
  components: {
    Lunbotu
  }
}
</script>

<style lang="less" scoped>
.mui-grid-view.mui-grid-9 {
  background-color: #fff;
  border: 0;
  .mui-table-view-cell {
    border: 0;
    padding-bottom: 10px;
    &:nth-child(4) {
      padding-top: 0;
    }
    &:nth-child(5) {
      padding-top: 0;
    }
    &:nth-child(6) {
      padding-top: 0;
    }
    img {
      width: 60px;
    }
    & > a:not(.mui-btn) {
      padding: 5px;
    }
    .mui-media-body {
      font-size: 13px;
      margin-top: 2px;
    }
  }
}
</style>