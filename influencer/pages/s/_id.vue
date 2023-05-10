<template>
  <div>
    <Shop v-if='profile.is_influencer'>
      <template v-slot:shopAbout>
        <ShopAboutContainer :shop='shop'/>
      </template>
      <template v-if='shop.collections && shop.collections.length === 0' v-slot:shopEmpty>
        <ShopEmptyContainer/>
      </template>
      <template v-if='shop.collections && shop.collections.length > 0' v-slot:shopInfo>
        <ShopInfoContainer/>
      </template>
    </Shop>
    <div class='popups'>
      <ShopRedactionPopupContainer/>
      <CreateCollectionPopupContainer/>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import Shop from '@/components/shop/Shop'
import ShopAboutContainer from '@/containers/shop/ShopAboutContainer'
import ShopEmptyContainer from '@/containers/shop/ShopEmptyContainer'
import ShopInfoContainer from '@/containers/shop/ShopInfoContainer'
import ShopRedactionPopupContainer from '@/containers/shop/ShopRedactionPopupContainer'
import CreateCollectionPopupContainer from '@/containers/collection/CreateCollectionPopupContainer'
export default {
  async validate ({params, store}) {
    const token = store.state.auth.token
    await store.dispatch('shop/loadShop', params.id)
    await store.dispatch('shop/loadSelfShop')
    const isSelfShop = await store.getters['shop/isSelfShop']
    return (token !== null && isSelfShop)
  },
  components: { CreateCollectionPopupContainer, ShopRedactionPopupContainer, ShopInfoContainer, ShopEmptyContainer, ShopAboutContainer, Shop},
  layout: 'influencer',
  async asyncData (context) {
    const { store } = context
    let profile = null
    const shop = store.state.shop.shop
    await store.dispatch('influencerProfile/handleProfile')
    profile = await store.state.influencerProfile.profile
    return {
      profile,
      shop
    }
  },
  head () {
    return {
      title: this.shopName
    }
  },
  computed: {
    ...mapState({
      shopName:state => state.shop.shop.name
    })
  }
}
</script>

<style scoped>

</style>
