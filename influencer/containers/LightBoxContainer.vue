<template>
  <LightBox :active='active' :image='image' @clickClose='closeLightBox'/>
</template>

<script>
import { mapActions, mapState } from 'vuex'
import LightBox from 'common/components/ui/LightBox'
export default {
  name: 'LightBoxContainer',
  components: { LightBox },
  computed: {
    ...mapState({
      active: state => state.lightBox.active,
      image: state => state.lightBox.image
    })
  },
  methods: {
    ...mapActions({
      closeLightBox: 'lightBox/handleDeactive'
    })
  }
}
</script>

<style scoped>

</style>
