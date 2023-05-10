<template>
<Error404 :profile-link='profileLink' :footer-link='"/"'/>
</template>

<script>
import {mapGetters} from 'vuex'
import Error404 from 'common/components/error/Error404'
export default {
  name: 'Error404Container',
  components: {
    Error404
  },
  computed: {
    profileLink (){
      if (this.isAuth) {
        return '/'
      } else {
        return ''
      }
    },
    ...mapGetters({
      isAuth: 'auth/isAuthenticated'
    })
  }
}
</script>

<style scoped>

</style>
