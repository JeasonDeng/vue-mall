<template>
  <div class="cart-container">
    <ul class="cart-items">
      <li class="mui-table-view-cell" v-for="(item , i) in cartList" :key="i">
        <div class="mui-slider-right mui-disabled">
          <a class="mui-btn mui-btn-red">删除</a>
        </div>
        <div class="mui-slider-handle">
          <mt-switch v-model="item.selected"></mt-switch>
          <img :src="item.thumb_path" alt />
          <div class="goods-info">
            <h4>{{item.title}}</h4>
            <p>
              <span class="price">¥{{item.price}}</span>
              <span>
                <NumberBox />
              </span>
            </p>
          </div>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
import axios from 'axios'
import NumberBox from '../subComponents/NumberBox'

export default {
  data() {
    return {
      cartList: []
    }
  },
  components: {
    NumberBox
  },
  created() {
    const ids = []
    this.$store.state.cart.forEach(item => ids.push(item.id))
    axios.get('api/goods/getshopcarlist/' + ids.join(','))
      .then(res => {
        if (res.data.status === 0) {
          this.$store.state.cart.forEach(item => {
            res.data.message.forEach(item1 => {
              if (item1.id == item.id) {
                item.title = item1.title
                item.thumb_path = item1.thumb_path
              }
            })
          })
          // console.log(this.$store.state.cart)
          this.cartList = this.$store.state.cart
        }
      })
  },

}
</script>

<style lang="less">
.cart-container {
  background-color: #f5f5f5;
  padding: 10px;
  .cart-items {
    padding: 0;
    margin: 0;
    li {
      background-color: #fff;
      padding: 10px;
      .mui-slider-handle {
        display: flex;
        img {
          width: 64px;
          margin: 0 6px;
        }
        .goods-info {
          width: 100%;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          h4 {
            font-size: 14px;
            margin: 0;
          }
          .price {
            font-size: 15px;
            color: red;
            line-height: 30px;
          }
          .mui-numbox {
            height: 30px;
            float: right;
          }
        }
      }
    }
  }
}
</style>