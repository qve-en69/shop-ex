<template>
  <div class="bread-crumbs-wrap">
    <nuxt-link :to='"/catalog"' class="bread-crumb-link">{{ $t('Каталог') }}</nuxt-link>
    <div class="dot"></div>
    <nuxt-link :to='`/category/${category.id}`' class="bread-crumb-link">{{category.name}}</nuxt-link>
  </div>
</template>

<script>
export default {
  name: 'SubCategoryUrl',
  props: {
    category: {
      type: Object,
      default: () => {
        return {}
      }
    }
  }
}
</script>

<style scoped>

</style>
