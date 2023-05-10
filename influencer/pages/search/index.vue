<template>
  <div>
    <div class="section wf-section">
      <div class="container">
        <div class="bread-crumbs-wrap mb-s">
          <nuxt-link :to='"/catalog"' href="#" class="bread-crumb-link">{{ $t('Каталог') }}</nuxt-link>
          <div v-if='subCategory' class="dot"></div>
          <div class="bread-crumb-link current">{{subCategory}}</div>
        </div>
        <div class="category-wrap">
          <div class="title-24 title-28-m-vertical filter">
            <div class="title-desc">
              <h2 v-if='subCategory' class="h2 h2-mb4 text_center">{{subCategory}}</h2>
            </div>
            <SearchFiltersContainer/>
          </div>
<!--          Todo здесь были тренды-->
<!--          <div class="title-20">-->
<!--            <div class="title-wtih-checkbox">-->
<!--              <div class="icon-24px w-embed"><svg width="24" height="24" viewbox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">-->
<!--                <path fill-rule="evenodd" clip-rule="evenodd" d="M15.5 6C15.5 5.44772 15.9477 5 16.5 5H22.5C23.0523 5 23.5 5.44772 23.5 6V12C23.5 12.5523 23.0523 13 22.5 13C21.9477 13 21.5 12.5523 21.5 12V8.4959L14.1552 16.1905C13.9665 16.3882 13.7051 16.5 13.4318 16.5C13.1585 16.5 12.8972 16.3882 12.7085 16.1905L8.65909 11.9483L2.22336 18.6905C1.84202 19.09 1.20902 19.1047 0.809526 18.7234C0.410028 18.342 0.395307 17.709 0.776646 17.3095L7.93574 9.80952C8.12443 9.61184 8.38581 9.5 8.65909 9.5C8.93237 9.5 9.19375 9.61184 9.38245 9.80952L13.4318 14.0517L20.163 7H16.5C15.9477 7 15.5 6.55228 15.5 6Z" fill="#5EB380"></path>-->
<!--              </svg></div>-->
<!--              <h2 class="h4 lr">$t('В тренде')</h2>-->
<!--              <div class="info-block info-block-static">-->
<!--                <div class="hint left">-->
<!--                  <div>$t('Эти деньги перейдут в баланс, когда покупатели получат заказы.')</div>-->
<!--                </div>-->
<!--                <div class="icon-16px w-embed"><svg width="16" height="16" viewbox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">-->
<!--                  <path fill-rule="evenodd" clip-rule="evenodd" d="M8.00004 2.08334C4.73236 2.08334 2.08337 4.73233 2.08337 8.00001C2.08337 11.2677 4.73236 13.9167 8.00004 13.9167C11.2677 13.9167 13.9167 11.2677 13.9167 8.00001C13.9167 4.73233 11.2677 2.08334 8.00004 2.08334ZM0.583374 8.00001C0.583374 3.9039 3.90393 0.583344 8.00004 0.583344C12.0962 0.583344 15.4167 3.9039 15.4167 8.00001C15.4167 12.0961 12.0962 15.4167 8.00004 15.4167C3.90393 15.4167 0.583374 12.0961 0.583374 8.00001ZM7.25004 5.33334C7.25004 4.91913 7.58583 4.58334 8.00004 4.58334H8.00671C8.42092 4.58334 8.75671 4.91913 8.75671 5.33334C8.75671 5.74756 8.42092 6.08334 8.00671 6.08334H8.00004C7.58583 6.08334 7.25004 5.74756 7.25004 5.33334ZM8.00004 7.25001C8.41425 7.25001 8.75004 7.5858 8.75004 8.00001V10.6667C8.75004 11.0809 8.41425 11.4167 8.00004 11.4167C7.58583 11.4167 7.25004 11.0809 7.25004 10.6667V8.00001C7.25004 7.5858 7.58583 7.25001 8.00004 7.25001Z" fill="#0D0D21"></path>-->
<!--                </svg></div>-->
<!--              </div>-->
<!--            </div>-->
<!--          </div>-->
          <SearchProductsContainer/>
        </div>
      </div>
    </div>
    <div class="popups">
     <SearchFilterPopupContainer/>
    </div>
  </div>
</template>

<script>
import SearchFiltersContainer from '@/containers/search/SearchFiltersContainer'
import SearchFilterPopupContainer from '@/containers/search/SearchFilterPopupContainer'
import SearchProductsContainer from '@/containers/search/SearchProductsContainer'
export default {
  components: { SearchProductsContainer, SearchFilterPopupContainer, SearchFiltersContainer },
  layout: 'influencer',
  async validate ({query,store }) {
    const token = store.state.auth.token
    if (query) {
      if (query.sort === undefined){
        query.sort = 'skus__price__min'
      }
      await store.dispatch('search/loadProduct', query)
    }
    return (token !== null)
  },
  asyncData (context) {
    const {store} = context
    const subCategory = store.state.search.curSubCategory

    return{
      subCategory
    }
  },
  head () {
    return {
      title: `${this.$router.currentRoute.query.category !== undefined ? this.$router.currentRoute.query.category : this.$t('Категория')} — ${this.$t('Каталог товаров ShopShop')}`
    }
  }
}
</script>

<style scoped>
.nav-link:hover .icon-20px path{
  fill: #ED6A9A;
}
@media screen and (max-width: 640px) {
  .nav-link .b2{
    display: none;
  }
}
.product-color-item .icon-20px{
  opacity: 0;
}
.product-color-item.current .icon-20px{
  opacity: 1;
}
/* Checkbox styles start */
.cbx {
  -webkit-user-select: none;
  user-select: none;
  cursor: pointer;
  padding: 8px 8px;
  border-radius: 6px;
  overflow: hidden;
  transition: all 0.2s ease;
  margin: 0px;
  font-weight: 400;
  display: flex;
  align-items: center
}
.cbx:not(:last-child) {
}
.cbx:hover {
//background: rgba(0,119,255,0.06);
}
.cbx span {
  float: left;
  vertical-align: middle;
  transform: translate3d(0, 0, 0);
}
.cbx span:first-child {
  position: relative;
  width: 18px;
  height: 18px;
  border-radius: 4px;
  transform: scale(1);
  border: 1px solid #cccfdb;
  transition: all 0.2s ease;
  box-shadow: 0 1px 1px rgba(0,16,75,0.05);
  flex-shrink: 0;
}
.cbx span:first-child svg {
  position: absolute;
  top: 3px;
  left: 2px;
  fill: none;
  stroke: #fff;
  stroke-width: 2;
  stroke-linecap: round;
  stroke-linejoin: round;
  stroke-dasharray: 16px;
  stroke-dashoffset: 16px;
  transition: all 0.3s ease;
  transition-delay: 0.1s;
  transform: translate3d(0, 0, 0);
}
.cbx span:last-child {
  padding-left: 8px;
  line-height: 18px;
}
.cbx:hover span:first-child {
  border-color: #ed6a9a;
}
.inp-cbx:checked + .cbx span:first-child {
  background: #ed6a9a;
  border-color: #ed6a9a;
  animation: wave 0.4s ease;
}
.inp-cbx:checked + .cbx span:first-child svg {
  stroke-dashoffset: 32px;
}
.inline-svg {
  position: absolute;
  width: 0;
  height: 0;
  pointer-events: none;
  user-select: none;
}
@media screen and (max-width: 640px) {
  .cbx {
    width: 100%;
    display: flex;
  }
}
@-moz-keyframes wave {
  50% {
    transform: scale(0.9);
  }
}
@-webkit-keyframes wave {
  50% {
    transform: scale(0.9);
  }
}
@-o-keyframes wave {
  50% {
    transform: scale(0.9);
  }
}
@keyframes wave {
  50% {
    transform: scale(0.9);
  }
}
/* Checkboxes styles ends */
/* Form-item styles start */
.form-item .input-error-msg{
  opacity: 0;
}
.form-item.form-item-error .input-error-msg{
  opacity: 1;
}
.form-item.form-item-error .input{
  border-color: #D45B5B;
}
/* Form-item styles ends */
.radio-option:hover .radio-btn{
  border-color:#FFA1C3;
}
.hint{
  display: none;
  opacity: 0;
}
.info-block:hover .hint{
  display: block;
  animation: hint 200ms ease-out forwards;
}
@keyframes hint {
  to {
    opacity: 1;
    transform: translate(0, 4px);
  }
}
.radio-button-wrap:hover .radio-circle{
  border: 4px solid rgba(47, 53, 59, 1);
}
.radio-button-wrap:hover .radio-label{
  opacity: .8;
}

.text_center{
  text-align: center;
}

.filter{
  z-index: 100;
  flex-direction: row;
}

@media screen and (max-width: 991px) {
  .filter {
    margin-bottom: 20px;
    z-index: 500;
  }
}

@media screen and (max-width: 767px){
  .title-24.title-28-m-vertical.filter{
    flex-direction: column;
    align-items: center;
  }
}
</style>
