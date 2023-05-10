import Cookies from 'js-cookie'
import { SMS_TIME, CODE_CONFIRMATION_LENGTH } from '@/constants/smsTime'
const cookieparser = process.server ? require('cookieparser') : undefined

export default {
  namespaced: true,
  state: () =>({
    token: null,
    phone_number: '',
    time: SMS_TIME,
    code_confirm: '',
    activeModalLogout: false,
    info: null
  }),
  mutations: {
    setPhoneNumber (state, payload) {
      state.phone_number = payload
    },
    setToken (state, payload) {
      state.token = payload
    },
    setTime (state) {
      state.time = SMS_TIME
    },
    changeTime (state) {
      if (state.time !== 0) {
        state.time--
      }
    },
    setChangeNumber (state) {
      state.phone_number = ''
      state.code_confirm = ''
      state.time = SMS_TIME
    },
    setConfirmCode (state, payload) {
      state.code_confirm = payload
    },
    setLogoutModal (state, status) {
      state.activeModalLogout = status
    },
    info: (state, info) => state.info = info,
  },
  actions: {
    setTokenFromCookie({ commit, state }, { req }) {
      let token = null
      if (req.headers.cookie) {
        try {
          token = JSON.parse(cookieparser.parse(req.headers.cookie).token).auth.token
        } catch (e) {
          // No valid cookie found
        }
      }
      if (token) {
        commit('setToken', token)
      }
    },
    handlePhoneNumber (context, payload) {
      context.commit('setPhoneNumber', payload)
      context.commit('setTime')
      context.commit('setConfirmCode', CODE_CONFIRMATION_LENGTH)
      context.dispatch('startTimer')
    },
    handleChangeNumber (context) {
      context.commit('setChangeNumber')
      context.dispatch('registration/handleUserCreated', false, {root: true})
    },
    startTimer (context) {
      if (context.state.time !== 0) {
        context.commit('changeTime')
      }
    },
    async handleResetTimer (context) {
      context.commit('setTime')
      try {
        await this.$api.auth.post('get_phone_confirmation_code/', { phone_number: context.state.phone_number })
        await context.dispatch('startTimer')
        await context.dispatch('loginModal/clearCode', null, {root: true})
      } catch (e) {
        await context.dispatch('startTimer')
        await context.dispatch('loginModal/clearCode', null, {root: true})
      }
    },
    handleToken (context, payload) {
      Cookies.set('token', payload)
      context.commit('setToken', payload)
    },
    clearPhoneNumber (context) {
      context.commit('setPhoneNumber', '')
    },
    clearAuth (context) {
      Cookies.remove('token')
      context.commit('setToken', null)
    },
    async load ({ dispatch, commit, state, rootState }) {
      if (state.token) {
        try {
          const response = await this.$api.buyer.get('info', null);
          commit('info', response);
        } catch (error) {
          const statusCode = error.response ? error.response.status : -1

          if (statusCode === 401) {
            const textCode =  error.response.data.detail || null
            if (textCode === 'Invalid token.') {
              dispatch('auth/clearAuth')
              const logoUrl = rootState.logoUrl.url
              await this.$router.push(logoUrl)
            }
          }
        }
      }
    },
    async handleLogout (context) {
      await this.$api.auth.get('logout', null)
      Cookies.remove('token')
      context.commit('setToken', null)
      if (this.$env.SITE === 'influencer') {
        await this.$router.replace('/')
      } else {
        await this.$router.replace(context.rootState.logoUrl.url)
      }
    },
    handleActiveLogoutModal (context, status) {
      context.commit('setLogoutModal', status)
    },
    handlePayToken (context, payload) {
      context.commit('setToken', payload)
    }
  },
  getters: {
    isAuthenticated(state) {
      return state.token !== null
    }
  }
}
