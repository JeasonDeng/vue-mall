<template>
  <div class="photoInfo-container">
    <h3>{{photoInfo.title}}</h3>
    <p>
      <span>发表时间: {{photoInfo.add_time | dataFormat}}</span>
      <span>点击次数: {{photoInfo.click}}</span>
    </p>
    <div class="line"></div>
    <div class="thumbs">
      <vue-preview :slides="thumbsList" @close="handleClose"></vue-preview>
    </div>
    <div v-html="photoInfo.content" class="content"></div>
    <Comment />
  </div>
</template>

<script>
import axios from 'axios'
import Comment from '../subComponents/Comment'

export default {
  data() {
    return {
      id: this.$route.params.id,
      photoInfo: {},
      thumbsList: [],
      // contentContainer: {}
    }
  },
  props: ['contentContainer'],
  methods: {
    getPhotoInfo() {
      axios.get('api/getimageInfo/' + this.id)
        .then(res => {
          if (res.data.status === 0) {
            this.photoInfo = res.data.message[0]
          }
        })
    },
    getPreviews() {
      axios.get('api/getthumimages/' + this.id)
        .then(res => {
          if (res.data.status === 0) {
            res.data.message.forEach(item => {
              item.w = 600
              item.h = 400
              item.msrc = item.src
            })
            this.thumbsList = res.data.message
          }
        })
    },
    handleClose() {
      console.log('close event')
      this.contentContainer.style.zIndex = 0
    }
  },
  created() {
    this.getPhotoInfo()
    this.getPreviews()
  },
  components: {
    Comment
  },
  mounted() {
    // this.contentContainer = document.querySelector('.content-container')
    console.log(this.contentContainer)
  },
  updated() {
    console.log('哎呀')
    const imgs = document.querySelectorAll('.thumbs figure img')
    for (var i = 0; i < imgs.length; i++) {
      imgs[i].onclick =  () => {
        this.contentContainer.style.zIndex = 11
      }
    }
  },
}
</script>

<style lang="less">
.photoInfo-container {
  padding: 0 10px;
  h3 {
    font-size: 16px;
    line-height: 40px;
    text-align: center;
  }
  p {
    display: flex;
    justify-content: space-between;
    font-size: 12px;
  }
  .content {
    font-size: 13px;
    text-indent: 2em;
  }
}
.thumbs .my-gallery {
  display: flex;
  flex-wrap: wrap;
}
.thumbs figure {
  width: 30%;
  margin: 0 10px 10px 0;
}
.thumbs figure img {
  width: 100%;
  display: block;
}
.pswp {
  // -webkit-transform: translateZ(1px);
  // -moz-transform: translateZ(1px);
  // -o-transform: translateZ(1px);
  // transform: translateZ(1px);
  // top: 40px!important;
  // z-index: 9999!important;
  // overflow-x: hidden;
  // overflow-y: auto;
  overflow: auto!important;
  // top: 40px !important;
}
</style>