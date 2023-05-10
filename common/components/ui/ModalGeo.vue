<template>
  <div class="popup popup-city" :class="{'activePopup': activePopup}" @click.stop="clickPopupBackground">
    <div class="popup-flex scroll">
      <div data-w-id="f3f293ce-a27a-4a9b-751b-89e07bf8cb97" class="close-popup"></div>
      <div class="window">
        <div class="form-block-popup w-form">
          <form id="email-form" name="email-form" data-name="Email Form">
            <div class="title-12">
              <h4 class="h4">{{ $t('Где вы находитесь ?') }}</h4>
            </div>
            <div class="form-item">
              <div v-if="inputCity.length === 0" class="city-pick current-city">{{ $t('Ваш город') }}: {{ city }}<br></div>
              <div class="input-wrap"><input id="name-3" v-model="inputCity" type="text" class="input w-input" maxlength="256" name="name-3" data-name="Name 3" :placeholder="`${$t('Введите город')}`"></div>
              <div v-if="cities.length === 0" class="input-error-msg">Error message<br></div>
            </div>
            <div class="city-grid">
                <a v-for="item in viewCities" :key="item.name" href="#" :class="{'current': item.name === inputCity.trim()}" class="city-pick" @click.prevent="chooseCity(item.name)">{{item.name}}</a>
              <div v-if="viewCities.length === 0" class="city-pick current">{{ $t('Ничего не найдено') }}</div>
            </div>
            <div class="button-wrap">
              <a href="#" class="button-primary button-primary-big w-inline-block" @click.prevent="chooseCity('')">
                <div>{{ $t('Определить местоположение') }}</div>
              </a>
            </div>
          </form>
          <div class="w-form-done">
            <div>Thank you! Your submission has been received!</div>
          </div>
          <div class="w-form-fail">
            <div>Oops! Something went wrong while submitting the form.</div>
          </div>
        </div>
        <a href="#" data-w-id="f3f293ce-a27a-4a9b-751b-89e07bf8cbac" class="close-2 w-inline-block" @click.prevent="closeGeo">
          <div class="icon-24px w-embed">
            <slot></slot>
          </div>
        </a>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ModalGeo',
  props: {
    activePopup: {
      type: Boolean,
      default: false
    },
    city: {
      type: String,
      default: ''
    },
    cities:{
      type: Array,
      default: () => {
        return []
      }
    }
  },
  emits: {
    closeGeo: null,
    chooseCity: null,
  },
  data: () => ({
    inputCity: ''
  }),
  computed: {
    viewCities () {
      if (this.inputCity.length > 0){
        return this.cities.filter(city => city.name.includes(this.inputCity.trim()))
      }

      return this.cities
    }
  },
  mounted() {
    if (this.city === null) {
      this.inputCity = ''
    } else {
      this.inputCity = this.city
    }
  },
  methods: {
    closeGeo () {
      this.$emit('closeGeo')
    },
    chooseCity (value) {
      this.inputCity = value
      this.$emit('chooseCity', value)
    },
    clickPopupBackground(e) {
      if (e.target.classList[0] === 'close-popup') {
        this.$emit('closeGeo')
      }
    }
  }
}
</script>

<style scoped>
.activePopup {
  display: block;
  opacity: 1;
}

.current-city{
  margin: 10px;
}

.window{
  width: 460px;
}

@media screen and (max-width: 991px){
  .window{
    width: 680px;
    min-width: 680px;
  }

}

@media screen and (max-width: 767px) {
  .window{
    width: auto;
    min-width: auto;
  }
}
</style>
