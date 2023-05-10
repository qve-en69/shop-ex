<template>
  <div data-collapse="medium" data-animation="default" data-duration="400" data-easing="ease" data-easing2="ease" role="banner" class="header w-nav">
    <div class="header-container pad_20">
      <div class="part m-part-center">
        <Logo :url='logoUrl'/>
      </div>
    </div>
  </div>
</template>

<script>
import Logo from 'common/components/ui/Logo'
export default {
  name: 'HeaderOnBoard',
  components: {
    Logo
  },
  computed: {
    logoUrl () {
      if (this.externalId !== null && this.externalId !== undefined) {
        return `/s/${this.externalId}`
      } else {
        return '/'
      }
    }
  }
}
</script>

<style scoped>
.pad_20{
  padding: 15px 0;
}
</style>
