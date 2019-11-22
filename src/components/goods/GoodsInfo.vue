<template>
  <div class="goodsinfo-container">
    <div class="lunbotu-container">
      <Lunbotu :lunbotu="lunbotu" :isFull="false" />
    </div>
    <transition @before-enter="beforeEnter" @enter="enter" @after-enter="afterEnter">
      <div class="ball" v-show="flag"></div>
    </transition>
    <div class="sell-container">
      <h3>{{goodsInfo.title}}</h3>
      <div class="line"></div>
      <p class="price">
        <span>
          销售价:
          <strong>¥{{goodsInfo.sell_price}}</strong>
        </span>
        <span class="market-price">
          市场价:
          <del>¥{{goodsInfo.market_price}}</del>
        </span>
      </p>
      <p>
        购买数量:
        <NumberBox @getNumber="getNumber" :max="goodsInfo.stock_quantity" />
      </p>
      <div class="btns">
        <mt-button type="primary" @click="addToCart">加入购物车</mt-button>
        <mt-button type="danger">立即购买</mt-button>
      </div>
    </div>
    <div class="attr-container">
      <h3>商品参数</h3>
      <div class="line"></div>
      <p>商品货号: {{goodsInfo.goods_no}}</p>
      <p>库存情况: {{goodsInfo.stock_quantity}}</p>
      <p>上架时间: {{goodsInfo.add_time | dataFormat}}</p>
    </div>
    <div class="desc-comment-container">
      <div class="tabs" ref="tabs">
        <router-link :to="`/home/goodsinfo/${goodsInfo.id}/detail`" tag="div">商品详情</router-link>
        <router-link :to="`/home/goodsinfo/${goodsInfo.id}/comment`" tag="div">商品评论</router-link>
        <div class="red-line" ref="redLine"></div>
      </div>
      <!-- <transition> -->
        <router-view></router-view>
      <!-- </transition> -->
    </div>
  </div>
</template>

<script>
import axios from 'axios'

import Lunbotu from '../subComponents/Lunbotu'
import NumberBox from '../subComponents/NumberBox'

export default {
  data() {
    return {
      id: this.$route.params.id,
      lunbotu: [],
      number: 1,
      goodsInfo: {},
      flag: false
    }
  },
  methods: {
    getLunbotu() {
      axios.get('api/getthumimages/' + this.id)
        .then(res => {
          if (res.data.status === 0) {
            this.lunbotu = res.data.message.map(item => ({ img: item.src }))
          }
        })
    },
    getGoodsInfo() {
      axios.get('api/goods/getinfo/' + this.id)
        .then(res => {
          if (res.data.status === 0) {
            this.goodsInfo = res.data.message[0]
          }
        })
    },
    getNumber(count) {
      this.number = count
    },
    addToCart() {
      this.flag = !this.flag
      this.$emit('changeSelectedCount', this.number)
    },
    redLinePos(val = this.$route.path) {
      if (val.includes('detail')) {
        this.$refs.redLine.style.left = this.$refs.tabs.clientWidth / 4 - this.$refs.redLine.clientWidth / 2 + 'px'
      }
      if (val.includes('comment')) {
        this.$refs.redLine.style.left = this.$refs.tabs.clientWidth * 3 / 4 - this.$refs.redLine.clientWidth / 2 + 'px'
      }
    },
    beforeEnter(el) {
      el.style.transform = 'translate(0, 0)'
    },
    enter(el, done) {
      const ballPos = el.getBoundingClientRect()
      const badgePos = document.querySelector('.mui-badge').getBoundingClientRect()
      const xDis = badgePos.left - ballPos.left
      const yDis = badgePos.top - ballPos.top
      el.offsetWidth
      el.style.transform = `translate(${xDis}px, ${yDis}px)`
      el.style.transition = 'all .8s'
      done()
    },
    afterEnter(el) {
      this.flag = !this.flag
    }
  },
  components: {
    Lunbotu,
    NumberBox
  },
  created() {
    this.getLunbotu()
    this.getGoodsInfo()
  },
  mounted() {
    this.redLinePos()
  },
  watch: {
    '$route.path': function (val) {
      this.redLinePos(val)
    }
  }
}
</script>

<style lang="less">
.goodsinfo-container {
  min-height: 1334px;
  position: relative;
  background-color: #f5f5f5;
  .lunbotu-container {
    background-color: #fff;
    padding: 10px 0;
  }
  .ball {
    width: 16px;
    height: 16px;
    background-color: red;
    border-radius: 50%;
    position: absolute;
    left: 126px;
    top: 324px;
    z-index: 99;
  }
  h3 {
    margin: 0;
    font-size: 17px;
    font-weight: 500;
    padding: 5px 0;
    line-height: 30px;
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 1;
    -webkit-box-orient: vertical;
  }
  .sell-container {
    background-color: #fff;
    margin: 10px 0;
    padding: 0 10px 10px 10px;
    .price {
      strong {
        color: red;
        font-size: 20px;
        font-weight: normal;
      }
      .market-price {
        padding-left: 10px;
      }
    }
    .btns {
      display: flex;
      justify-content: space-between;
      button {
        width: 48%;
      }
    }
  }
  .attr-container {
    background-color: #fff;
    padding: 0 10px;
  }
  .desc-comment-container {
    padding: 0 10px;
    background-color: #fff;
    margin-top: 10px;
    .tabs {
      position: relative;
      display: flex;
      justify-content: space-between;
      border-bottom: 1px solid #e9e9e9;
      div {
        flex: 1;
        line-height: 44px;
        text-align: center;
      }
      .red-line {
        position: absolute;
        background-color: red;
        width: 35%;
        height: 3px;
        bottom: 0;
        transition: all 0.5s;
      }
    }
  }
}
</style>