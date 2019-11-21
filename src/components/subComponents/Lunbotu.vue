<template>
  <mt-swipe>
    <mt-swipe-item v-for="(item, i) in lunbotu" :key="i">
      <img :src="item.img" :class="isFull ? 'full': ''" />
    </mt-swipe-item>
  </mt-swipe>
</template>

<script>
export default {
  props: ['lunbotu', 'isFull']
}
</script>

<style lang="less">
.mint-swipe {
  height: 200px;
  .mint-swipe-item {
    text-align: center;
    img {
      height: 100%;
    }
    .full {
      width: 100%;
    }
  }
}
</style>