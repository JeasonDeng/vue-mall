<template>
  <div>
    <ul class="mui-table-view">
      <li class="mui-table-view-cell mui-media" v-for="(item, i) in newsList" :key="i">
        <router-link :to="`/home/newsinfo/${item.id}`">
          <img class="mui-media-object mui-pull-left" :src="item.img_url" />
          <div class="mui-media-body">
            <h3>{{item.title}}</h3>
            <p class="mui-ellipsis">
              <span>发布时间: {{item.add_time | dataFormat}}</span>
              <span>点击: {{item.click}}</span>
            </p>
          </div>
        </router-link>
      </li>
    </ul>
  </div>
</template>

<script>
import axios from 'axios'
import { Toast } from 'mint-ui'

export default {
  data() {
    return {
      newsList: []
    }
  },
  methods: {
    getNewsList() {
      axios.get('api/getnewslist')
        .then(res => {
          if (res.data.status === 0) {
            console.log(res.data)
            this.newsList = res.data.message
          } else {
            Toast('获取数据失败!')
          }
        })
    }
  },
  created() {
    this.getNewsList()
  }
}
</script>

<style lang="less" scoped>
.mui-table-view {
  li {
    h3 {
      font-size: 14px;
      color: #333;
    }
    p {
      font-size: 12px;
      display: flex;
      justify-content: space-between;
    }
  }
}
</style>