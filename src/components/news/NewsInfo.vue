<template>
  <div class="news-info">
    <h4>{{news.title}}</h4>
    <p>
      <span>发表时间: {{news.add_time | dataFormat}}</span>
      <span>点击: {{news.click}}</span>
    </p>
    <div class="line"></div>
    <div class="content" v-html="news.content"></div>
  </div>
</template>

<script>
import axios from 'axios'
import Toast from 'mint-ui'

export default {
  data() {
    return {
      id: this.$route.params.id,
      news: {}
    }
  },
  methods: {
    getNewInfo() {
      axios.get('api/getnew/' + this.id)
        .then(res => {
          console.log(res.data)
          if(res.data.status === 0) {
            this.news = res.data.message[0]
          } else {
            Toast('数据获取失败!')
          }
        })
    }
  },
  created() {
    this.getNewInfo()
  },
}
</script>

<style lang="less">
  .news-info {
    padding: 0 12px;
    h4 {
      font-weight: normal;
      text-align: center;
      line-height: 28px;
      margin: 14px 0;
    }
    p {
      display: flex;
      justify-content: space-between;
    }
    .line {
      height: 1px;
      margin-bottom: 10px;
      background-color: #eee;
    }
    .content {
      img {
        width: 100%;
      }
    }
  }
</style>