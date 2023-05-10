<template>
  <div class="window window-notfull-m">
    <div class="form-block-popup w-form">
      <form id="email-form" name="email-form" data-name="Email Form">
        <div class="title-12">
          <h4 class="h4">{{ $t('Введите код') }}</h4>
        </div>
        <div class="b2 b2-secondary">{{ $t('Мы отправили код подтверждения на номер') }}: {{ phoneNumber }}
          <a href="#" class="link" @click.prevent="changeNumber">{{ $t('Изменить номер') }}</a>
        </div>
        <div class="form">
          <div class="form-item"><label for="name-2" class="field-label">{{ $t('CМС код') }}</label>
            <input id="name-2" :value="code" ref='code' :disabled="disable" type="text" class="input w-input"
                   :maxlength="codeLength"
                   name="name-2"
                   data-name="Name 2"
                   :placeholder="`${$t('Введите код')}`"
                   @input="inputCode" @keydown.enter.prevent/>
            <div v-if="time !== 0" class="input-info-msg">{{ $t('Сможем выслать код еще раз через') }} {{ time }}
              {{ $t('секунд') }}<br></div>
            <div v-if="error.length > 0" :class="{'active_error': error.length > 0}" class="input-error-msg">{{error}}<br></div>
          </div>
          <div class="button-wrap">
            <button v-if="time === 0 && !disable" type="button" class="button-primary button-primary-big w-inline-block"
              @click="repeatSMS">
              <span>{{ $t('Повторно отправить СМС') }}</span>
            </button>
          </div>
        </div>
      </form>
      <div class="w-form-done">
        <div>Thank you! Your submission has been received!</div>
      </div>
      <div class="w-form-fail">
        <div>Oops! Something went wrong while submitting the form.</div>
      </div>
    </div>
    <button type="button" data-w-id="06b6a92c-9f49-c22d-8947-991eb271b93a" class="close-2 w-inline-block btn__none"
        @click="clickClose">
      <div class="icon-24px w-embed">
       <slot></slot>
      </div>
    </button>
  </div>
</template>

<script>
export default {
  name: 'AuthConfirmationCodeModal',
  props: {
    phoneNumber: {
      type: String,
      default: ''
    },
    time: {
      type: Number,
      default: 60
    },
    code: {
      type: String,
      default: ''
    },
    codeLength: {
      type: Number,
      default: 6
    },
    disable: {
      type: Boolean,
      default: false
    },
    error: {
      type: String,
      default: ''
    }
  },
  emits: {
    closeModal: null,
    changeNumber: null,
    repeatSMS: null,
    inputCode: null
  },
  methods: {
    clickClose () {
      this.$emit('closeModal', 'code')
    },
    changeNumber () {
      this.$emit('changeNumber')
    },
    repeatSMS () {
      this.$emit('repeatSMS')
    },
    inputCode (e) {
      this.$emit('inputCode', e.target.value)
    }
  },
  mounted () {
    this.$refs.code.focus()
  }
}
</script>

<style scoped>
.btn__none{
  border: 0;
  outline: 0;
  background: none;
  display: flex;
  justify-content: center;
  align-items: center;
}

.btn__none:focus{
  outline: 0;
}

.active_error {
  display: block;
  opacity: 1;
}
.form-item .active_error {
  opacity: 1;
}
</style>
