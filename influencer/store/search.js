export const state = () => ({
  sortStatuses: [
    {
      name: 'skus__price__min',
      value: 'Сначала дешевые',
      active: true
    },
    {
      name: '-skus__price__min',
      value: 'Сначала дорогие',
      active: false
    },
  ],
  activeStatus: {
    name: 'skus__price__min',
    value: 'Сначала дешевые',
    active: true
  },
  activePopup: false,
  activeFilterPopup: false,
  filters: {
    fromPrice: '',
    toPrice: ''
  },
  categories: [],
  subCategories: [],
  search: {
    text: '',
    searchResult: null
  },
  activeQuery: {},
  filterProducts: null,
  countFilters: 0,
  curCategory: null,
  curSubCategory: ''
})

export const mutations = {
  setCategories (state, payload) {
    state.categories = payload
  },
  setSubCategories (state, payload) {
    state.subCategories = payload
  },
  setSearchText (state, payload) {
    state.search.text = payload
  },
  setSearchResults (state, payload) {
    state.search.searchResult = payload
  },
  setActiveStatus (state, payload) {
    const activeStatus = state.sortStatuses.filter(item => item.name === payload)
    if (activeStatus.length > 0) {
      state.sortStatuses.forEach(status => {
        status.active = status.name === payload;
      })
      state.activeStatus = activeStatus[0]
    }
  },
  setActivePopup (state) {
    state.activePopup = state.activePopup !== true
  },
  setClearSort (state) {
    state.activePopup = false
  },
  setActiveFilterPopup (state, status) {
    state.activeFilterPopup = status
  },
  setFromPrice (state, payload) {
    state.filters.fromPrice = payload.value
  },
  setToPrice (state, payload) {
    state.filters.toPrice = payload.value
  },
  setQuery (state, payload) {
    state.activeQuery[payload.key] = payload.value
  },
  clearActiveQuery (state) {
    state.activeQuery = {}
    state.filters.toPrice = ''
    state.filters.fromPrice = ''
    state.countFilters = 0
  },
  deleteQuery (state, payload) {
    if (state.activeQuery[payload]) {
      delete state.activeQuery[payload]
    }
  },
  setSearchProducts (state, payload) {
    state.filterProducts = payload
  },
  setCountFilters (state, payload) {
    state.countFilters += payload
  },
  setCurCategory (state, payload) {
    state.curCategory = payload
  },
  setSubCurCategory (state, payload) {
    state.curSubCategory = payload
  }
}

export const actions = {
  async loadProduct (context, query) {
    context.commit('clearActiveQuery')
    context.commit('setSubCurCategory', query.category)
    Object.entries(query).forEach(([key, value]) => {
      if (key === 'fromPrice' || key === 'price_min') {
        context.commit('setFromPrice', {value})
        context.commit('setQuery', {key: 'price_min', value})
        context.commit('setCountFilters', 1)
      } else if (key === 'toPrice' || key === 'price_max') {
        context.commit('setToPrice', {value})
        context.commit('setQuery', {key: 'price_max', value})
        context.commit('setCountFilters', 1)
      } else {
        context.commit('setQuery', {key, value})
      }
    })
    try {
      const response = await this.$api.influencer.get('product', context.state.activeQuery)
      context.commit('setSearchProducts', response)
    } catch (e) {
      console.error(e)
    }
  },
  async handleCategories (context) {
    try {
      const response = await this.$api.public.get('product-category')
      context.commit('setCategories', response)
    } catch (e) {
      console.error(e)
    }
  },
  async handleCategory (context, id) {
    try {
      const response = await this.$api.public.get(`product-category-recursive/${id}`)
      if (response.length === 0) {
        const resp = await this.$api.public.get(`product-category/${id}/`)
        await this.$router.push(`/search?category=${resp.name}`)
      } else {
        await this.$router.push(`/category/${id}`)
      }
    } catch (e) {
     console.error(e)
    }
  },
  async handleSubCurCategory (context, id) {
    try {
      const response = await this.$api.public.get(`product-category/${id}`)
      context.commit('setSubCurCategory', response)
    } catch (e) {console.error(e)}
  },
  async handleSubCategory (context, id) {
    try {
      const response = await this.$api.public.get(`product-category/${id}`)
      context.commit('setCurCategory', response)
    } catch (e) {console.error(e)}
    try {
      const response = await this.$api.public.get(`product-category-recursive/${id}`)
        const data = []
        const mainCatalog = response.filter(item => item.parent_category_id === parseInt(id))
        mainCatalog.forEach(item => {
          const mainData = {
            category: item,
            items: []
          }
          mainData.items = response.filter(subCategory => subCategory.parent_category_id === parseInt(item.id))
          data.push(mainData)
        })
        context.commit('setSubCategories', data)
    } catch (e) {
      console.error(e)
    }
  },
  async handleSearch (context,payload) {
    try {
      const response = await this.$api.influencer.get('product/', {search: payload})
      if (payload.length > 0) {
        await context.commit('setSearchResults', response)
        await context.commit('setSearchText', payload)
      }
    } catch (e) {
      console.error(e)
    }
  },
  handleActiveStatus (context, payload) {
    context.commit('setActiveStatus', payload)
    if (!this.$router.currentRoute.query.sort || this.$router.currentRoute.query.sort !== payload) {
      context.commit('setQuery', {key: 'sort', value:payload})
      context.dispatch('handleQuery')
    }
  },
  handleActivatePopup (context) {
    context.commit('setActivePopup')
  },
  clearSort (context) {
    context.commit('setClearSort')
  },
  handleActiveFilterPopup (context, status) {
    context.commit('setActiveFilterPopup', status)
  },
  handlePriceFilter (context, payload) {
    if (payload.type === 'fromPrice') {
      context.commit('setFromPrice', payload)
    } else {
      context.commit('setToPrice', payload)
    }
  },
  handleSubmitFilter (context) {
    if (context.state.filters.fromPrice !== '') {
      context.commit('setQuery', {key: 'price_min', value:context.state.filters.fromPrice})
    } else {
      context.commit('deleteQuery', 'price_min')
    }
    if (context.state.filters.toPrice !== '') {
        context.commit('setQuery', {key: 'price_max', value:context.state.filters.toPrice})
    } else {
      context.commit('deleteQuery', 'price_max')
    }
      context.dispatch('handleQuery')
      context.commit('setActiveFilterPopup', false)
  },
   async handleQuery (context) {
    let queries = ''
    Object.entries(context.state.activeQuery).forEach(([key,value], index) => {
      queries += `${key}=${value}`
      if (index !== Object.keys(context.state.activeQuery).length - 1) {
        queries += '&'
      }
    })
    await context.dispatch('loadProduct', context.state.activeQuery)
    await this.$router.push(`${this.$router.currentRoute.path}?${queries}`)
  },
  handleClearFilter (context) {
    context.commit('setFromPrice', {value: ''})
    context.commit('setToPrice', {value: ''})
    context.commit('deleteQuery', 'price_min')
    context.commit('deleteQuery', 'price_max')
    context.dispatch('handleQuery')
    context.commit('setActiveFilterPopup', false)
  }
}
