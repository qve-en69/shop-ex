<template>
<div>
  <div class="buttons-wrap-hor fixed-on-mobile one-row">
    <button type='button' class="button-primary button-primary-big w-inline-block" @click='clickAddInShop'>
      {{ $t('Добавить в магазин') }}
    </button>
<!--    Todo Когда нибудь потом...-->
<!--    <button type='button' class="button-secondary button-secondary-big w-inline-block">-->
<!--      $t('Продать') <span class="n-m">сейчас</span>-->
<!--    </button>-->
  </div>
  <div v-if='false'>
    <div v-if="curSkus.in_stock > 0" class="button-wrap">
      <button v-if="!activeCart"  type='button' class="button-secondary button-secondary-big w-inline-block" @click.prevent="clickCart">
        {{ $t('Купить с кэшбэком') }} {{product.category.influencer_earnings_percent}}%
      </button>
      <nuxt-link v-if="activeCart" to="/cart" class="button-primary button-primary-big w-inline-block">
        <div>{{ $t('Перейти в корзину') }}</div>
      </nuxt-link>
      <div class="input-info-msg center" v-if='product.category.influencer_earnings_percent'>{{product.category.influencer_earnings_percent}}%
        {{ $t('от вернутся на ваш баланс в ShopShop') }}</div>
    </div>
  </div>
  <ProductEnd v-if='false' :big="true"/>
</div>
</template>

<script>
import ProductEnd from 'common/components/productItem/ProductEnd'
export default {
  name: 'ProductInfoAction',
  components: {
    ProductEnd
  },
  props: {
    influencerShop: {
      type: Object,
      default: () => {
        return {}
      }
    },
    product: {
      type: Object,
      default: () => {
        return {}
      }
    },
    skus: {
      type: Array,
      default: () => {
        return []
      }
    },
    curSkus: {
      type: Object,
      default: () => {
        return {}
      }
    },
    selectSku: {
      type:Array,
      default: () => {
        return []
      }
    },
    characteristicSku: {
      type: Array,
      default: () => {
        return []
      }
    }
  },
  emits: {
    addCart: null,
    addInShop: null,
  },
  data: () => ({
    curFeature: '',
    activeCart: false
  }),
  methods: {
    clickCart () {
      this.activeCart = true
      this.$emit('addCart', {
        shop: this.influencerShop,
        product: this.product,
        skus: this.curSkus,
        selectSku: this.selectSku
      })
    },
    clickAddInShop () {
      this.$emit('addInShop', this.product)
    }
  }
}
</script>

<style scoped>

</style>
