<template>
  <div :class="{'popup__active': active}" class="popup popup-filter non_active" @click.stop="clickPopupBackground">
    <div class="popup-flex scroll scroll-top">
      <div data-w-id="f8bf72eb-0488-cbe7-df28-2d494d93673c" class="close-popup"></div>
      <div class="window window-full-m">
        <div class="form-block-popup w-form">
          <form id="email-form" name="email-form" data-name="Email Form">
            <div class="title-12">
              <h4 class="h4">{{ $t('Фильтр') }}</h4>
            </div>
            <div class="two-input-row">
              <div class="form-item"><label for="fromPrice" class="field-label">{{ $t('Цена от') }}</label>
                <input id="fromPrice" :value='fromPrice' type="text" class="input w-input" maxlength="256" name="name-2"
                       data-name="Name 2"
                       placeholder=""
                      @input='setFromPrice'>
                <div v-if="submitStatus === 'error'" class="input-error-msg active_error">{{ $t('Сумма до больше суммы от') }}</div>
              </div>
              <div class="form-item">
                <label for="toPrice" class="field-label">{{ $t('Цена до') }}</label>
                <input id="toPrice" :value='toPrice' type="text" class="input w-input" maxlength="256" name="name-2"
                       data-name="Name 2"
                       placeholder=""
                       @input='setToPrice'>
                <div class="input-error-msg">Error message<br></div>
              </div>
            </div>
          </form>
        </div>
        <div class="buttons-wrap-hor filter-buttons">
          <button type='button' class="button-primary button-primary-big w-inline-block" @click='submitForm'>
            <div>{{ $t('Применить фильтры') }}</div>
          </button>
          <button type='button' class="button-secondary button-secondary-big w-inline-block"
                  @click='clearFilter'>
            <div>{{ $t('Сбросить фильтры') }}</div>
          </button>
        </div>
        <button type='button' data-w-id="f8bf72eb-0488-cbe7-df28-2d494d93678d" class="close-2 w-inline-block btn__none" @click="clickClose">
          <div class="icon-24px w-embed">
            <CloseSvg/>
          </div>
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import CloseSvg from '@/static/svg/close.svg'
import { fromToPrice } from '@/utils/errors/errorsField'
export default {
  name: 'SearchFilterPopup',
  components: {
    CloseSvg
  },
  props: {
    active: {
      type: Boolean,
      default: false
    },
    fromPrice: {
      type: String,
      default: ''
    },
    toPrice: {
      type: String,
      default: ''
    }
  },
  emits: {
    clickClose: null,
    setFromPrice: null,
    setToPrice: null,
    submitFilter: null,
    clearFilter: null
  },
  data: () => ({
    submitStatus: null
  }),
  methods: {
    clickPopupBackground(e) {
      if (e.target.classList[0] === 'close-popup') {
        this.$emit('clickClose', false)
      }
    },
    clickClose () {
      this.$emit('clickClose', false)
    },
    setFromPrice (e) {
      this.$emit('setFromPrice', e.target.value)
    },
    setToPrice (e) {
      this.$emit('setToPrice', e.target.value)
    },
    submitForm () {
      if (fromToPrice(this.fromPrice, this.toPrice)) {
        this.submitStatus = 'error'
      } else {
        this.submitStatus = 'OK'
        this.$emit('submitFilter')
      }
    },
    clearFilter () {
      this.$emit('clearFilter')
    }
  }
}
</script>

<style scoped>
.btn__none{
  border: 0;
  outline: 0;
  background: none;
  display: flex;
  align-items: center;
  justify-content: center;
}

.active_error {
  display: block;
  opacity: 1;
}
.form-item-activate .active_error {
  opacity: 1;
}

.btn__none:focus{
  outline: 0;
}

.non_active {
  display: none;
  opacity: 0.5;
}

.popup__active{
  display: block;
  opacity: 1;
}
</style>
