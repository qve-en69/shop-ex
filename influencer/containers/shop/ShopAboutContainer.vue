<template>
<ShopAbout :shop='shop' @clickOpen='clickOpen'/>
</template>

<script>
import {mapActions} from 'vuex'
import ShopAbout from '@/components/shop/ShopAbout'
export default {
  name: 'ShopAboutContainer',
  components: {
    ShopAbout
  },
  props: {
    shop: {
      type: Object,
      default: () => {
        return {}
      }
    }
  },
  methods: {
    ...mapActions({
      handleActivePopup: 'shopRedaction/handleActivePopup'
    }),
    clickOpen (payload) {
      this.handleActivePopup(payload)
    }
  }
}
</script>

<style scoped>

</style>
