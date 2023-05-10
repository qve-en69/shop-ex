import {emptyField, validFieldEmail} from "@/utils/errors/errorsField";

export default {
  namespaced: true,
  state: () => ({
    form: {
      email: '',
      firstName: '',
      lastName: '',
      errors: {
        email: '',
        firstName: '',
        lastName: ''
      },
    },
    active: false,
    userCreated: false
  }),
  mutations: {
    setActiveRegistration (state, status) {
      state.active = status
    },
    setError(state, error) {
      state.form.errors[error.key] = error.value
    },
    clearError (state) {
      Object.keys(state.form.errors).forEach(item => {
        state.form.errors[item] = ''
      })
    },
    clearField (state) {
      Object.keys(state.form).forEach(item => {
        if (item !== 'errors') {
          state.form[item] = ''
        }
      })
    },
    changeField (state, payload) {
      state.form[payload.field] = payload.value
    },
    setUserCreated (state, status) {
      state.userCreated = status
    }
  },
  actions: {
    handleActiveRegistration (context, payload) {
      context.commit('clearError')
      context.commit('setActiveRegistration', payload)
      if (payload === false) {
        context.dispatch('loginModal/handlePhone', '', {root: true})
        context.dispatch('auth/handlePhoneNumber', '', {root: true})
      }
    },
    async handleRegistration (context) {
      Object.entries(context.state.form).forEach(([key, value]) => {
        let error = ''
        if (key === 'firstName' || key === 'lastName') {
          error = emptyField(value)
        } else if (key === 'email') {
          error = value === '' ? emptyField(value) : validFieldEmail(value)
        }
        context.commit('setError', {key,value: error})
      })
      if (!Object.values(context.state.form.errors).find(value => value !== '')) {
        const data = {
          phone_number: context.rootState.auth.phone_number,
          last_name: context.state.form.lastName,
          first_name: context.state.form.firstName,
          email: context.state.form.email
        }

        const formData = new FormData()
        formData.append('phone_number', data.phone_number)
        formData.append('last_name', data.last_name)
        formData.append('first_name', data.first_name)
        formData.append('email', data.email)
        formData.append('language', document.querySelector('html').getAttribute('lang'))

        try {
          await this.$api.auth.post('register/buyer/', formData)
          context.commit('clearError')
          await context.dispatch('auth/handlePhoneNumber', data.phone_number, {root: true})
          await context.dispatch('loginModal/changeActiveModal', 'code', { root: true })
          context.commit('setActiveRegistration', false)
          context.commit('setUserCreated', true)
        } catch (e) {
          if (e.response.status === 400 && e.response.data.email) {
            context.commit('setError', {key: 'email',value: 'Пользователь с таким email уже существует'})
          }
        }
      }
    },
    handleField (context, payload) {
      context.commit('changeField', payload)
    },
    handleUserCreated (context, payload) {
      context.commit('setUserCreated', payload)
    }
  }
}