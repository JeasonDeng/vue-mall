export default {
  totalCount(state) {
    let sum = 0
    state.cart.forEach(item => {
      sum += item.count
    })
    return sum
  },
  selectedAll(state) {
    let flag = true
    if (state.cart.length === 0) {
      return flag = false
    }
    state.cart.some(item => {
      if (!item.selected) {
        flag = false
        return
      }
    })
    return flag
  },
  totalAmount(state) {
    let sum = 0
    state.cart.forEach(item => {
      if (item.selected) {
        sum += item.price * item.count
      }
    })
    return sum
  }
}