<template>
  <div class="form-item" :class="{ 'form-item-activate': v.$error }">
    <label :for="id" class="field-label">{{ label }}</label>
    <input :id="id" type="text" v-model.trim='inputValue' class="input w-input" maxlength="64" placeholder="">
    <div class="input-info-msg">{{ $t('Покупатели будут видеть это имя на странице магазина') }}<br></div>
    <div v-if="!v.required" class="input-error-msg active_error">{{ $t('Обязательное поле') }}</div>
    <div v-if="!v.nicknameLength" class="input-error-msg active_error">{{ $t('Длина никнейма превысила 64 символа') }}</div>
  </div>
</template>

<script>
export default {
  name: 'NicknameField',
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
}