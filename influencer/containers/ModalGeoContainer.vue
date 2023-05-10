<template>
  <ModalGeo :city="localCityGeo" :cities="cities" :active-popup="activePopup" @chooseCity="chooseCity"
            @closeGeo="closeGeo">
    <CloseSvg/>
  </ModalGeo>
</template>

<script>
import { mapActions, mapState } from 'vuex'
import ModalGeo from 'common/components/ui/ModalGeo'
import CloseSvg from '@/static/svg/close.svg'
export default {
  name: 'ModalGeoContainer',
  components: {
    ModalGeo,
    CloseSvg
  },
  computed: {
    ...mapState({
      activePopup: state => state.geolocation.geoPopup.active,
      cities: state => state.geolocation.cities,
      localCityGeo: state => state.geolocation.geoPopup.geo.city,
    })
  },
  async created() {
    await this.handleGeo()
  },
  methods: {
    ...mapActions({
      handleCity: 'geolocation/handleCity',
      handleGeo: 'geolocation/handleGeo',
      handleGeoPopup: 'geolocation/handleGeoPopup',
      handleCountries: 'geolocation/handleCountries',
    }),
    closeGeo () {
      this.handleGeoPopup(false)
    },
    chooseCity (city) {
      this.handleCity({ city })
    },
  }
}
</script>

<style scoped>

</style>
