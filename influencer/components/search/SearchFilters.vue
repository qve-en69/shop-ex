<template>
  <div class="buttons-wrap-hor nm">
    <button type='button' data-w-id="a14acda3-27d3-526e-955a-4bc017256b78"
            class="button-secondary button-secondary-sm w-inline-block"
            @click='clickFilter'>
      {{ $t('Фильтр') }} <span v-if='countFilters > 0' class="badge badge-static">{{countFilters}}</span>
    </button>
    <div v-click-outside="closeSort" data-hover="false" data-delay="0" class="select w-dropdown" @click="clickSort">
      <div class="select-toggle w-dropdown-toggle">
        <div>{{ activeStatus.value }}</div>
        <div class="icon-16px icon-16px-ml4 w-embed">
          <ArrowDownSvg/>
        </div>
      </div>
      <nav class="select-list w-dropdown-list" :class="{'w--open':activePopup}">
        <button v-for="status in sortStatuses" :key="status.name" type="button" :class="{'drop-link-current': status.active}"
                class="drop-link w-dropdown-link w_button" @click="chooseStatus(status.name)">{{ status.value }}</button>
      </nav>
    </div>
  </div>
</template>

<script>
import ClickOutside from 'vue-click-outside'
import ArrowDownSvg from '@/static/svg/arrowDown.svg'
export default {
  name: 'SearchFilters',
  components: {
    ArrowDownSvg
  },
  directives: {
    ClickOutside
  },
  props:{
    sortStatuses: {
      type: Array,
      default: () => {
        return []
      }
    },
    activeStatus: {
      type: Object,
      default: () => {
        return {}
      }
    },
    activePopup: {
      type: Boolean,
      default: false
    },
    countFilters: {
      type: Number,
      default: 0
    }
  },
  emits: {
    chooseStatus: null,
    clickSort: null,
    closeSort: null,
    clickFilter: null
  },
  methods: {
    clickSort () {
      this.$emit('clickSort')
    },
    chooseStatus (status) {
      this.$emit('chooseStatus', status)
    },
    closeSort () {
      this.$emit('closeSort')
    },
    clickFilter () {
      this.$emit('clickFilter')
    }
  }
}
</script>

<style scoped>
.w_button{
  background: none;
  border: 0;
  outline: 0;
}

.w_button:focus{
  outline: 0;
}
</style>
