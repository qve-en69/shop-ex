<template>
  <div class="section wf-section">
    <div class="container container-thick">
      <div class="form-wrap w-form">
        <form id="email-form-2" name="email-form-2" data-name="Email Form 2" class="profile-form-item" @submit.prevent='submitForm'>
          <div class="title-12">
            <h1 class="h4">{{ $t('Информация о магазине') }}</h1>
          </div>
          <div class="two-input-row">
            <InputNameField
              :id="'name'"
              :v='$v.model.name'
              :model='model.name'
              :label="$t('Название магазина')"
              :message="$t('Для доставки и обращения в поддержку')"
              :counter='false'
              :max-length='NUMBER_SYMBOLS_NAME_SHOP'
              @updateValue='updateValue' />

            <div id="w-node-b54ae889-ec89-b7df-9653-6652a4930102-e418e5c8" :class="{ 'form-item-activate': $v.link.$error }" class="form-item">
              <label for="link" class="field-label">{{ $t('Ссылка на магазин') }} <span class="required">*</span></label>
              <input id="link" v-model.trim="link" type="text" class="input w-input" :maxlength="maxLength" name="link" data-name="Name 2" placeholder=""
                     @input="setLink($event.target.value)">
              <div class="input-info-msg">{{ $t('Осталось') }} {{viewNumberSymbols}} {{ $t('символов') }}</div>
              <div v-if="!$v.link.empty" class="input-error-msg active_error">{{ $t('Обязательное поле') }}</div>
            </div>

            <CoverField
              :label="$t('Обложка магазина')"
              :message="$t('Рекомендуем изображение 750 x 280 пикселей в формате .png или .jpg')"
              :cover-url='model.coverUrl'
              :full-width='true'
              @clickDelete='clickDeleteCover'
              @handleFileUpload='handleCoverUpload' />
          </div>
          <div class="title-12 marg_20">
            <h1 class="h4">{{ $t('Информация о вас') }}</h1>
          </div>
          <div class="profile">
            <AvatarField
              :avatar-url='model.avatarUrl'
              @handleFileUpload='handleFileUpload'
              @clickDelete='clickDelete' />

            <NicknameField
              :id="'nickname'"
              :v='$v.model.nickname'
              :model='model.nickname'
              :label="$t('Никнейм')"
              @updateValue='updateValue' />
          </div>
        </form>
      </div>
      <div class="button-wrap button-wrap-inline">
        <button type='submit' data-w-id="80febffb-0324-58c1-ecd8-418ef466be43" class="button-primary button-primary-big w-inline-block" @click='submitForm'>
          {{ $t('Создать магазин') }}
        </button>
      </div>
      <AgreementField
        :agreement='model.agreement'
        :v='$v.model.agreement'
        @clickCheck='clickCheck'
      />
    </div>
  </div>
</template>

<script>
import {required, maxLength} from 'vuelidate/lib/validators'
import NicknameField from 'common/components/ui/formField/NicknameField'
import InputNameField from '../ui/formField/InputNameField'
import CoverField from '../ui/formField/CoverField'
import { NUMBER_SYMBOLS_NAME_SHOP } from '../../constants/inputField'
import AgreementField from '../ui/formField/AgreementField'
import AvatarField from '../ui/formField/AvatarField'
import {NUMBER_SYMBOLS} from '@/constants/inputField.js'
import { emptyCheck, emptyLinkField } from '@/utils/errors/errorsField'
import { transliterate } from '@/utils/converter'
export default {
  name: 'CreateShop',
  components: {
    AvatarField,
    AgreementField,
    InputNameField,
    CoverField,
    NicknameField
  },
  props: {
    info: {
      type: Object,
      default: null
    },
    imageUrl: {
      type: String,
      default: ''
    },
    imageUrlCover: {
      type: String,
      default: ''
    }
  },
  emits: {
    submitForm: null,
    clipperImage: null,
    clipperImageCover: null
  },
  data: () => ({
    model: {
      name: '',
      nickname: '',
      cover: '',
      coverUrl: '',
      agreement: true,
      avatar: '',
      avatarUrl: ''
    },
    submitStatus: null,
    linkServer: '',
    link: '',
    NUMBER_SYMBOLS_NAME_SHOP
  }),
  validations() {
    return {
      model: {
        name: { required, nameLength: maxLength(128) },
        nickname: { required, nicknameLength: maxLength(64) },
        agreement: { empty: emptyCheck }
      },
      link: { empty: emptyLinkField(this.linkServer) },
    }
  },
  computed: {
    viewNumberSymbols () {
      if (this.linkServer !== '') {
        return NUMBER_SYMBOLS - this.link.split(this.linkServer)[1].length
      }
      return NUMBER_SYMBOLS
    },
    maxLength () {
      if (this.linkServer !== '') {
        return NUMBER_SYMBOLS + this.linkServer.length
      }
      return NUMBER_SYMBOLS
    }
  },
  watch: {
    imageUrl () {
      this.model.avatarUrl = this.imageUrl
    },
    imageUrlCover () {
      this.model.coverUrl = this.imageUrlCover
    },
  },
  mounted() {
    this.linkServer = `${this.$env.BUYER_SITE}/s/`
    this.link = `${this.$env.BUYER_SITE}/s/`
    if (this.info !== null) {
      const fi = `${this.info.first_name} ${this.info.last_name}`
      const translate = transliterate(fi)
      this.link = `${this.$env.BUYER_SITE}/s/${translate.replaceAll(" ", '')}`
      this.model.nickname = fi
      this.model.name = 'Мой магазин'
    }
  },
  methods: {
    setLink(value) {
      const ind = this.link.indexOf(this.linkServer)
      if (ind !== 0){
        this.link = this.linkServer
      } else if (NUMBER_SYMBOLS > this.link.split(this.linkServer)[1].length) {
        this.link = value
      }
    },
    submitForm () {
      this.$v.$touch()
      if (this.$v.$invalid) {
        this.submitStatus = 'ERROR'
      } else {
        // do your submit logic here
        this.submitStatus = 'OK'
        const data = {
          name: this.model.name,
          link: this.link.split(this.linkServer)[1],
          nickname: this.model.nickname,
          avatar: this.model.avatar,
          cover: this.model.cover
        }

        this.$emit('submitForm', data)
      }
    },
    clickCheck () {
      this.model.agreement = this.model.agreement !== true
    },
    handleFileUpload (file) {
      this.model.avatar = file
      this.$emit('clipperImage', {file})
      this.model.avatarUrl = URL.createObjectURL(file)
    },
    clickDelete () {
      this.model.avatar = ''
      this.model.avatarUrl = ''
    },
    handleCoverUpload (file) {
      this.model.cover = file
      this.$emit('clipperImageCover', {file})
      this.model.coverUrl = URL.createObjectURL(file)
    },
    clickDeleteCover () {
      this.model.cover = ''
      this.model.coverUrl = ''
    },
    updateValue (payload) {
      this.model[payload.id] = payload.value
    }
  }
}
</script>

<style scoped>
.active_error {
  display: block;
  opacity: 0;
}
.form-item-activate .active_error {
  opacity: 1;
}

.marg_20{
  margin-top: 20px;
}

@media (max-width: 768px) {
  .form-item{
    margin-top: 10px;
  }

  .form-item:first-child{
    margin-top: 0;
  }
}

.form-item{
  margin-bottom: 20px;
}
</style>
