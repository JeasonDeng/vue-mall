<template>
  <div class="mui-numbox" data-numbox-min="1">
    <button class="mui-btn mui-btn-numbox-minus" type="button">-</button>
    <input
      :class="['mui-input-numbox', 'numbox-' + index]"
      type="number"
      v-model="value"
      @change="changeVal"
    />
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
  props: ['max', 'id', 'index'],
  methods: {
    changeVal() {
      if (this.$route.path === '/cart') {
        this.value = parseInt(document.querySelector('.numbox-' + this.index).value)
        this.$store.dispatch('changeCount', { id: this.id, count: this.value })
      } else {
        this.value = parseInt(document.querySelector('.mui-input-numbox').value)
        this.$emit('getNumber', this.value)
      }
    }
  },
  created() {
    if (this.$route.path === '/cart') {
      this.$store.state.cart.some(item => {
        if (item.id === this.id) {
          this.value = item.count
          return
        }
      })
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