<template>
  <div class="mui-numbox" data-numbox-min="1" data-numbox-max="9">
    <button class="mui-btn mui-btn-numbox-minus" type="button">-</button>
    <input id="test" class="mui-input-numbox" type="number" v-model="value" @change="changeVal"/>
    <button class="mui-btn mui-btn-numbox-plus" type="button">+</button>
  </div>
</template>

<script>
import mui from '../../lib/js/mui.min'

export default {
  data() {
    return {
      value: 1
    }
  },
  methods: {
    changeVal() {
      this.value = parseInt(document.querySelector('#test').value)
      this.$emit('getNumber', this.value)
    }
  },
  mounted() {
    mui('.mui-numbox').numbox()
  },
}
</script>

<style>
</style>