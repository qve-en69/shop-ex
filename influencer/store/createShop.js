export const state = () => ({
  onboardingStatus: {
    welcomePage: true,
    createShopPage: false,
    finalPage: false,
  }
})

export const mutations = {
  setActive (state, payload) {
    state.onboardingStatus.welcomePage = payload === 'welcomePage'
    state.onboardingStatus.createShopPage = payload === 'createShop'
    state.onboardingStatus.finalPage = payload === 'finalPage'
  }
}

export const actions = {
  handleActive (context, payload) {
    context.commit('setActive', payload)
  },
  async handleSubmitForm (context,payload) {
    const formData = new FormData()

    formData.append('name', payload.name)
    formData.append('external_id', payload.link)
    formData.append('description', payload.name)

    const formDataInfluencer = new FormData()
    formDataInfluencer.append('nickname', payload.nickname)
    if (payload.avatar !== ''){
      formDataInfluencer.append('avatar', payload.avatar)
      if (context.rootState.clipperImage.coordinates.avatar !== '') {
        const coord = context.rootState.clipperImage.coordinates.avatar
        formDataInfluencer.append('top',Math.ceil(coord.top))
        formDataInfluencer.append('right',Math.ceil(coord.right))
        formDataInfluencer.append('left', Math.ceil(coord.left))
        formDataInfluencer.append('bottom', Math.ceil(coord.bottom))
      }
    }

    if (payload.cover !== ''){
      formData.append('avatar', payload.cover)
      if (context.rootState.clipperImage.coordinates.cover !== '') {
        const coord = context.rootState.clipperImage.coordinates.cover
        formData.append('top',Math.ceil(coord.top))
        formData.append('right',Math.ceil(coord.right))
        formData.append('left', Math.ceil(coord.left))
        formData.append('bottom', Math.ceil(coord.bottom))
      }
    }

    try {
      await this.$api.auth.post('register/influencer/', formDataInfluencer)
    } catch (e) {}
    try {
      await this.$api.influencer.post('shop/', formData)
      await location.reload()
    } catch (e) {
      if (e.response.status === 500) {
        context.commit('setActive', 'finalPage')
      } else if (e.response.status === 415) {
        await this.$errors.createShop.setMessage('Not supported form data.')
      } else if (e.response.status === 400) {
        if (e.response.data.external_id && e.response.data.external_id[0] === "influencer shop с таким external id уже существует.") {
          await this.$errors.createShop.setMessage('influencer shop с таким external id уже существует.')
        } else if (e.response.data.external_id && e.response.data.external_id.non_field_errors[0] === 'Вы можете использовать только латинские буквы, цифры, точки и тире') {
          await this.$errors.createShop.setMessage('В ссылке магазина вы можете использовать только латинские буквы, цифры, точки и тире.')
        }
      }
    }
  }
}
