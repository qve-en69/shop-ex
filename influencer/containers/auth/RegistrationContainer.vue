<template>
<Registration
  :errors="errors"
  :form="form"
  @clickClose="clickClose"
  @clickRegistration="clickRegistration"
  @changeField="changeField">
  <CloseSvg/>
</Registration>
</template>

<script>
import {mapActions, mapState} from 'vuex'
import Registration from 'common/components/auth/Registration'
import CloseSvg from '@/static/svg/close.svg'
export default {
  name: 'RegistrationContainer',
  components: {
    Registration,
    CloseSvg
  },
  computed: {
    ...mapState({
      errors: state => state.registration.form.errors,
      form: state => state.registration.form
    })
  },
  methods: {
    ...mapActions({
      handleActiveRegistration: 'registration/handleActiveRegistration',
      handleRegistration: 'registration/handleRegistration',
      handleField: 'registration/handleField',
    }),
    clickClose () {
      this.handleActiveRegistration(false)
    },
    clickRegistration() {
      this.handleRegistration()
    },
    changeField (payload) {
      this.handleField(payload)
    }
  }
}
</script>

<style scoped>

</style>
