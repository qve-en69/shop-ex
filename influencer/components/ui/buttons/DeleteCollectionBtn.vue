<template>
  <button type='button' class="button-teritary button-teritary-sm w-inline-block" @click='$emit("deleteCollection")'>
    <span class="text-red">{{ $t('Удалить коллекцию') }}</span>
  </button>
</template>

<script>
export default {
  name: 'DeleteCollectionBtn',
  emits: {
    deleteCollection: null
  }
}
</script>

<style scoped>

</style>
