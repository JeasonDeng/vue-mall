<template>
  <div class="detail-container">
    <h3>{{goodsDetail.title}}</h3>
    <div v-html="goodsDetail.content"></div>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  data() {
    return {
      goodsDetail: {},
      id: this.$route.params.id
    }
  },
  methods: {
    getGoodsDetail() {
      axios.get('api/goods/getdesc/' + this.id)
        .then(res => {
          if (res.data.status === 0) {
            this.goodsDetail = res.data.message[0]
          }
        })
    }
  },
  created() {
    this.getGoodsDetail()
  },
}
</script>

<style lang="less">
.detail-container {
  h3 {
    text-align: center;
  }
  p {
    text-indent: 2em;
  }
  p[align=center] {
    text-indent: 0;
  }
  img {
    width: 100%;
  }
}
</style>