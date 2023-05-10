<template>
<FinalPage v-if='active' @shareShop='shareShop' @clickShop='clickShop'/>
</template>

<script>
import { mapActions, mapState } from 'vuex'
import FinalPage from '@/components/onboarding/FinalPage'
export default {
  name: 'FinalPageContainer',
  components: {
    FinalPage
  },
  computed: {
    ...mapState({
      externalId: state => state.shop.externalId,
      active: state => state.createShop.onboardingStatus.finalPage
    })
  },
  methods: {
    ...mapActions({
      handleSelfShop: 'shop/loadSelfShop',
    }),
    async shareShop () {
      await this.handleSelfShop()
      if (this.externalId) {
        await navigator.clipboard.writeText(`${location.href}shop/${this.externalId}`)
      }
    },
    async clickShop () {
     await this.handleSelfShop()
      if (this.externalId) {
        await this.$router.push(`/s/${this.externalId}`)
      }
    }
  }
}
</script>

<style scoped>

</style>
