<template>
  <div class="form-item" :class="{ 'form-item-activate': v.$error }">
    <label :for="id" class="field-label">{{ label }} <span class="text-red">*</span></label>
    <input id="id" v-model.trim='inputValue'  type="text" class="input w-input" :maxlength="maxLength" :placeholder="placeholder" required="">
    <div v-if='message.length > 0' class="input-info-msg">{{ message }}</div>
    <div v-if='counter' class="input-info-msg mb_15">{{ $t('Осталось')  }}{{viewNumberSymbols}} {{ $t('символов') }}<br></div>
    <div v-if="!v.required" class="input-error-msg active_error">{{ $t('Обязательное поле') }}</div>
    <div v-if="v.nameLength !== undefined && !v.nameLength" class="input-error-msg active_error">{{ $t('Длина названия превысила 128 символов') }}</div>
  </div>
</template>

<script>
export default {
  name: 'InputNameField',
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
    },
    maxLength: {
      type: Number,
      default: 64
    },
    counter: {
      type: Boolean,
      default: true
    },
    message: {
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
      return this.maxLength - this.model.length
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

.form-item-activate .active_error {
  opacity: 1;
}

.form-item{
  margin-bottom: 20px;
}

@media (max-width: 768px) {
  .form-item{
    margin-top: 10px;
  }

  .form-item:first-child{
    margin-top: 0;
  }
}
</style>
