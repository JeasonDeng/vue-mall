<template>
  <div class="goods-container">
    <div class="goods-item" v-for="(item, i) in goodsList" :key="i" @click="goGoodsDetail(item.id)">
      <img :src="item.img_url"/>
      <h3>{{item.title}}</h3>
      <p class="price">
        <span class="now-price">¥{{item.sell_price}}</span>
        <span class="old-price">¥{{item.market_price}}</span>
      </p>
      <p class="info">
        <span>热卖中</span>
        <span class="sold">剩 {{item.stock_quantity}} 件</span>
      </p>
    </div>
    <mt-button type="danger" size="large" @click="loadMore">加载更多</mt-button>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  data() {
    return {
      goodsList: [],
      pageIndex: 1
    }
  },
  methods: {
    getGoodsList() {
      axios.get('api/getgoods?pageindex=' + this.pageIndex)
        .then(res => {
          if(res.data.status === 0) {
            this.goodsList = this.goodsList.concat(res.data.message)
          }
        })
    },
    loadMore() {
      this.pageIndex++
      this.getGoodsList()
    },
    goGoodsDetail(id) {
      this.$router.push('/home/goodsinfo/' + id)
    }
  },
  created() {
    this.getGoodsList()
  },
}
</script>

<style lang="less">
.goods-container {
  padding: 10px;
  background-color: #f5f5f5;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  .goods-item {
    width: 48.6%;
    min-height: 270px;
    background-color: #fff;
    margin-bottom: 2.8%;
    padding: 5px;
    color: #333;
    position: relative;
    img {
      width: 100%;
    }
    h3 {
      font-size: 15px;
      line-height: 20px;
      overflow: hidden;
      text-overflow: ellipsis;
      display: -webkit-box;
      -webkit-line-clamp: 2;
      -webkit-box-orient: vertical;
    }
    .price {
      margin-bottom: 20px;
      .now-price {
        color: red;
        font-size: 15px;
      }
      .old-price {
        font-size: 12px;
        text-decoration: line-through;
        padding-left: 6px;
      }
    }
    .info {
      margin: 0;
      position: absolute;
      left: 0;
      bottom: 0;
      width: 100%;
      padding: 0 5px 5px 5px;
      .sold {
        float: right;
      }
    }
  }
}
</style>