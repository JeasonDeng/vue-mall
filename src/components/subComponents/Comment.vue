<template>
  <div class="comment-container">
    <h5>发表评论</h5>
    <textarea placeholder="请发表您的评论(最多200字)" maxlength="200" v-model="comment"></textarea>
    <mt-button type="primary" size="large" @click="postComment">发表评论</mt-button>
    <div class="comment-list">
      <div v-for="(item, i) in comments" :key="i">
        <div class="comment-title">
          <span>第 {{i + 1}} 楼 &nbsp;用户: {{item.user_name}}</span>
          <span>{{item.add_time | dataFormat}}</span>
        </div>
        <div class="comment-content">{{item.content === '' ? '默认好评' : item.content}}</div>
      </div>
    </div>
    <mt-button type="danger" size="large" plain @click="getMoreComment">加载更多</mt-button>
  </div>
</template>

<script>
import axios from 'axios'
import { Toast } from 'mint-ui'

export default {
  data() {
    return {
      comments: [],
      pageindex: 1,
      id: this.$route.params.id,
      comment: ''
    }
  },
  methods: {
    getComments() {
      axios.get('api/getcomments/' + this.id + '?pageindex=' + this.pageindex)
        .then(res => {
          if (res.data.status === 0) {
            if (res.data.message.length === 0) {
              return Toast('没有更多数据!')
            }
            this.comments = this.comments.concat(res.data.message)
          } else {
            Toast('获取数据失败!')
          }
        })
    },
    getMoreComment() {
      this.pageindex++
      this.getComments()
    },
    postComment() {
      const comment = this.comment.trim()
      if (!comment) {
        return Toast('评论内容不能为空')
      }
      axios.post('api/postcomment/' + this.id, { content: comment })
        .then(res => {
          if (res.data.status === 0) {
            // window.scrollTo(0, 0)
            this.comment = ''
            this.comments.unshift({ user_name: '匿名用户', add_time: new Date(), content: comment })
          } else {
            Toast('评论失败!')
          }
        })
    }
  },
  created() {
    this.getComments()
  },
}
</script>

<style lang="less">
.comment-container {
  margin-top: 20px;
  padding-bottom: 10px;
  h5 {
    font-size: 16px;
    color: #333;
    font-weight: 500;
  }
  textarea {
    height: 60px;
    margin: 4px 0;
    padding: 6px;
    font-size: 12px;
  }
  .comment-list {
    margin: 10px 0;
    .comment-title {
      padding: 0 5px;
      background-color: #f0f0f0;
      color: #333;
      line-height: 30px;
      font-size: 13px;
      display: flex;
      justify-content: space-between;
    }
    .comment-content {
      padding: 0 10px;
      line-height: 22px;
      font-size: 12px;
      word-break: break-all;
    }
  }
}
</style>