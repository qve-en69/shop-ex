<template>
  <div class="form-wrap w-form">
    <form id="email-form-2" name="email-form-2" class="profile-form-item">
      <div class="title-12">
        <h1 class="h4">{{ $t('Учетные данные') }}</h1>
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
      <div class="two-input-row">
        <InputFioField
          :id="'firstName'"
          :label="$t('Имя')"
          :v='$v.model.firstName'
          :model='model.firstName'
          @updateValue='updateValue' />
        <InputFioField
          :id="'lastName'"
          :label="$t('Фамилия')"
          :v='$v.model.lastName'
          :model='model.lastName'
          @updateValue='updateValue' />
      </div>
      <div class="two-input-row">
        <PhoneNumberField
          :id="'phoneNumber'"
          :label="$t('Телефон')"
          :model='model.phoneNumber'
          :v='$v.model.phoneNumber'
          :is-activated='isActivated'
          @updateValue='updateValue' />
        <EmailField
          :id="'email'"
          :model='model.email'
          :v='$v.model.email'
          :label="'Email'"
          @updateValue='updateValue' />
      </div>
    </form>
    <div v-if="isChange" class="buttons-wrap-hor">
      <button type="button" class="button-primary button-primary-big btn__none" @click="clickSave">
        <span>{{ $t('Сохранить изменения ?') }}</span>
      </button>
    </div>
  </div>
</template>

<script>
import {required, maxLength, email} from 'vuelidate/lib/validators'
import {RU_PHONE_MASK} from 'common/utils/constants'
import InputFioField from 'common/components/ui/formField/InputFioField'
import EmailField from 'common/components/ui/formField/EmailField'
import PhoneNumberField from 'common/components/ui/formField/PhoneNumberField'
import NicknameField from 'common/components/ui/formField/NicknameField'
import AvatarField from '../ui/formField/AvatarField'
export default {
  name: 'InfluencerProfileInfo',
  components:{
    InputFioField,
    EmailField,
    PhoneNumberField,
    NicknameField,
    AvatarField
  },
  props: {
    infoProfile: {
      type: Object,
      default: () => {
        return {}
      }
    },
    imageUrl: {
      type: String,
      default: ''
    }
  },
  emits: {
    saveForm: null
  },
  data: () => ({
    model: {
      firstName: '',
      lastName: '',
      phoneNumber: '',
      email: '',
      avatar: '',
      avatarUrl: '',
      nickname: '',
      clipperImage: ''
    },
    isActivated: false,
    isChange: true,
    RU_PHONE_MASK
  }),
  validations() {
    return {
      model: {
        firstName: { required, nameLength: maxLength(128) },
        lastName: { required, nameLength: maxLength(128) },
        phoneNumber: { required },
        email: { required, email },
        nickname: { required, nicknameLength: maxLength(64) }
      }
    }
  },
  watch: {
    imageUrl() {
      this.model.avatarUrl = this.imageUrl
    }
  },
  mounted () {
    if (this.infoProfile !== null) {
      this.model.firstName = this.infoProfile.first_name
      this.model.lastName = this.infoProfile.last_name
      this.model.phoneNumber = this.infoProfile.phone_number
      this.model.email = this.infoProfile.email
      this.model.nickname = this.infoProfile.influencer_info.nickname
      this.model.avatarUrl = this.isAvatartUrl()
      this.isActivated = this.infoProfile.is_activated
    }
  },
  methods: {
    clickSave () {
      this.$v.$touch()
      if (this.$v.$invalid) {
        this.submitStatus = 'ERROR'
      } else {
        this.submitStatus = 'OK'
        this.changeField = false
        const data = {
          firstName: this.model.firstName,
          lastName: this.model.lastName,
          phoneNumber: this.model.phoneNumber,
          email: this.model.email,
          nickname: this.model.nickname,
          avatar: this.model.avatar
        }
        this.isChange = false
        this.$emit('saveForm', data)
      }
    },
    handleFileUpload (file) {
      this.model.avatar = file
      this.$emit('clipperImage', {file})
      this.model.avatarUrl = URL.createObjectURL(file)
      this.change()
    },
    clickDelete () {
      this.model.avatar = ''
      this.model.avatarUrl = ''
      this.change()
    },
    unMaskNumber () {
      return this.model.phoneNumber.replaceAll(' ', '').replaceAll('-', '').replaceAll("(", '').replaceAll(')', '')
    },
    isAvatartUrl () {
      return this.infoProfile.influencer_info.avatar.original !== undefined ? this.infoProfile.influencer_info.avatar.original : ''
    },
    updateValue (payload) {
      this.model[payload.id] = payload.value
      this.change()
    },
    change () {
      this.isChange = !(this.model.firstName === this.infoProfile.first_name
        && this.model.lastName === this.infoProfile.last_name
        && this.unMaskNumber() === this.infoProfile.phone_number
        && this.model.email === this.infoProfile.email
        && this.model.nickname === this.infoProfile.influencer_info.nickname
        && this.model.avatarUrl === this.isAvatartUrl())
    }
  }
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

