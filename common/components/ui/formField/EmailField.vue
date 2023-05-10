<template>
  <div class="form-item" :class="{ 'form-item-activate': v.$error }">
    <label :for="id" class="field-label">Email</label>
    <input :id="id" v-model.trim='inputValue' type="text" class="input w-input" maxlength="256">
    <div v-if="!v.required" class="input-error-msg active_error">{{ $t('Обязательное поле') }}</div>
    <div v-if="!v.email" class="input-error-msg active_error">{{ $t('Неверный формат email') }}</div>
  </div>
</template>

<script>
export default {
  name: 'EmailField',
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