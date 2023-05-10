<template>
<ClipperModal :active='active' :image='image' @clickClose='clickClose' @clickCloseCheck='clickCloseCheck'/>
</template>

<script>
import { mapActions, mapState } from 'vuex'
import ClipperModal from '../../components/ui/clipperImage/ClipperModal'
export default {
  name: 'ClipperModalContainer',
  components: { ClipperModal },
  computed: {
    ...mapState({
      active: state => state.clipperImage.active,
      activeName: state => state.clipperImage.activeName,
      activeNameFile: state => state.clipperImage.activeNameFile,
      imageUrl: state => state.clipperImage.imageUrl
    }),
    image () {
      if (this.activeName !== 'product'){
        return this.imageUrl[this.activeName]
      } else {
        return this.imageUrl?.product.filter(item => item.nameFile === this.activeNameFile)[0].imageUrl
      }
    }
  },
  methods: {
    ...mapActions({
      handleActive: 'clipperImage/handleActiveClipper',
      handleCoordinate: 'clipperImage/handleCoordinates',
      handleImage: 'clipperImage/handleImage',
      handleCoordinatesProduct: 'clipperImage/handleCoordinatesProduct',
      handleImages: 'clipperImage/handleImages'
    }),
    clickClose () {
      this.handleActive(false)
    },
    clickCloseCheck (payload) {
      this.handleActive(false)
      if (this.activeName !== 'product') {
        this.handleCoordinate({coordinate: payload.coordinate, name: this.activeName})
        this.handleImage({imageUrl: payload.imageUrl, name: this.activeName})
      } else {
        this.handleCoordinatesProduct({coordinate: payload.coordinate, name: this.activeName, nameFile: this.activeNameFile})
        this.handleImages({imageUrl: payload.imageUrl, name:this.activeName, nameFile: this.activeNameFile})
      }
    }
  }
}
</script>

<style scoped>

</style>
