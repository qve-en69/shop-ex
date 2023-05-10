<template>
  <div class="form-item" :class="{ 'form-item-activate': v.$error }">
    <label class="field-label">{{ $t('Ваша оценка') }}</label>
    <div class="rate-wrap mb_10">
      <button v-if='value === null || value.value !== rates.positive.value' type='button' class="rate-button w-inline-block btn__none" @click='chooseRate("positive")'>
        <span class="testimonial-rate w-embed">
          <PositiveRateSvg/>
          </span>
      </button>
      <button v-else-if='value.value === rates.positive.value' type='button' class="rate-button w-inline-block btn__none">
                      <span class="testimonial-rate w-embed">
                       <PositiveRateActiveSvg/>
                      </span>
      </button>
      <button v-if='value === null || value.value !== rates.negative.value' type='button' class="rate-button w-inline-block btn__none" @click='chooseRate("negative")'>
                      <span class="testimonial-rate w-embed">
                       <NegativeRateSvg/>
                      </span>
      </button>
      <button v-else-if='value.value === rates.negative.value' type='button' class="rate-button w-inline-block btn__none">
        <span class="testimonial-rate w-embed">
            <NegativeRateActiveSvg style='transform: rotate(180deg)'/>
        </span>
      </button>
    </div>
    <div v-if="!v.empty" class="input-error-msg active_error">{{ $t('Обязательное поле') }}<br></div>
  </div>
</template>

<script>
import PositiveRateActiveSvg from '~/static/svg/positiveRateActive.svg'
import NegativeRateActiveSvg from '~/static/svg/negativeRateActive.svg'
import NegativeRateSvg from '~/static/svg/negativeRate.svg'
import PositiveRateSvg from '~/static/svg/positiveRate.svg'
export default {
  name: 'RateFormField',
  components:{
    PositiveRateActiveSvg,
    NegativeRateSvg,
    PositiveRateSvg,
    NegativeRateActiveSvg
  },
  props:{
    value: {
      type: Object,
      default: null
    },
    v: {
      type: Object,
      required: true
    }
  },
  emits: {
    chooseRate: null
  },
  data: () => ({
    rates: {
      positive: {
        name: 'positive',
        value: 'положительно'
      },
      negative: {
        name: "negative",
        value: "отрицательно"
      }
    }
  }),
  methods: {
    chooseRate (rate) {
      this.$emit('chooseRate', this.rates[rate])
    }
  }
}
</script>

<style scoped>
.btn__none {
  border: none;
  outline: 0;
  background: none;
  display: flex;
  align-items: center;
  justify-content: center;
}

.btn__none:focus{
  outline: 0;
}

.form-item-activate .active_error {
  opacity: 1;
}

.active_error {
  display: block;
  opacity: 1;
  margin-top: -16px;
}
.form-item .active_error {
  opacity: 1;
}

.mb_10{
  margin-bottom: 10px;
}
</style>
