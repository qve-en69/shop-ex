<template>
  <div class="window window-notfull-m">
    <div class="form-block-popup w-form">
      <form id="email-form" name="email-form" data-name="Email Form">
        <div class="title-12">
          <h4 class="h4">{{ $t('Вы у нас впервые!') }}</h4>
        </div>
        <div class="b2 b2-secondary">{{ $t('Заполните недостающую информацию, чтобы продолжить') }}</div>
        <div class="form">
          <div class="form-item"><label for="firstName" class="field-label">{{ $t('Имя') }}</label>
            <input id="firstName"
                   :value="form.firstName"
                   type="text"
                   class="input w-input"
                   maxlength="256"
                   name="firstName"
                   data-name="Name 3"
                   @input="inputField($event,'firstName')">
            <div v-if="errors.firstName.length > 0" :class="{'active_error': errors.firstName.length > 0}" class="input-error-msg">{{errors.firstName}}<br></div>
          </div>
          <div class="form-item"><label for="lastName" class="field-label">{{ $t('Фамилия') }}</label>
            <input id="lastName" :value="form.lastName"
                   type="text"
                   class="input w-input"
                   maxlength="256"
                   name="lastName"
                   data-name="Name 3"
                   @input="inputField($event,'lastName')">
            <div v-if="errors.lastName.length > 0" :class="{'active_error': errors.lastName.length > 0}" class="input-error-msg">{{errors.lastName}}<br></div>
          </div>
          <div class="form-item"><label for="email" class="field-label">Email</label>
            <input id="email" :value="form.email"
                   type="text"
                   class="input w-input"
                   maxlength="256"
                   name="email"
                   data-name="Name 3"
                   @input="inputField($event,'email')">
            <div v-if="errors.email.length > 0" :class="{'active_error': errors.email.length > 0}" class="input-error-msg">{{errors.email}}<br></div>
          </div>
          <div class="button-wrap">
            <button type="button" class="button-primary button-primary-big w-inline-block" @click="clickRegistration">
              <span>{{ $t('Завершить регистрацию') }}</span>
            </button>
          </div>
        </div>
      </form>
    </div>
    <button type="button" data-w-id="53916d91-707c-eb2a-68fb-4253ee0b9d3e" class="close-2 w-inline-block btn__none" @click="clickClose">
      <div class="icon-24px w-embed">
        <slot></slot>
      </div>
    </button>
  </div>
</template>

<script>
export default {
  name: 'Registration',
  props:{
    errors: {
      type: Object,
      default: () => {
        return {}
      }
    },
    form: {
      type: Object,
      default: () => {
        return {}
      }
    }
  },
  emits: {
    clickClose: null,
    clickRegistration: null,
    changeField: null
  },
  methods: {
    clickClose () {
      this.$emit('clickClose')
    },
    clickRegistration () {
      this.$emit('clickRegistration')
    },
    inputField (e, field) {
      const data = {field, value: e.target.value}
      this.$emit('changeField', data)
    }
  },
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

.btn__none:focus{
  outline: 0;
}

.active_error {
  display: block;
  opacity: 1;
  margin-top: -16px;
}
.form-item .active_error {
  opacity: 1;
}


.form-item input{
  margin-bottom: 20px;
}

.button-wrap{
  margin-top: 30px;
}
</style>
