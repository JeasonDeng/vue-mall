export default {
  add(state, goodsInfo) {  // { id: 1, count: 1, selected: true, price: 111}  
    let flag = false
    state.cart.some(item => {
      if (item.id == goodsInfo.id) {
        flag = true
        item.count += goodsInfo.count
        return
      }
    })
    if (!flag) {
      state.cart.unshift(goodsInfo)
    }
    localStorage.setItem('cartData', JSON.stringify(state.cart))
  }
}