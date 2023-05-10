<template>
  <AuthConfirmationCodeModal
    v-if="activateSendCode"
    :phone-number="phoneNumber"
    :time="time"
    :code="code"
    :code-length="codeConfirmLength"
    :disable="disable"
    :error="error"
    @closeModal="closeModal"
    @changeNumber="changeNumber"
    @repeatSMS="repeatSMS"
    @inputCode="inputCode">
    <CloseSvg/>
  </AuthConfirmationCodeModal>
</template>

<script>
import { mapActions, mapState } from 'vuex'
import AuthConfirmationCodeModal from 'common/components/auth/AuthConfirmationCodeModal'
import CloseSvg from '@/static/svg/close.svg'
export default {
  name: 'AuthCodeConfirmationContainer',
  components: {
    AuthConfirmationCodeModal,
    CloseSvg
  },
  data: () => ({
    timer: null
  }),
  computed: {
    ...mapState({
      activeSendCode: state => state.loginModal.activeModal.activeSendCode,
      phoneNumber: state => state.auth.phone_number,
      time: state => state.auth.time,
      code: state => state.loginModal.formCode.code,
      disable: state => state.loginModal.formCode.disable,
      codeConfirmLength: state => state.auth.code_confirm,
      error: state => state.loginModal.formCode.error
    }),
    activateSendCode () {
      if (this.activeSendCode) {
        this.changeTimer()
        return this.activeSendCode
      } else {
        return 0
      }
    }
  },
  methods: {
    ...mapActions({
      handleActive: 'loginModal/activateLogin',
      handleChangeNumber: 'loginModal/handleChangeNumber',
      startTimer: 'auth/startTimer',
      handleResetTimer: 'auth/handleResetTimer',
      handleCode: 'loginModal/handleCode'
    }),
    closeModal (payload) {
      if (this.disable !== true) {
        clearInterval(this.timer)
        this.timer = null
        this.handleActive(payload)
      }
    },
    changeNumber () {
      if (this.disable !== true) {
        this.handleChangeNumber()
      }
    },
    changeTimer () {
      if (this.timer === null) {
        this.timer = setInterval(() => {
          if (this.time > 0) {
            this.startTimer()
          } else {
            clearInterval(this.timer)
          }
        }, 1000)
      }
    },
    repeatSMS () {
      this.handleResetTimer()
      this.changeTimer()
    },
    inputCode (value) {
      this.handleCode(value)
    }
  }
}
</script>

<style scoped>

</style>
