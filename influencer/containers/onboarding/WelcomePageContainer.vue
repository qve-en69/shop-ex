<template>
<WelcomePage v-if='active' @clickContinue='clickContinue'/>
</template>

<script>
import {mapState,mapGetters,mapActions} from 'vuex'
import WelcomePage from '@/components/onboarding/WelcomePage'
export default {
  name: 'WelcomePageContainer',
  components: {
    WelcomePage
  },
  computed: {
    ...mapState({
      active: state => state.createShop.onboardingStatus.welcomePage,
      externalId: state => state.shop.externalId
    }),
    ...mapGetters({
      isAuthenticate: 'auth/isAuthenticated'
    })
  },
  methods: {
    ...mapActions({
      openLogin: 'loginModal/activateLogin',
      handleActive: 'createShop/handleActive',
    }),
     clickContinue () {
      if (this.isAuthenticate) {
        if (this.externalId !== null && this.externalId !== undefined) {
          location.reload()
        } else {
          this.handleActive('createShop')
        }
      } else {
        this.openLogin('login')
      }
    }
  }
}
</script>

<style scoped>

</style>
