<template>
  <div class="categories-grid">
    <div v-for='subCategory in subCategories' :key='subCategory.category.id' class="sub-category-item">
      <nuxt-link :to='`/search/?category=${subCategory.category.name}`' class="sub-category"><strong>{{subCategory.category.name}}</strong></nuxt-link>
      <nuxt-link v-for='item in subCategory.items' :key='item.id' :to='`/search/?category=${item.name}`' class="sub-category">{{item.name}}</nuxt-link>
      <a href="#" class="link">{{ $t('Еще') }}</a>
    </div>
  </div>
</template>

<script>
export default {
  name: 'SubCategory',
  props: {
    subCategories: {
      type: Array,
      default: () => {
        return []
      }
    }
  }
}
</script>

<style scoped>

</style>
