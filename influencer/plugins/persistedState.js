import createPersistedState  from 'vuex-persistedstate'
import * as Cookies from 'js-cookie'
const cookieparser = process.server ? require('cookieparser') : undefined

export default ({ store, req }) => {
  window.onNuxtReady(() => {
    createPersistedState({
      key: 'cart',
      paths: ['cart.shopCartStorage', 'cart.counter']
    }) (store)

    createPersistedState({
      key: 'paymentId',
      paths: [
        'newOrder.paymentId'
      ],
      storage: {
        getItem: key => {
          if (process.server) {
            return cookieparser.parse(req.headers.cookie || '')[key]
          }
        },
        setItem: (key, value) => Cookies.set(key, value, { expires: 14 }),
        removeItem: key => Cookies.remove(key)
      }
    }) (store)

    createPersistedState( {
      key: 'token',
      paths: [
        'auth.token'
      ],
      storage: {
        getItem: key => {
          if (process.server) {
            return cookieparser.parse(req.headers.cookie || '')[key]
          }
        },
        setItem: (key, value) => Cookies.set(key, value, { expires: 14 }),
        removeItem: key => Cookies.remove(key)
      }
    }) (store)
  })
}
