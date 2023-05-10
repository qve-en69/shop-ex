export default {
  namespaced: true,
  state: () => ({
    info: null,
    changeForm: false,
  }),
  mutations: {
    setInfoProfile (state, payload) {
      state.info = payload
    },
    changeField (state, payload) {
      state.form[payload.field] = payload.value
    },
    changeForm (state, status) {
      state.changeForm = status
    },
    setError(state, error) {
      state.form.errors[error.key] = error.value
    },
  },
  actions: {
    async handleInfoProfile (context) {
      const response = await this.$api.buyer.get('info', null)
      context.commit('setInfoProfile',response)
    },
    handleChangeField (context, payload) {
      context.commit('changeField', payload)
    },
    handleChangeForm (context, status) {
      context.commit('changeForm', status)
    },
    async handleChangeProfile (context, payload) {
      const data = {
        phone_number: payload.phoneNumber,
        email: payload.email,
        first_name: payload.firstName,
        last_name: payload.lastName
      }
      try {
        if (this.$env.SITE === 'influencer') {
          const formData = new FormData()
          formData.append('nickname', payload.nickname)
          if (payload.avatar !== '') {
            formData.append('avatar', payload.avatar)
            if (context.rootState.clipperImage.coordinates.avatar !== '') {
              const coord = context.rootState.clipperImage.coordinates.avatar
              formData.append('top', Math.ceil(coord.top))
              formData.append('right', Math.ceil(coord.right))
              formData.append('left', Math.ceil(coord.left))
              formData.append('bottom', Math.ceil(coord.bottom))
            }
          }
          await this.$api.influencer.put(`update/${context.rootState.auth.info.id}/`, formData)
        }
        await this.$api.buyer.put('info/', data, context.rootState.auth.token)
        await context.dispatch('handleInfoProfile')
      } catch (e) {console.error(e)}

    }
  }
}