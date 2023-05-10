export default {
  namespaced: true,
  state: () => ({
    active: false,
    messageError: ''
  }),
  mutations: {
    setActiveError (state, status) {
      state.active = status
    },
    setMessageError (state, message) {
      state.messageError = message
    }
  },
  actions: {
    handleActiveError (context, status) {
      context.commit('setActiveError', status)
    },
    handleMessageError (context, message) {
      context.commit('setMessageError', message)
    }
  }
}