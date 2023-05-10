import https from 'https'
import qs from 'qs'
import create from '../api/repository'

export default ({ $axios, app, store, redirect } , inject) => {
  $axios.defaults.baseURL = app.$env.API_URL
  $axios.defaults.httpsAgent = new https.Agent({ rejectUnauthorized: false })
  $axios.onRequest(cfg => {
    const token = store.state.auth.token
    if (token) {
      cfg.headers.common.Authorization = `Token ${token}`
    }
  })
  $axios.onError((error) => {
    return new Promise( (resolve, reject) => {
      const statusCode = error.response ? error.response.status : -1

      if (statusCode === 401) {
        const textCode =  error.response.data.detail || null
        if (textCode === 'Invalid token.' || textCode === 'Token expired.') {
          store.dispatch('auth/clearAuth')
          redirect('/')
        }
      }

      return reject(error)
    })
  })
  $axios.defaults.paramsSerializer = params => qs.stringify(params, { arrayFormat: 'repeat', skipNulls: true });
  const axiosRepo = create($axios)

  const repos = {
    influencer_shop: axiosRepo('public/shop'),
    influencer_shop_collection: axiosRepo('public/shop-collection'),
    influencer_product: axiosRepo('public/shop-item-by-product-id'),
    public: axiosRepo('public/'),
    auth: axiosRepo('auth'),
    login: axiosRepo('auth/login'),
    buyer: axiosRepo('buyer'),
    influencer: axiosRepo('influencer'),
    payment: axiosRepo('webhook/cloudpayments'),
    review: axiosRepo('public/product/review/')
  }
  inject('api', repos)
}
