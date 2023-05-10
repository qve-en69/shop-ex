<template>
  <div>
    <Onboarding>
      <WelcomePageContainer/>
      <CreateShopContainer/>
      <FinalPageContainer/>
    </Onboarding>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import Onboarding from '@/components/onboarding/Onboarding'
import WelcomePageContainer from '@/containers/onboarding/WelcomePageContainer'
import CreateShopContainer from '@/containers/onboarding/CreateShopContainer'
import FinalPageContainer from '@/containers/onboarding/FinalPageContainer'
export default {
  components: { FinalPageContainer, CreateShopContainer, WelcomePageContainer, Onboarding},
  layout: 'onboard',
  async asyncData (context) {
    const {store, redirect} = context
    const externalId = store.state.shop.externalId
    if (store.getters['auth/isAuthenticated'] && externalId !== null && externalId !== undefined) {
      redirect(`/s/${externalId}`)
    } else if (store.getters['auth/isAuthenticated']) {
      await store.dispatch('auth/load')
    }
  },
  head () {
    return {
      title: this.viewTitle
    }
  },
  computed: {
    ...mapState({
      onboardingStatus: state => state.createShop.onboardingStatus
    }),
    viewTitle () {
      if (this.onboardingStatus.welcomePage) {
        return this.$t('Добро пожаловать в ShopShop!')
      } else if (this.onboardingStatus.createShopPage) {
        return this.$t('Заполните информацию о себе')
      }
      return ''
    }
  }
}
</script>
