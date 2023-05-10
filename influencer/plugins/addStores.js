import lightBox from 'common/store/lightBox.js'
import geolocation from 'common/store/geolocation'
import accountPopup from 'common/store/accountPopup'
import loginModal from 'common/store/loginModal'
import auth from 'common/store/auth'
import registration from 'common/store/registration'
import product from 'common/store/product'
import error from 'common/store/error'
import buyerAddress from 'common/store/buyerAddress'
import buyerProfile from 'common/store/buyerProfile'
import paymentCard from 'common/store/paymentCard'
import reviews from 'common/store/reviews'
export default ({ store }) => {
  store.registerModule('lightBox',lightBox)
  store.registerModule('geolocation', geolocation)
  store.registerModule('accountPopup', accountPopup)
  store.registerModule('loginModal', loginModal)
  store.registerModule('auth', auth)
  store.registerModule('registration', registration)
  store.registerModule('product', product)
  store.registerModule('error', error)
  store.registerModule('buyerAddress', buyerAddress)
  store.registerModule('buyerProfile', buyerProfile)
  store.registerModule('paymentCard', paymentCard)
  store.registerModule('reviews', reviews)
}
