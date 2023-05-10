<template>
<ShopInfo :shop='shop' @clickCreate='clickCreate'/>
</template>

<script>
import {mapState, mapActions} from 'vuex'
import ShopInfo from '@/components/shop/ShopInfo'
export default {
  name: 'ShopInfoContainer',
  components: {
    ShopInfo
  },
  computed: {
    ...mapState({
      shop: state => state.shop.shop
    })
  },
  methods: {
    ...mapActions({
      handleCollectionPopup: 'collections/handleCollectionPopup'
    }),
    clickCreate () {
      this.handleCollectionPopup(true)
    }
  }
}
</script>

<style scoped>

</style>
