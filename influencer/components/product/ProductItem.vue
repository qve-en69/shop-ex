<template>
  <div class="product-grid" :class="{'product-grid-noscroll': scrollUnactive, 'product_grid-column': !activeGrid}">
    <div v-for="product in viewProducts" :key="product.id">
      <nuxt-link :to="`/product/${product.id}`" class="product-card product__start text__decoration">
        <div class="product-card-imgwrap">
          <img v-if="product.images.length > 0" :src='product.images[0].image.original' loading="lazy" alt="" class="product-card-img">
          <img v-else src='~/static/images/default/defaultProduct.png' loading="lazy" alt="" class="product-card-img">
          <div v-if="product.skus.length > 0 && product.skus[0].product_discount !== null" class="discount-badge">
            <div class="discount-text">-{{discount(product.skus[0].price, product.skus[0].product_discount.discount.new_price)}}%</div>
            <div class="discount-underlay w-embed">
              <svg width="51" height="25" viewbox="0 0 51 25" fill="none" xmlns="http://www.w3.org/2000/svg">
                <g>
                  <path fill-rule="evenodd" clip-rule="evenodd" d="M0.703979 0.158936H50.704V6.96163C48.9106 7.99906 47.704 9.93809 47.704 12.1589C47.704 14.3798 48.9106 16.3188 50.704 17.3562V24.1589L0.703979 24.1589V17.3562C2.49738 16.3188 3.70398 14.3798 3.70398 12.1589C3.70398 9.93809 2.49738 7.99906 0.703979 6.96163V0.158936Z" :fill="`url(#paint${product.id})`"></path>
                </g>
                <defs>
                  <lineargradient :id="`paint${product.id}`" x1="3.60001" y1="10.8239" x2="53.3316" y2="10.9617" gradientunits="userSpaceOnUse">
                    <stop stop-color="#8176FF"></stop>
                    <stop offset="1" stop-color="#FF337E"></stop>
                  </lineargradient>
                </defs>
              </svg>
            </div>
          </div>
        </div>
        <div class="product-card-content">
          <div class="b1 text__decoration min_height">{{ getProductName(product.name) }}</div>
          <div v-if="product.skus.length > 0 && product.skus[0].product_discount !== null" class="button-buy discount w-inline-block">
            <div>{{ product.skus[0].product_discount.discount.new_price }} ₽</div>
            <div class="old-price-wrap">
              <div class="b3">{{ product.skus[0].price }}₽</div>
              <div class="discount-line w-embed">
                <DiscountLineSvg/>
              </div>
            </div>
          </div>
          <div v-else-if="product.skus[0].in_stock === 0">
            <ProductEnd :out="true"/>
          </div>
          <div v-else class="button-buy w-inline-block margin_top">
            <div>{{ product.skus[0].price }} ₽</div>
          </div>
        </div>
      </nuxt-link>
    </div>
  </div>
</template>

<script>
import { cloneDeep } from 'lodash'
import ProductEnd from 'common/components/productItem/ProductEnd'
import { sortFeatures } from '@/utils/sortProducts'
import DiscountLineSvg from '@/static/svg/discountLine.svg'
export default {
  name: 'ProductItem',
  components: {
    ProductEnd,
    DiscountLineSvg
  },
  props: {
    products: {
      type: Array,
      default: () => {
        return []
      }
    },
    scrollUnactive: {
      type: Boolean,
      default: false
    },
    shopId: {
      type: Number,
      default: 0
    },
    activeGrid: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    viewProducts () {
      const products = cloneDeep(this.products)
      return products.map(product => {
        product.skus = sortFeatures(product.skus)
        return product
      })
    }
  },
  methods: {
    discount (oldPrice, newPrice) {
      return 100 - Math.round(newPrice*100/oldPrice)
    },
    getProductName (name) {
      if (name.length > 30) {
        return `${name.substr(0, 30)}...`
      }
      return name
    }
  }
}
</script>

<style scoped>
.product__start{
  justify-content: flex-start;
}

.text__decoration{
  text-decoration: none;
  color: black;
}

.text__decoration:hover{
  text-decoration: none;
  color: black;
}

.discount__symbol{
  width: 51px;
  height: 25px;
}

.product_grid-column {
  grid-auto-columns: 162px;
  grid-auto-rows: 162px;
  grid-template-columns: 162px;
  grid-auto-flow: column;
  overflow: auto;
}

.min_height{
  min-height: 70px;
}

.margin_top{
  margin-top: 5px;
}

.discount-underlay svg{
  fill: black;
}

.discount-text{
  color: #ED6A9A;
}
</style>
