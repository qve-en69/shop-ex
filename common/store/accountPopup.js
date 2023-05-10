export default {
  namespaced: true,
  state: () => ({
    activePopup: false
  }),
  mutations: {
    activePopup (state) {
      state.activePopup = state.activePopup !== true
    },
    setClearAccount (state) {
      state.activePopup = false
    }
  },
  actions: {
    handleAccountPopup (context) {
      context.commit('activePopup')
    },
    clearAccount (context) {
      context.commit('setClearAccount')
    }
  }
}
