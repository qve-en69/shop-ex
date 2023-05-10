<template>
  <nav class="align-right w-dropdown-list" :class="[{'select-list': active}, {'w--open': active}]">
    <nuxt-link :to='"/influencer/profile"' class="drop-link w-dropdown-link">{{ $t('Аккаунт') }}</nuxt-link>
    <button type='button' class="drop-link w-dropdown-link" @click="openSupportChat">{{ $t('Поддержка') }} </button>
    <div class="only-mobile">
      <a href="#" class="button-secondary button-secondary-sm w-inline-block" @click.prevent="clickGeo">
        <div class="icon-16px icon-16px-mr4 w-embed">
          <LocationSvg/>
        </div>
        <div v-if="city !== ''">{{ city }}</div>
        <div v-else>{{ $t('Не определёно') }}</div>
      </a>
    </div>
  </nav>
</template>

<script>
import {openSupportChat} from 'common/utils/integrations';
import LocationSvg from '@/static/svg/location.svg'
export default {
  name: 'AccountPopup',
  components: {
    LocationSvg
  },
  props: {
    active: {
      type: Boolean,
      default: false
    },
    city: {
      type: String,
      default: ''
    }
  },
  emits: {
    openGeo: null
  },
  methods: {
    openSupportChat,
    clickGeo () {
      this.$emit('openGeo')
    }
  }
}
</script>

<style scoped>

</style>
