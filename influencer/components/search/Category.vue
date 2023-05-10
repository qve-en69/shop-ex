<template>
  <div class="categories-grid">
    <a v-for='category in categories' :key='category.id' href='#'
        class="category-item w-inline-block"
    @click.prevent='clickCategory(category.id)'>
      <div class="category-title">
        <div class="catalog-emoji">💻</div>
        <div>{{category.name}}</div>
      </div>
    </a>
  </div>
</template>

<script>
export default {
  name: 'Category',
  props: {
    categories: {
      type: Array,
      default: () => {
        return []
      }
    }
  },
  emits: {
    clickCategory: null
  },
  methods: {
    clickCategory (id) {
      this.$emit('clickCategory', id)
    }
  }
}
</script>

<style scoped>

</style>
