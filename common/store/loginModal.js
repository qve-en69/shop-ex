import {
  ERROR_CODE,
  ERROR_PHONE,
  ERROR_CODE_EXPIRED
} from '@/constants/errors'
import {emptyField, validCheckAgreement, validFieldPhone} from "../utils/errors/errorsField";

export default {
  namespaced: true,
  state: () => ({
    activeModal: {
      activeLogin: true,
      activeSendCode: false
    },
    active: false,
    form: {
      phone_number: '',
      check_agreement: true,
      errors: {
        error_agreement: '',
        error_field: ''
      },
    },
    formCode: {
      code: '',
      disable: false,
      error: ''
    }
  }),
  mutations: {
    setActive (state, payload) {
      state.active = state.active === false
      if (payload.phone !== '') {
        state.activeModal.activeLogin = false
        state.activeModal.activeSendCode = true
      } else {
        state.activeModal.activeLogin = payload.payload === 'login'
        state.activeModal.activeSendCode = payload.payload === 'code'
        state.form.check_agreement = true
        state.form.code_confirm = ''
        state.form.errors.error_field = ''
        state.form.errors.error_agreement = ''
      }
    },
    setActiveModal (state, payload) {
      state.activeModal.activeLogin = payload === 'login'
      state.activeModal.activeSendCode = payload === 'code'
    },
    setClearLogin (state) {
      state.active = false
      state.form.check_agreement = false
      state.form.errors.error_field = ''
      state.form.errors.error_agreement = ''
      Object.entries(state.activeModal).forEach(([key,value]) => {
        state.activeModal[value] = key === 'activeLogin'
      })
    },
    setPhone (state, payload) {
      state.form.errors.error_field = ''
      state.form.phone_number = payload
    },
    setCheckAgreement (state) {
      state.form.check_agreement = state.form.check_agreement === false
    },
    setErrorAgreement (state, payload) {
      state.form.errors.error_agreement = payload
    },
    setErrorField (state, payload) {
      state.form.errors.error_field = payload
    },
    setCode (state, payload) {
      state.formCode.code = payload
    },
    setDisable (state,status) {
      state.formCode.disable = status
    },
    setErrorCode (state, msg) {
      state.formCode.error = msg
    }
  },
  actions: {
    activateLogin (context, payload) {
      context.commit('setActive', { payload, phone: context.rootState.auth.phone_number})
    },
    handlePhone (context, payload) {
      context.commit('setPhone', payload)
    },
    handleAgreement (context) {
      context.commit('setCheckAgreement')
    },
    async handleForm (context, payload) {
      const error = validCheckAgreement(context.state.form.check_agreement)
      context.commit('setErrorAgreement', error)

      const phone = payload.trim() === '' ? emptyField(payload) : validFieldPhone(payload)
      context.commit('setErrorField', phone.error)

      if (context.state.form.errors.error_agreement === '' && context.state.form.errors.error_field === '') {
        context.commit('setPhone', phone.phone)
        await context.dispatch('auth/handlePhoneNumber', phone.phone, {root: true})

        try {
          const response = await this.$api.auth.post('get_phone_confirmation_code/', { phone_number: context.state.form.phone_number })
          if (response.sms_countdown_time_in_sec) {
            await context.commit('setActiveModal', 'code')
          }
        } catch (e) {
          console.log(e)
          if (e.response.status === 404) {
            await context.dispatch('registration/handleActiveRegistration', true, {root: true})
          }
        }
      }
    },
    handleChangeNumber (context) {
      context.commit('setActiveModal', 'login')
      context.dispatch('clearCode')
      context.dispatch('auth/handleChangeNumber', null, {root: true})
    },
    async handleCode (context, payload) {
      const code = context.rootState.auth.code_confirm
      context.commit('setCode', payload)
      if (parseInt(code) === context.state.formCode.code.length) {
        context.commit('setDisable', true)
        try {
          const data = {
            phone_number: context.rootState.auth.phone_number,
            phone_confirmation_code: context.state.formCode.code
          }

          const response = await this.$api.login.post('phone/', data)
          if (response.token) {
            context.commit('setPhone', '')
            context.dispatch('clearCode')
            await context.dispatch('auth/clearPhoneNumber', null, {root: true})
            context.commit('setActive', 'login')
            context.commit('setDisable', false)
            await context.dispatch('auth/handleToken', response.token, {root: true})
            await context.dispatch('auth/load', null, {root:true})
            await context.dispatch('cart/syncAfterAuth', null, {root: true})
            if (this.$env.SITE === 'influencer') {
              await context.dispatch('shop/loadSelfShop', null, {root: true})

              if (context.rootState.registration.userCreated) {
                await context.dispatch('registration/handleUserCreated', false, {root:true})
                await context.dispatch('createShop/handleActive', 'createShop', {root:true})
              }
            }
          }
        } catch (e){
          context.dispatch('clearCode')
          if (e.response.status === 400) {
            context.commit('setErrorCode', ERROR_CODE)
          } else if (e.response.status === 401) {
            if (e.response.data.detail === "Phone code has expired") {
              context.commit('setErrorCode', ERROR_CODE_EXPIRED)
            } else {
              context.commit('setErrorCode', ERROR_PHONE)
            }
          }
          context.commit('setDisable', false)
        }
      }
    },
    changeActiveModal (context, payload) {
      context.commit('setActiveModal', payload)
    },
    clearCode (context) {
      context.commit('setErrorCode', '')
      context.commit('setCode', '')
    },
    clearLogin (context) {
      context.commit('setClearLogin')
    }
  }
}
