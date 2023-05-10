export const state = () => ({
  active: false
})

export const mutations = {
  setActivePopup (state, status) {
    state.active = status
  }
}

export const actions = {
  handleActivePopup (context,status) {
    context.commit('setActivePopup', status)
  },
  async handleSubmitForm (context, payload) {
    const changeLink = context.rootState.shop.shop.external_id !== payload.link
    const id = context.rootState.shop.shop.external_id
    const formData = new FormData()
    formData.append('name', payload.name)
    formData.append('external_id', payload.link)
    formData.append('description', payload.description)
    formData.append('is_published', payload.isPublished)
    if (payload.cover !== '') {
      formData.append('avatar', payload.cover)
    }
    if (context.rootState.clipperImage.coordinates.shop !== '') {
      const coord = context.rootState.clipperImage.coordinates.shop
      formData.append('top',Math.ceil(coord.top))
      formData.append('right',Math.ceil(coord.right))
      formData.append('left', Math.ceil(coord.left))
      formData.append('bottom', Math.ceil(coord.bottom))
    }

    await this.$api.influencer.put(`shop/${id}/`, formData)
    await context.dispatch('handleActivePopup', false)
    if (changeLink) {
      await context.dispatch('shop/handleChangeEternalId', payload.link)
      await this.$router.replace(`/s/${payload.link}`)
    } else {
      await location.reload()
    }
  }
}
