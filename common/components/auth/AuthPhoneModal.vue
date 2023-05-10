<template>
  <div>
    <div class="window window-notfull-m">
      <div class="form-block-popup w-form">
        <form id="email-form" name="email-form" data-name="Email Form">
          <div class="title-12">
            <h4 class="h4">{{ $t('Войдите или зарегистрируйтесь, чтобы продолжить') }}</h4>
          </div>
          <div class="b2 b2-secondary">{{ $t('Чтобы продолжить, введите номер телефона и введите код из СМС.') }}</div>
          <div class="form">
            <div class="form-item">
              <label for="name" class="field-label">{{ $t('Телефон') }}</label>
              <input id="name" v-model.trim="phone_number" v-mask="phoneMask" type="text" class="input w-input" maxlength="256" name="name" :placeholder="placeholder">
              <div v-if="errorField.length > 0" :class="{'active_error': errorField.length > 0}" class="input-error-msg">{{errorField}}<br></div>
            </div>
            <div class="button-wrap">
              <button type="submit" class="button-primary button-primary-big w-inline-block"
                      @click="clickSendForm">
                <span>{{ $t('Получить код') }}</span>
              </button>
            </div>
            <div class="desc-under-button">
              <div class="checkbox-text w-embed">
                <input id="login-check-1" class="inp-cbx" :checked="checkAgreement" type="checkbox" style="display: none;"
                       @click="clickCheck">
                <label class="cbx" for="login-check-1">
                <span>
                        <svg width="12px" height="10px">
                          <use xlink:href="#check"></use>
                        </svg>
                </span>
                  <span>{{ $t('Cоглашаюсь с') }} <a :href="`http://${$env.NON_WWW_HOST}${AGREEMENT_LINK}`" target="_blank" class="link">{{ $t('Условиями обработки перс.данных') }}</a></span></label>
                <!-- SVG Sprites -->
                <svg class="inline-svg">
                  <symbol id="check" viewbox="0 0 12 10">
                    <path d="M10 2L4.5 7.5L2 5"></path>
                  </symbol>
                </svg>
              </div>
            </div>
          </div>
        </form>
        <div v-if="errorAgreement.length > 0" :class="{'active_error': errorAgreement.length > 0}" class="w-form-fail">
          <div>{{errorAgreement}}</div>
        </div>
      </div>

      <button type="button" data-w-id="6636ed3b-cb56-e933-d19d-2e317c4ccec8" class="close-2 w-inline-block btn__none"
              @click="clickClose">
      <span class="icon-24px w-embed">
        <slot></slot>
      </span>
      </button>
    </div>
  </div>
</template>

<script>
import {AGREEMENT_LINK, RU_PHONE_MASK, US_PHONE_MASK} from "../../utils/constants";

export default {
  name: 'AuthPhoneModal',
  props: {
    checkAgreement: {
      type: Boolean,
      default: false
    },
    errorAgreement: {
      type: String,
      default: ''
    },
    errorField: {
      type:  String,
      default: ''
    }
  },
  emits: {
    clickClose: null,
    changeCheckAgreement: null,
    sendForm: null
  },
  data: () => ({
    phone_number: '',
    AGREEMENT_LINK,
    RU_PHONE_MASK,
    US_PHONE_MASK,
    phoneMask: '',
    placeholder: '',
  }),
  mounted () {
    this.phone()
  },
  methods: {
    clickClose () {
      this.$emit('clickClose', 'login')
    },
    clickCheck () {
      this.$emit('changeCheckAgreement')
    },
    clickSendForm (e) {
      e.preventDefault()
      this.$emit('sendForm', this.phone_number)
    },
    phone () {
      if (this.$env.LANGUAGE === 'ru') {
       this.phoneMask = RU_PHONE_MASK
        this.phone_number = '7'
        this.placeholder = '+7'
      } else {
        this.phoneMask = US_PHONE_MASK
        this.phone_number = '1'
        this.placeholder = '+1'
      }
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
