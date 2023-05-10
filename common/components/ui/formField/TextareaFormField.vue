<template>
  <div class="form-item" :class="{ 'form-item-activate': v.$error }">
    <label :for="id" class="field-label">{{ label }}</label>
    <textarea :id="id" v-model.trim='inputValue' :placeholder="placeholder" maxlength="2000" class="input w-input input__textarea"></textarea>
    <div class="input-info-msg mb_15">{{ $t(`Осталось ${viewNumberSymbols} символов`) }}</div>
    <div v-if="v.required !== undefined && !v.required" class="input-error-msg active_error">{{ $t('Обязательное поле') }}<br></div>
  </div>
</template>

<script>
import { NUMBER_SYMBOLS_DESCRIPTION } from '@/constants/inputField'

export default {
  name: 'TextareaFormField',
  props: {
    label: {
      type: String,
      default: ""
    },
    id: {
      type: String,
      default: ""
    },
    placeholder: {
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
    },
    viewNumberSymbols () {
      return NUMBER_SYMBOLS_DESCRIPTION - this.model.length
    }
  },
}
</script>

<style scoped>
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

.mb_15{
  margin-bottom: 15px;
}

.input__textarea{
  resize: vertical;
  min-height: 150px;
}
</style>
