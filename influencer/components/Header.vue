<template>
  <div data-collapse="medium" data-animation="default" data-duration="400" data-easing="ease" data-easing2="ease" role="banner" class="header w-nav">
  <div class="header-container">
    <div class="part m-part-center">
      <Logo :url='logoUrl'/>
      <div class="ondly-desc">
        <a data-w-id="a2e35423-1d10-253c-d40e-015918b96502" href="#" class="button-secondary button-secondary-sm w-inline-block"
           @click.prevent="clickGeo">
          <div class="icon-16px icon-16px-mr4 w-embed">
            <LocationSvg/>
          </div>
          <div v-if="localCityGeo">{{ localCityGeo }}</div>
          <div v-else>{{ $t('Не определёно') }}</div>
        </a>
      </div>
    </div>
    <div class="part">
      <div class="nav-menu m">
        <a href='#' class="nav-link w-inline-block" @click.prevent='clickSearch'>
          <div class="icon-20px icon-20px-mb4 w-embed"><svg width="24" height="24" viewbox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path fill-rule="evenodd" clip-rule="evenodd" d="M11 4C7.13401 4 4 7.13401 4 11C4 14.866 7.13401 18 11 18C12.8859 18 14.5977 17.2542 15.8564 16.0414C15.8827 16.0072 15.9115 15.9742 15.9429 15.9429C15.9742 15.9115 16.0072 15.8827 16.0414 15.8564C17.2542 14.5977 18 12.8859 18 11C18 7.13401 14.866 4 11 4ZM18.0319 16.6177C19.2635 15.078 20 13.125 20 11C20 6.02944 15.9706 2 11 2C6.02944 2 2 6.02944 2 11C2 15.9706 6.02944 20 11 20C13.125 20 15.078 19.2635 16.6177 18.0319L20.2929 21.7071C20.6834 22.0976 21.3166 22.0976 21.7071 21.7071C22.0976 21.3166 22.0976 20.6834 21.7071 20.2929L18.0319 16.6177Z" fill="#0D0D21"></path>
          </svg></div>
          <div class="b2">{{ $t('Поиск') }}</div>
        </a>
        <a href='#' class="nav-link w-inline-block" @click.prevent='clickShop'>
          <div class="icon-20px icon-20px-mb4 w-embed"><svg width="24" height="24" viewbox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path fill-rule="evenodd" clip-rule="evenodd" d="M11.3861 1.21068C11.7472 0.929815 12.2528 0.929815 12.6139 1.21068L21.6139 8.21068C21.8575 8.40013 22 8.69144 22 9.00003V20C22 20.7957 21.6839 21.5587 21.1213 22.1213C20.5587 22.684 19.7957 23 19 23H5C4.20435 23 3.44129 22.684 2.87868 22.1213C2.31607 21.5587 2 20.7957 2 20V9.00003C2 8.69144 2.14247 8.40013 2.38606 8.21068L11.3861 1.21068ZM10 21H14V13H10V21ZM16 21V12C16 11.4477 15.5523 11 15 11H9C8.44772 11 8 11.4477 8 12V21H5C4.73478 21 4.48043 20.8947 4.29289 20.7071C4.10536 20.5196 4 20.2652 4 20V9.48911L12 3.26689L20 9.48911V20C20 20.2652 19.8946 20.5196 19.7071 20.7071C19.5196 20.8947 19.2652 21 19 21H16Z" fill="#0D0D21"></path>
          </svg></div>
          <div class="b2">{{ $t('Магазин') }}</div>
        </a>
        <a v-if='false' href="#" class="nav-link w-inline-block">
          <div class="icon-20px icon-20px-mb4 w-embed"><svg width="24" height="24" viewbox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M12 6C7.03 6 2 7.546 2 10.5V14.5C2 17.454 7.03 19 12 19C16.97 19 22 17.454 22 14.5V10.5C22 7.546 16.97 6 12 6ZM4 14.5V13.303C4.63334 13.6617 5.30399 13.9501 6 14.163V16.044C4.688 15.53 4 14.918 4 14.5ZM16 14.648V16.619C15.133 16.798 14.133 16.929 13 16.977V14.977C14.0064 14.9369 15.0088 14.827 16 14.648V14.648ZM11 16.978C9.99201 16.9394 8.98877 16.8197 8 16.62V14.649C8.959 14.823 9.972 14.936 11 14.979V16.978ZM18 16.044V14.163C18.6962 13.9505 19.3669 13.6621 20 13.303V14.5C20 14.918 19.313 15.53 18 16.044ZM12 13C6.823 13 4 11.349 4 10.5C4 9.651 6.823 8 12 8C17.177 8 20 9.651 20 10.5C20 11.349 17.177 13 12 13Z" fill="#0D0D21"></path>
          </svg></div>
          <div class="b2">{{ $t('Продажи') }}</div>
        </a>
        <a v-if='false' href="#" class="nav-link w-inline-block">
          <div class="icon-20px icon-20px-mb4 w-embed"><svg width="20" height="20" viewbox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path fill-rule="evenodd" clip-rule="evenodd" d="M0.375114 1.25024C0.375114 0.766995 0.766865 0.375244 1.25011 0.375244H4.58345C5.01039 0.375244 5.375 0.68337 5.4462 1.10434L5.95705 4.12504H18.7501C19.002 4.12504 19.2417 4.2336 19.4078 4.42294C19.574 4.61228 19.6504 4.86404 19.6177 5.1138L18.7009 12.1055C18.6984 12.1245 18.6953 12.1434 18.6916 12.1622C18.5754 12.7473 18.2571 13.2728 17.7924 13.6469C17.3301 14.019 16.7523 14.2176 16.1592 14.2084H8.07421C7.48104 14.2176 6.90322 14.019 6.44095 13.6469C5.97629 13.2728 5.65799 12.7473 5.54178 12.1622C5.54016 12.154 5.53865 12.1458 5.53726 12.1376L4.35762 5.16233C4.35572 5.15216 4.35398 5.14192 4.35243 5.13162L3.844 2.12524H1.25011C0.766865 2.12524 0.375114 1.73349 0.375114 1.25024ZM6.25301 5.87504L7.2603 11.8312C7.29809 12.0095 7.39623 12.1693 7.53832 12.2837C7.68305 12.4002 7.86415 12.4621 8.04992 12.4585L8.06668 12.4584H16.1667L16.1834 12.4585C16.3692 12.4621 16.5503 12.4002 16.695 12.2837C16.8337 12.1721 16.9305 12.0172 16.9702 11.8442L17.7529 5.87504H6.25301ZM7.50001 17.5417C7.52302 17.5417 7.54168 17.5231 7.54168 17.5C7.54168 17.477 7.52303 17.4584 7.50001 17.4584C7.477 17.4584 7.45835 17.477 7.45835 17.5C7.45835 17.5231 7.477 17.5417 7.50001 17.5417ZM5.79168 17.5C5.79168 16.5566 6.55653 15.7917 7.50001 15.7917C8.4435 15.7917 9.20835 16.5566 9.20835 17.5C9.20835 18.4435 8.4435 19.2084 7.50001 19.2084C6.55653 19.2084 5.79168 18.4435 5.79168 17.5ZM16.6667 17.5417C16.6897 17.5417 16.7083 17.5231 16.7083 17.5C16.7083 17.477 16.6897 17.4584 16.6667 17.4584C16.6437 17.4584 16.625 17.477 16.625 17.5C16.625 17.5231 16.6437 17.5417 16.6667 17.5417ZM14.9583 17.5C14.9583 16.5566 15.7232 15.7917 16.6667 15.7917C17.6102 15.7917 18.375 16.5566 18.375 17.5C18.375 18.4435 17.6102 19.2084 16.6667 19.2084C15.7232 19.2084 14.9583 18.4435 14.9583 17.5Z" fill="black"></path>
          </svg></div>
          <div class="b2">{{ $t('Корзина') }}</div>
          <div class="badge">12</div>
        </a>
       <NavAccountContainer />
      </div>
    </div>
  </div>
    <ModalGeoContainer/>
  </div>
</template>

<script>
import { mapActions, mapGetters, mapState } from 'vuex'
import Logo from 'common/components/ui/Logo'
import LocationSvg from '~/static/svg/location.svg'
import ModalGeoContainer from '~/containers/ModalGeoContainer'
import NavAccountContainer from '@/containers/NavAccountContainer'
export default {
  name: 'Header',
  components: {
    NavAccountContainer,
    ModalGeoContainer,
    Logo,
    LocationSvg
  },
  computed:{
    ...mapState({
      localCityGeo: state => state.geolocation.geoPopup.geo.city,
      externalId: state => state.shop.externalId
    }),
    ...mapGetters({
      isAuthenticate: 'auth/isAuthenticated'
    }),
    logoUrl () {
      if (this.externalId !== null && this.externalId !== undefined) {
        return `/s/${this.externalId}`
      } else {
        return '/'
      }
    }
  },
  methods: {
    ...mapActions({
      handleGeoPopup: 'geolocation/handleGeoPopup',
      openLogin: 'loginModal/activateLogin',
      handleActive: 'createShop/handleActive'
    }),
    clickGeo () {
      this.handleGeoPopup(true)
    },
    clickSearch () {
      if (this.isAuthenticate) {
        if (this.externalId !== null) {
          this.$router.push('/catalog')
        } else {
          this.handleActive('createShop')
        }
      } else {
        this.openLogin('login')
      }
    },
    clickShop () {
      if (this.isAuthenticate) {
        if (this.externalId !== null) {
          this.$router.push(`/s/${this.externalId}`)
        } else {
         this.$router.push('/')
        }
      } else {
        this.openLogin('login')
      }
    }
  }
}
</script>

<style scoped>
.nav-link:hover .icon-20px path {
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

.pad_20{
  padding: 20px 0;
}
</style>
