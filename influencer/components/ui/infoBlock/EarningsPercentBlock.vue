<template>
<!--  Todo доделать-->
  <div v-if='false' class="form-item">
    <div v-if='product.category !== undefined && product.category.influencer_earnings_percent !== undefined'>{{ $t('Заработаете') }} {{product.category.influencer_earnings_percent}}%
      {{ $t('за товар') }}</div>
  </div>
</template>

<script>
export default {
  name: 'EarningsPercentBlock',
  props: {
    product: {
      type: Object,
      default: () => {return {}}
    }
  }
}
</script>

<style scoped>

</style>
