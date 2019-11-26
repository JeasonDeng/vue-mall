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
  },
  changeCount(state, numberBox) {
    console.log('我钓鱼')
    state.cart.some(item => {
      if (item.id == numberBox.id) {
        console.log(item.id, numberBox)
        item.count = numberBox.count
      }
    })
    localStorage.setItem('cartData', JSON.stringify(state.cart))
  },
  changeSelected(state, selected) {
    state.cart.some(item => {
      if (item.id == selected.id) {
        item.selected = selected.selected
        return
      }
    })
    localStorage.setItem('cartData', JSON.stringify(state.cart))
  },
  changeAllSelected(state, selectedAll) {
    state.cart.forEach(item => item.selected = selectedAll)
    localStorage.setItem('cartData', JSON.stringify(state.cart))
  },
  deleteItem(state, id) {
    state.cart.some((item, i) => {
        // console.log(id)
      if (item.id == id) {
        console.log('眉山吗')
        state.cart.splice(i, 1)
        return
      }
    })
    localStorage.setItem('cartData', JSON.stringify(state.cart))
  }
}