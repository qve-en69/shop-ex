<template>
  <AuthPhoneModal
    :check-agreement="checkAgreement"
    :error-agreement="errorAgreement"
    :error-field="errorField"
    @clickClose="clickClose"
    @changeCheckAgreement="changeCheckAgreement"
    @sendForm="sendForm">
    <CloseSvg/>
  </AuthPhoneModal>
</template>

<script>
import {mapActions, mapState} from 'vuex'
import AuthPhoneModal from 'common/components/auth/AuthPhoneModal'
import CloseSvg from '@/static/svg/close.svg'
export default {
  name: 'AuthPhoneContainer',
  components: {
    AuthPhoneModal,
    CloseSvg
  },
  computed: {
    ...mapState({
      checkAgreement: state => state.loginModal.form.check_agreement,
      errorAgreement: state => state.loginModal.form.errors.error_agreement,
      errorField: state => state.loginModal.form.errors.error_field
    })
  },
  methods: {
    ...mapActions({
      deactivateLogin: 'loginModal/activateLogin',
      handleCheckAgreement: 'loginModal/handleAgreement',
      handleForm: 'loginModal/handleForm'
    }),
    clickClose (status) {
      this.deactivateLogin(status)
    },
    changeCheckAgreement () {
      this.handleCheckAgreement()
    },
    sendForm (phoneNumber) {
      this.handleForm(phoneNumber)
    }
  }
}
</script>

<style scoped>

</style>
