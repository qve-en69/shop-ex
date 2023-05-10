<template>
  <div v-click-outside="closeProfile" data-hover="false" data-delay="0" class="profile-drop w-dropdown" @click="clickProfile">
    <div class="nav-link w-dropdown-toggle">
      <div class="icon-20px icon-20px-mb4 w-embed"><svg width="21" height="20" viewbox="0 0 21 20" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path fill-rule="evenodd" clip-rule="evenodd" d="M10.5 3.375C9.14229 3.375 8.04166 4.47563 8.04166 5.83333C8.04166 7.19103 9.14229 8.29167 10.5 8.29167C11.8577 8.29167 12.9583 7.19103 12.9583 5.83333C12.9583 4.47563 11.8577 3.375 10.5 3.375ZM6.29166 5.83333C6.29166 3.50914 8.1758 1.625 10.5 1.625C12.8242 1.625 14.7083 3.50913 14.7083 5.83333C14.7083 8.15753 12.8242 10.0417 10.5 10.0417C8.1758 10.0417 6.29166 8.15753 6.29166 5.83333ZM4.19092 12.8576C4.98014 12.0684 6.05054 11.625 7.16666 11.625H13.8333C14.9494 11.625 16.0199 12.0684 16.8091 12.8576C17.5983 13.6468 18.0417 14.7172 18.0417 15.8333V17.5C18.0417 17.9832 17.6499 18.375 17.1667 18.375C16.6834 18.375 16.2917 17.9832 16.2917 17.5V15.8333C16.2917 15.1813 16.0327 14.5561 15.5716 14.095C15.1106 13.634 14.4853 13.375 13.8333 13.375H7.16666C6.51467 13.375 5.88938 13.634 5.42836 14.095C4.96733 14.5561 4.70833 15.1813 4.70833 15.8333V17.5C4.70833 17.9832 4.31658 18.375 3.83333 18.375C3.35008 18.375 2.95833 17.9832 2.95833 17.5V15.8333C2.95833 14.7172 3.4017 13.6468 4.19092 12.8576Z" fill="black"></path>
      </svg></div>
      <div class="b2">{{ $t('Профиль') }}</div>
    </div>
    <AccountPopup :active="activeAccount" :city="localCityGeo" @openGeo="clickGeo"/>
  </div>
</template>

<script>
import {mapGetters,mapState,mapActions} from 'vuex'
import ClickOutside from 'vue-click-outside'
import AccountPopup from '@/components/AccountPopup'
export default {
  name: 'NavAccountContainer',
  directives: {
    ClickOutside
  },
  components: {
    AccountPopup
  },
  computed: {
    ...mapState({
      activePopup: state => state.geolocation.geoPopup.active,
      cities: state => state.geolocation.cities,
      activeAccount: state => state.accountPopup.activePopup,
      localCityGeo: state => state.geolocation.geoPopup.geo.city
    }),
    ...mapGetters({
      isAuthenticate: 'auth/isAuthenticated'
    })
  },
  methods: {
    ...mapActions({
      closeProfile: 'accountPopup/clearAccount',
      handleProfile: 'accountPopup/handleAccountPopup',
      openLogin: 'loginModal/activateLogin',
      handleGeoPopup: 'geolocation/handleGeoPopup'
    }),
    clickProfile () {
      if (this.isAuthenticate) {
        this.handleProfile()
      } else {
        this.openLogin('login')
      }
    },
    clickGeo () {
      this.handleGeoPopup(true)
    }
  }
}
</script>

<style scoped>

</style>
