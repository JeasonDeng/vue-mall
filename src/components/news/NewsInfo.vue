<template>
  <div class="news-info">
    <h4>{{news.title}}</h4>
    <p>
      <span>发表时间: {{news.add_time | dataFormat}}</span>
      <span>点击: {{news.click}}</span>
    </p>
    <div class="line"></div>
    <div class="content" v-html="news.content"></div>
    <comment />
  </div>
</template>

<script>
import axios from 'axios'
import { Toast } from 'mint-ui'

import Comment from '../subComponents/Comment'

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
          if (res.data.status === 0) {
            this.news = res.data.message[0]
          } else {
            Toast('数据获取失败!')
          }
        })
    }
  },
  components: {
    comment: Comment
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
  & > p {
    display: flex;
    justify-content: space-between;
  }
  .line {
    height: 1px;
    margin-bottom: 10px;
    background-color: #e0e0e0;
  }
  .content {
    img {
      width: 100%;
    }
  }
}
</style>