<template>
  <div class="w-form">
    <form id="email-form-2" name="email-form-2" data-name="Email Form 2">
      <div data-hover="false" data-delay="0" class="search-input-wrap w-dropdown">
        <div class="input-toggle-wrap w-dropdown-toggle">
          <nuxt-link :to='`/search/?search=${searchText}`' class="icon-16px icon-16px-absolute w-embed icon-24px">
            <svg width="24" height="24" viewbox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path fill-rule="evenodd" clip-rule="evenodd" d="M11 4C7.13401 4 4 7.13401 4 11C4 14.866 7.13401 18 11 18C12.8859 18 14.5977 17.2542 15.8564 16.0414C15.8827 16.0072 15.9115 15.9742 15.9429 15.9429C15.9742 15.9115 16.0072 15.8827 16.0414 15.8564C17.2542 14.5977 18 12.8859 18 11C18 7.13401 14.866 4 11 4ZM18.0319 16.6177C19.2635 15.078 20 13.125 20 11C20 6.02944 15.9706 2 11 2C6.02944 2 2 6.02944 2 11C2 15.9706 6.02944 20 11 20C13.125 20 15.078 19.2635 16.6177 18.0319L20.2929 21.7071C20.6834 22.0976 21.3166 22.0976 21.7071 21.7071C22.0976 21.3166 22.0976 20.6834 21.7071 20.2929L18.0319 16.6177Z" fill="#9E9EA6"></path>
          </svg>
          </nuxt-link>
          <input id="field-2" :value='searchText' type="text" class="input w-input" maxlength="256"
                 name="field-2"
                 data-name="Field 2"
                 :placeholder="`${$t('Введите название товара...')}`"
                 required=""
          @input='setSearchText'
          @click.stop='activateSearch(true)'>
        </div>
        <nav class="select-list w-dropdown-list w__open" :class="{'w--open':searchText.length > 0}">
          <div v-if='searchResult && searchResult.results.length > 0'>
            <nuxt-link :to='`/product/${item.id}`' v-for='item in searchResult.results' :key='item.id' class="drop-link w-dropdown-link">{{shortName(item.name)}}</nuxt-link>
          </div>
          <div v-else>
            <div class="drop-link w-dropdown-link">{{ $t('Ничего не найдено') }}</div>
          </div>
        </nav>
      </div>
    </form>
  </div>
</template>

<script>
import {debounce} from 'lodash'
export default {
  name: 'Search',
  props: {
    searchResult: {
      type: Object,
      default: () => {
        return {}
      }
    }
  },
  emits: {
    inputSearch: null,
    activateSearch: null
  },
  data: () => ({
    searchText: ''
  }),
  methods: {
    setSearchText: debounce(function (e) {
      this.searchText = e.target.value
      this.$emit('inputSearch', e.target.value)
    }, 1000),
    shortName (value) {
        return value
    },
    activateSearch(status) {
      this.$emit('activateSearch',status)
    }
  }
}
</script>

<style scoped>
.w__open {
  width: 100%;
  overflow-y: auto;
  overflow-x: hidden;
  max-height: 300px;
}
</style>
