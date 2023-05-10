<template>
<Error :active='active' :text-error='messageError' @clickUnactive='handleActiveError(false)'/>
</template>

<script>
import { mapActions, mapState } from 'vuex'
import Error from 'common/components/error/Error'
export default {
  name: 'ErrorContainer',
  components: {
    Error
  },
  computed: {
    ...mapState({
      active: state => state.error.active,
      messageError: state => state.error.messageError
    })
  },
  methods: {
    ...mapActions({
      handleActiveError: 'error/handleActiveError'
    })
  }
}
</script>

<style scoped>

</style>
