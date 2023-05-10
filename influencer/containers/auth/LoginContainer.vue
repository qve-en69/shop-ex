<template>
<Login v-if="activeModal">
  <AuthPhoneContainer  v-if="activeLogin && !activeRegistration"/>
  <RegistrationContainer v-if="activeLogin && activeRegistration"/>
  <AuthCodeConfirmationContainer/>
</Login>
</template>

<script>
import { mapState } from 'vuex'
import Login from 'common/components/auth/Login'
import AuthPhoneContainer from '@/containers/auth/AuthPhoneContainer'
import AuthCodeConfirmationContainer from '@/containers/auth/AuthCodeConfirmationContainer'
import RegistrationContainer from '@/containers/auth/RegistrationContainer'
export default {
  name: "LoginContainer",
  components: {
    RegistrationContainer,
    AuthCodeConfirmationContainer,
    AuthPhoneContainer,
    Login
  },
  computed: {
    ...mapState({
      activeModal: state => state.loginModal.active,
      activeLogin: state => state.loginModal.activeModal.activeLogin,
      activeRegistration: state => state.registration.active
    })
  }
}
</script>

<style scoped>

</style>
