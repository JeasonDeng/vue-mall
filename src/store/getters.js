export default {
  totalCount(state) {
    let sum = 0
    state.cart.forEach(item => {
      sum += item.count
    })
    return sum 
  }
}