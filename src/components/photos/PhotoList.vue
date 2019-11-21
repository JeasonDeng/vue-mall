<template>
  <div>
    <ly-tab :items="items" :options="options" @change="getImgByCateId"></ly-tab>
    <ul class="photoList">
      <router-link
        v-for="(item, i) in photoList"
        :key="i"
        :to="`/home/photoinfo/${item.id}`"
        tag="li"
      >
        <img v-lazy="item.img_url" />
        <div class="desc">
          <h3>{{item.title}}</h3>
          <p>{{item.zhaiyao}}</p>
        </div>
      </router-link>
    </ul>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  data() {
    return {
      items: [],
      options: {
        activeColor: '#26a2ff'
      },
      photoList: [],
      updatedCount: 1
    }
  },
  methods: {
    getImgCates() {
      axios.get('api/getimgcategory')
        .then(res => {
          if (res.data.status === 0) {
            res.data.message.unshift({ title: '全部', id: 0 })
            this.items = res.data.message.map(item => ({ label: item.title, id: item.id }))
          }
        })
    },
    getImgByCateId(item, index) {
      const id = item ? item.id : 0
      axios.get('api/getimages/' + id)
        .then(res => {
          if (res.data.status === 0) {
            this.photoList = res.data.message
          }
        })
    }
  },
  created() {
    this.getImgCates()
    this.getImgByCateId()
  },
  mounted() {

  },
  updated() {
    if (this.updatedCount === 1) {
      const firstNav = document.querySelector('.ly-tab-item')
      const bar = document.querySelector('.ly-tab-active-bar')

      bar.style.width = firstNav.clientWidth * 0.6 + 'px'
      const inialPos = firstNav.offsetLeft + (firstNav.clientWidth - parseInt(bar.style.width)) / 2
      bar.style.transform = 'translate3d(' + inialPos + 'px, 0px, 0px)'
    }
    this.updatedCount++
  }
}
</script>

<style lang="less">
.ly-tab-item {
  color: #333;
}
.active {
  color: #26a2ff;
  border-bottom: 2px solid #26a2ff;
}

.wrapper {
  .content {
    list-style: none;
    margin: 0;
    padding: 0;
    display: inline-block;
    white-space: nowrap;
    overflow: hidden;
    li {
      display: inline-block;
      margin: 0 10px;
      line-height: 40px;
    }
  }
}
.photoList {
  list-style: none;
  margin: 0;
  padding: 10px;
  padding-bottom: 0;
  li {
    position: relative;
    background-color: #ccc;
    margin-bottom: 10px;
    text-align: center;
    img {
      width: 100%;
      vertical-align: middle;
    }
    img[lazy="loading"] {
      width: 40px;
      height: 300px;
      margin: auto;
    }
    .desc {
      position: absolute;
      width: 100%;
      max-height: 94px;
      padding: 5px;
      left: 0;
      bottom: 0;
      background-color: rgba(0, 0, 0, 0.4);
      color: #fff;
      h3 {
        font-size: 15px;
        white-space: nowrap;
        text-overflow: ellipsis;
        overflow: hidden;
      }
      p {
        color: #fff;
      }
    }
  }
}
</style>