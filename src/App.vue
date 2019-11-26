<template>
  <div class="app-container">
    <mt-header fixed title="Vue·Mall">
      <mt-button icon="back" slot="left" @click="$router.go(-1)" v-show="$route.path !== '/home'"></mt-button>
    </mt-header>

    <div class="content-container" ref="contentContainer">
      <transition>
        <router-view :contentContainer="$refs.contentContainer"></router-view>
      </transition>
    </div>

    <nav class="mui-bar mui-bar-tab">
      <router-link class="mui-tab-item1" to="/home">
        <span class="mui-icon mui-icon-home"></span>
        <span class="mui-tab-label">首页</span>
      </router-link>
      <router-link class="mui-tab-item1" to="/member">
        <span class="mui-icon mui-icon-contact"></span>
        <span class="mui-tab-label">会员</span>
      </router-link>
      <router-link class="mui-tab-item1" to="/cart">
        <span class="mui-icon mui-icon-extra mui-icon-extra-cart">
          <span class="mui-badge">{{totalCount}}</span>
        </span>
        <span class="mui-tab-label">购物车</span>
      </router-link>
      <router-link class="mui-tab-item1" to="/search">
        <span class="mui-icon mui-icon-search"></span>
        <span class="mui-tab-label">搜索</span>
      </router-link>
    </nav>
  </div>
</template>

<script>
export default {
  data() {
    return {
      totalCount: this.$store.getters.totalCount
    }
  },
  watch: {
    '$store.getters.totalCount': function (val) {
      if (this.$route.path === '/cart') {
        this.totalCount = val
        return
      }
      setTimeout(() => {
        this.totalCount = val
      }, 800)
    }
  }
}
</script>

<style lang="less" scoped>
.app-container {
  height: 100%;
  .content-container {
    position: relative;
    height: 100%;
    padding-top: 40px;
    padding-bottom: 50px;
    overflow-x: hidden;
  }
}
.v-enter {
  opacity: 0;
  transform: translateX(100%);
}
.v-leave-to {
  opacity: 0;
  transform: translateX(-100%);
  position: absolute;
}
.v-enter-active,
.v-leave-active {
  transition: all 0.5s;
}
nav {
  background-color: #fff;
}
.mui-bar .mui-icon:active {
  opacity: 1;
}
.mui-bar-tab .mui-tab-item1 {
  display: table-cell;
  overflow: hidden;
  width: 1%;
  height: 50px;
  text-align: center;
  vertical-align: middle;
  white-space: nowrap;
  text-overflow: ellipsis;
  color: #929292;
}
.mui-bar-tab .mui-tab-item1.mui-active {
  color: #007aff;
}
.mui-bar-tab .mui-tab-item1 .mui-icon {
  top: 3px;
  width: 24px;
  height: 24px;
  padding-top: 0;
  padding-bottom: 0;
}

.mui-bar-tab .mui-tab-item1 .mui-icon ~ .mui-tab-label {
  font-size: 11px;
  display: block;
  overflow: hidden;
  text-overflow: ellipsis;
}
</style>