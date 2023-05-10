export const state = () => ({})

export const mutations = {}

export const actions = {
  async nuxtServerInit ({ dispatch }, ctx) {
    await dispatch('auth/setTokenFromCookie', ctx);
    await dispatch('auth/load', ctx);
    await dispatch('shop/loadSelfShop', ctx);
    await dispatch('geolocation/setGeoFromCookie', ctx)
  }
}
