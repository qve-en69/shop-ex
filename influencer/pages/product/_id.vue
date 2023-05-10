<template>
  <div>
    <div class="section wf-section">
      <div class="container">
        <div class="product-top">
          <ProductPhotosContainer :product-images="productImages"/>
          <div class="product-info-block product-info-block--zIndex product-info_block">
            <ProductInfoContainer
              :influencer-shop="influencerShop"
              :select-sku="selectSku"
              :cur-skus="curSkus"
              :product="product"
              :skus="skus"
              :product-api="productApi"
              :product-images="productImages"
            />
            <ProductAboutContainer
              :product="product"
              :product-api="productApi"
              :cur-skus="curSkus"
              :characteristic-sku="characteristicSku"
            />
          </div>
        </div>
        <ProductReviewsContainer/>
      </div>
    </div>
    <div class='popups'>
      <ProductChooseCollectionContainer/>
      <ProductAddInShopContainer/>
      <CreateCollectionPopupContainer/>
    </div>
  </div>
</template>

<script>
import ProductAboutContainer from '@/containers/product/ProductAboutContainer'
import ProductPhotosContainer from '@/containers/product/ProductPhotosContainer'
import ProductInfoContainer from '@/containers/product/ProductInfoContainer'
import ProductChooseCollectionContainer from '@/containers/product/ProductChooseCollectionContainer'
import ProductAddInShopContainer from '@/containers/product/ProductAddInShopContainer'
import CreateCollectionPopupContainer from '@/containers/collection/CreateCollectionPopupContainer'
import ProductReviewsContainer from '@/containers/product/ProductReviewsContainer'
export default {
  components: {
    ProductReviewsContainer,
    CreateCollectionPopupContainer,
    ProductAddInShopContainer,
    ProductChooseCollectionContainer,
    ProductAboutContainer,
    ProductPhotosContainer,
    ProductInfoContainer
  },
  layout: 'influencer',
  async validate ({params, query, store }) {
    const token = store.state.auth.token
    await store.dispatch('product/loadProduct', params.id)
    await store.dispatch('shop/loadSelfShop')
    const shop = store.state.shop.externalId
    await store.dispatch('shop/loadShop',shop)
    const product = await store.state.product.product
    if (query) {
        await store.dispatch('product/handleProductUrl', query)
    }
    return (token !== null && product !== null)
  },
  async asyncData(context) {
    const { store } = context
    const productApi = store.state.product.product
    const product = productApi.product
    const productImages = productApi.images
    const collection = productApi.collection
    const influencerShop = productApi.influencer_shop
    const skus = productApi.skus
    const curSkus = store.state.product.curSkus
    const selectSku = store.state.product.selectSku
    const characteristicSku = store.state.product.characteristicSku
    await store.dispatch('reviews/handleReviews', productApi.id)

    return {
      productApi,
      product,
      productImages,
      collection,
      influencerShop,
      skus,
      curSkus,
      selectSku,
      characteristicSku
    }
  },
  head () {
    return {
      title: `${this.productApi.name} — ${this.$t('Каталог товаров ShopShop')}`
    }
  }
}
</script>

<style scoped>

</style>
