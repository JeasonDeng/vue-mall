<template>
  <div class="mui-numbox" data-numbox-min="1">
    <button class="mui-btn mui-btn-numbox-minus" type="button">-</button>
    <input id="test" class="mui-input-numbox" type="number" v-model="value" @change="changeVal" />
    <button class="mui-btn mui-btn-numbox-plus" type="button" ref="plus">+</button>
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
  props: ['max'],
  methods: {
    changeVal() {
      this.value = parseInt(document.querySelector('#test').value)
      this.$emit('getNumber', this.value)
    }
  },
  mounted() {
    mui('.mui-numbox').numbox()
  },
  watch: {
    max: function (val) {
      mui('.mui-numbox').numbox().setOption('max', val)
    }
  }
}
</script>

<style>
</style>