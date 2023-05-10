<template>
<ShopEmpty @clickCreate='clickCreate'/>
</template>

<script>
import { mapActions } from 'vuex'
import ShopEmpty from '@/components/shop/ShopEmpty'
export default {
  name: 'ShopEmptyContainer',
  components: {
    ShopEmpty
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
