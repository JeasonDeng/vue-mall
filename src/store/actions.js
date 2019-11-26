export default {
  add({ commit }, goodsInfo) {
    commit('add', goodsInfo)
  },
  changeCount({ commit }, count) {
    commit('changeCount', count)
  },
  changeSelected({ commit }, selected) {
    commit('changeSelected', selected)
  },
  changeAllSelected({ commit }, selectAll) {
    commit('changeAllSelected', selectAll)
  },
  deleteItem({ commit }, id) {
    commit('deleteItem', id)
  }
}