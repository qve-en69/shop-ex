<template>
  <div class="form-item" :class="{ 'form-item-activate': v.$error }">
    <label :for="id" class="field-label">{{ label }}</label>
    <input :id="id" v-mask="RU_PHONE_MASK" v-model.trim='inputValue' type="text" class="input w-input" maxlength="256">
    <div v-if='isActivated' class="input-green-text">{{ $t('Телефон подтвержден') }}<br></div>
    <div v-if="!v.required" class="input-error-msg active_error">{{ $t('Обязательное поле') }}</div>
  </div>
</template>

<script>
import { RU_PHONE_MASK } from '../../../utils/constants'

export default {
  name: 'PhoneNumberField',
  data: () => ({
    RU_PHONE_MASK
  }),
  props: {
    label: {
      type: String,
      default: ""
    },
    id: {
      type: String,
      default: ""
    },
    v: {
      type: Object,
      default: () => {return {}}
    },
    model: {
      type: String,
      default: ""
    },
    isActivated: {
      type: Boolean,
      default: false
    }
  },
  emits: {
    updateValue: null
  },
  computed:{
    inputValue: {
      get() {
        return this.model
      },
      set(newValue) {
        this.$emit('updateValue', {value:newValue, id: this.id})
      }
    }
  },
}
</script>

<style scoped>
.active_error {
  display: block;
  opacity: 1;
}
.form-item .active_error {
  opacity: 1;
}
</style>