<template>
<CreateShop v-if='active' :info='info'
            :image-url-cover='imageUrlCover'
            :image-url='imageUrl'
            @submitForm='submitForm'
            @clipperImageCover='clipperImageCover'
            @clipperImage='clipperImage'
/>
</template>

<script>
import { mapActions, mapState } from 'vuex'
import CreateShop from '@/components/onboarding/CreateShop'
export default {
  name: 'CreateShopContainer',
  components: {
    CreateShop
  },
  data: () => ({
    clippers: {
      clipperName: 'avatar',
      clipperNameCover: 'cover'
    }
  }),
  computed: {
    ...mapState({
      active: state => state.createShop.onboardingStatus.createShopPage,
      info: state => state.auth.info,
      imageUrl: state => state.clipperImage.imageUrl?.avatar,
      imageUrlCover: state => state.clipperImage.imageUrl?.cover
    }),
  },
  methods: {
    ...mapActions({
      handleSubmitForm: 'createShop/handleSubmitForm',
      handleActiveClipper: 'clipperImage/handleActiveClipper',
      handleImage: 'clipperImage/handleImage',
    }),
    async submitForm (payload) {
      await this.handleSubmitForm(payload)
    },
    async clipperImage (payload) {
     await this.handleImage({imageUrl: URL.createObjectURL(payload.file), name: this.clippers.clipperName})
     await this.handleActiveClipper(true)
    },
    async clipperImageCover (payload) {
      await this.handleImage({imageUrl: URL.createObjectURL(payload.file), name: this.clippers.clipperNameCover})
      await this.handleActiveClipper(true)
    }
  }
}
</script>

<style scoped>

</style>
