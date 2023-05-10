<template>
<ShopRedactionPopup :active='active'
                    :shop='shop'
                    :image-url='imageUrl'
                    @clickClose='clickClose'
                    @submitForm='submitForm'
                    @clipperImage='clipperImage'
/>
</template>

<script>
import { mapActions, mapState } from 'vuex'
import ShopRedactionPopup from '@/components/shop/ShopRedactionPopup'
export default {
  name: 'ShopRedactionPopupContainer',
  components: {
    ShopRedactionPopup
  },
  data: () => ({
    clipperName: 'shop'
  }),
  computed: {
    ...mapState({
      active: state => state.shopRedaction.active,
      shop: state => state.shop.shop,
      imageUrl: state => state.clipperImage.imageUrl?.shop
    })
  },
  methods: {
    ...mapActions({
      handleActivePopup: 'shopRedaction/handleActivePopup',
      handleSubmitForm: 'shopRedaction/handleSubmitForm',
      handleActiveClipper: 'clipperImage/handleActiveClipper',
      handleImage: 'clipperImage/handleImage',
      handleClear: 'clipperImage/handleClear'
    }),
    clickClose (payload) {
      this.handleActivePopup(payload)
      this.handleClear()
    },
    async submitForm (payload) {
      await this.handleSubmitForm(payload)
      await this.handleClear()
    },
    clipperImage (payload) {
      this.handleActiveClipper(true)
      this.handleImage({imageUrl:URL.createObjectURL(payload.file), name: this.clipperName})
    }
  }
}
</script>

<style scoped>

</style>
