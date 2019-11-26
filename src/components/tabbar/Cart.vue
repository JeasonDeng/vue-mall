<template>
  <div class="cart-container">
    <ul class="cart-items">
      <li class="mui-table-view-cell" v-for="(item, i) in cartList" :key="i">
        <div class="mui-slider-right mui-disabled">
          <a class="mui-btn mui-btn-red" @click="deleteItem(item.id, i)">删除</a>
        </div>
        <div class="mui-slider-handle">
          <mt-switch v-model="item.selected" @change="changeSelected(item.id, item.selected)"></mt-switch>
          <img :src="item.thumb_path" @click="$router.push('/home/goodsinfo/' + item.id)" />
          <div class="goods-info">
            <h4 @click="$router.push('/home/goodsinfo/' + item.id)">{{item.title}}</h4>
            <p>
              <span
                class="price"
                @click="$router.push('/home/goodsinfo/' + item.id)"
              >¥{{item.price}}</span>
              <span>
                <NumberBox :id="item.id" :max="item.stock" :index="i" />
              </span>
            </p>
          </div>
        </div>
      </li>
    </ul>
    <div class="check">
      <mt-switch v-model="selectedAll" @change="changeAllSelected(selectedAll)">全选</mt-switch>
      <div class="total-amount">
        <span>
          总计:
          <strong>¥{{$store.getters.totalAmount}}</strong>
        </span>
        <mt-button type="danger">结算</mt-button>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import { Toast } from 'mint-ui'
import NumberBox from '../subComponents/NumberBox'
import mui from '../../lib/js/mui.min'

export default {
  data() {
    return {
      cartList: [],
      selectedAll: this.$store.getters.selectedAll
    }
  },
  components: {
    NumberBox
  },
  created() {
    console.log('我中走来吗')
    this.getCarList()
  },
  methods: {
    getCarList() {
      console.log('再次请求')
      if (this.$store.state.cart.length === 0) {
        return Toast('购物车为空')
      }
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
          }
          // console.log(this.$store.state.cart)
          this.cartList = this.$store.state.cart
        })
    },
    changeSelected(id, selected) {
      this.$store.dispatch('changeSelected', { id, selected })
    },
    changeAllSelected(selectedAll) {
      this.$store.dispatch('changeAllSelected', selectedAll)
    },
    deleteItem(id, index) {
      console.log(id)
      this.$store.dispatch('deleteItem', id)
      this.getCarList()
      const btns = document.querySelectorAll('.mui-btn-red')
      const handles = document.querySelectorAll('.mui-slider-handle')
      for (var i = 0; i < btns.length; i++) {
        btns[i].style.transform = 'translate(0px, 0px)'
        btns[i].style.transition = 'all .1s'
        handles[i].style.transform = 'translate(0px, 0px)'
        handles[i].style.transition = 'all .1s'
      }
    }
  },
  watch: {
    '$store.getters.selectedAll': function (val) {
      this.selectedAll = val
    }
  },
  mounted() {
  },
}
</script>

<style lang="less">
.cart-container {
  min-height: 100%;
  background-color: #f5f5f5;
  padding: 10px;
  .cart-items {
    padding: 0;
    margin: 0;
    li {
      background-color: #fff;
      padding: 6px;
      .mui-slider-handle {
        display: flex;
        img {
          width: 60px;
          height: 60px;
          margin: 0 5px;
        }
        .goods-info {
          width: 100%;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          h4 {
            font-size: 13px;
            line-height: 16px;
            margin: 0;
            overflow: hidden;
            text-overflow: ellipsis;
            display: -webkit-box;
            -webkit-line-clamp: 2;
            -webkit-box-orient: vertical;
          }
          p {
            position: relative;
            .price {
              font-size: 16px;
              color: red;
              line-height: 30px;
            }
            .mui-numbox {
              width: 112px;
              height: 28px;
              position: absolute;
              right: 0;
              bottom: 0;
            }
          }
        }
      }
      .mint-switch-core {
        width: 44px;
      }
      .mint-switch-input:checked + .mint-switch-core::after {
        transform: translate(12px);
      }
    }
  }
  .check {
    position: fixed;
    left: 0;
    bottom: 50px;
    height: 50px;
    line-height: 50px;
    background-color: #fff;
    width: 100%;
    padding-left: 10px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    strong {
      color: red;
      font-size: 18px;
      font-weight: normal;
    }
    .mint-switch-label {
      margin-left: 4px;
    }
    .mint-button {
      height: 50px;
      border-radius: 0;
      padding: 0 25px;
      // margin-left: 2px;
    }
  }
}
</style>