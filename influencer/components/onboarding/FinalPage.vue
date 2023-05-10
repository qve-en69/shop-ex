<template>
  <div class="line">
    <div class="buttons-wrap-hor fixed-on-mobile one-row">
      <button type='button' class="button-primary button-primary-big w-inline-block" @click='shareShop'>
        <div>{{ $t('Поделить магазином') }}</div>
      </button>
      <button type='button' class="button-secondary button-secondary-big w-inline-block" @click='clickShop'>
        <div>{{ $t('Перейти в магазин') }}</div>
      </button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'FinalPage',
  emits: {
    clickShop: null,
    shareShop: null
  },
  methods: {
    clickShop () {
      this.$emit('clickShop')
    },
    shareShop () {
      this.$emit('shareShop')
    }
  }
}
</script>

<style scoped>

</style>
