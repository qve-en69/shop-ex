<template>
  <div :class='{"form__width": fullWidth, "form-item-activate": v.$error}' class="form-item form-item-mb20">
    <label class="field-label">{{ label }}</label>
    <div class="input-info-msg">{{ message }}<br></div>
    <div v-if='coverUrl !== "" && coverUrl !== undefined' class="uploaded-file m12">
      <img :src="coverUrl" loading="lazy" sizes="100vw" :srcset="`${coverUrl} 500w, ${coverUrl} 800w, ${coverUrl} 1080w, ${coverUrl} 1186w`" alt="" class="uploaded-shop-cover">
      <div class="delete-wrap delete_wrap-index" @click='clickDelete'>
        <div class="icon-24px w-embed">
          <svg width="24" height="24" viewbox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <g opacity="0.4">
              <path d="M12 23.5C14.2745 23.5 16.4979 22.8255 18.3891 21.5619C20.2802 20.2983 21.7542 18.5022 22.6246 16.4009C23.495 14.2995 23.7228 11.9872 23.279 9.75647C22.8353 7.52568 21.74 5.47658 20.1317 3.86828C18.5234 2.25997 16.4743 1.1647 14.2435 0.720974C12.0128 0.277244 9.70049 0.504983 7.59914 1.37539C5.49779 2.2458 3.70174 3.71978 2.4381 5.61095C1.17446 7.50211 0.5 9.72552 0.5 12C0.503441 15.0489 1.71615 17.972 3.87207 20.1279C6.028 22.2839 8.95107 23.4966 12 23.5V23.5ZM7.05 8.46501C6.95449 8.37276 6.87831 8.26241 6.8259 8.14041C6.77349 8.01841 6.7459 7.88719 6.74475 7.75441C6.7436 7.62163 6.7689 7.48995 6.81918 7.36705C6.86946 7.24415 6.94371 7.1325 7.0376 7.03861C7.1315 6.94472 7.24315 6.87046 7.36605 6.82018C7.48894 6.7699 7.62062 6.7446 7.7534 6.74575C7.88618 6.74691 8.0174 6.77449 8.1394 6.8269C8.26141 6.87931 8.37175 6.9555 8.464 7.05101L11.823 10.41C11.8699 10.4567 11.9333 10.483 11.9995 10.483C12.0657 10.483 12.1291 10.4567 12.176 10.41L15.535 7.05101C15.6272 6.9555 15.7376 6.87931 15.8596 6.8269C15.9816 6.77449 16.1128 6.74691 16.2456 6.74575C16.3784 6.7446 16.5101 6.7699 16.633 6.82018C16.7558 6.87046 16.8675 6.94472 16.9614 7.03861C17.0553 7.1325 17.1295 7.24415 17.1798 7.36705C17.2301 7.48995 17.2554 7.62163 17.2542 7.75441C17.2531 7.88719 17.2255 8.01841 17.1731 8.14041C17.1207 8.26241 17.0445 8.37276 16.949 8.46501L13.59 11.824C13.5433 11.8709 13.5171 11.9343 13.5171 12.0005C13.5171 12.0667 13.5433 12.1301 13.59 12.177L16.949 15.536C17.0445 15.6283 17.1207 15.7386 17.1731 15.8606C17.2255 15.9826 17.2531 16.1138 17.2542 16.2466C17.2554 16.3794 17.2301 16.5111 17.1798 16.634C17.1295 16.7569 17.0553 16.8685 16.9614 16.9624C16.8675 17.0563 16.7558 17.1305 16.633 17.1808C16.5101 17.2311 16.3784 17.2564 16.2456 17.2553C16.1128 17.2541 15.9816 17.2265 15.8596 17.1741C15.7376 17.1217 15.6272 17.0455 15.535 16.95L12.176 13.591C12.1291 13.5443 12.0657 13.5181 11.9995 13.5181C11.9333 13.5181 11.8699 13.5443 11.823 13.591L8.464 16.95C8.2754 17.1322 8.0228 17.233 7.7606 17.2307C7.4984 17.2284 7.24759 17.1232 7.06218 16.9378C6.87677 16.7524 6.7716 16.5016 6.76933 16.2394C6.76705 15.9772 6.86784 15.7246 7.05 15.536L10.409 12.177C10.4557 12.1301 10.4819 12.0667 10.4819 12.0005C10.4819 11.9343 10.4557 11.8709 10.409 11.824L7.05 8.46501Z" fill="#20253A"></path>
            </g>
          </svg>
        </div>
      </div>
    </div>
    <div v-else class="uploaded-file m12">
      <img src="~static/images/default/cover-default.jpg" loading="lazy" sizes="100vw" srcset="`~static/images/default/cover-default.jpg 500w, ~static/images/default/cover-default.jpg 800w, ~static/images/default/cover-default.jpg 1080w, ~static/images/default/cover-default.jpg 1186w`" alt="" class="uploaded-shop-cover">
    </div>
    <div class="button-wrap button-wrap-inline nm">
      <a href="#" class="button-secondary button-secondary-sm w-inline-block button_response">
        <input id="cover" ref="cover" accept='image/jpeg, image/png, image/jpg, image/webp' type="file" name="cover" class="send__file--input" @change="handleFileUpload">
        <div v-if='coverUrl !== "" && coverUrl !== undefined'>{{ $t('Загрузить другой файл') }}</div>
        <div v-else>{{ $t('Выбрать файл') }}</div>
      </a>
      <div v-if="v.emptyFile !== undefined && !v.emptyFile" class="input-error-msg active_error">{{ $t('Обязательное поле') }}</div>
      <div v-if="v.maxSizeFile !== undefined && !v.maxSizeFile" class="input-error-msg active_error">{{ $t('Размер файла превышает максимальный') }} <strong>(2мб)</strong></div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'CoverField',
  props: {
    label: {
      type: String, default: ''
    },
    message: {
      type: String,
      default: ""
    },
    coverUrl: {
      type: String,
      default: ''
    },
    fullWidth: {
      type: Boolean,
      default: false
    },
    v: {
      type: Object,
      default: () => {return {}}
    }
  },
  emits: {
    clickDelete: null,
    handleFileUpload: null
  },
  methods: {
    clickDelete () {
      this.$emit('clickDelete')
      this.$refs.cover.value = null
    },
    handleFileUpload (e) {
      const file = e.target.files[0]
      if (file) {
        this.$emit('handleFileUpload', file)
      }
    },
  }
}
</script>

<style scoped>
.send__file--input{
  font-size: 0;
  width: 100%;
  height: 100%;
  position: absolute;
  opacity: 0;
}

.button_response{
  position: relative;
}

.delete_wrap-index {
  z-index: 100;
  cursor: pointer;
}

.active_error {
  display: block;
  opacity: 1;
  margin-top: -16px;
}
.form-item .active_error {
  opacity: 1;
}

.button-wrap {
  margin-top: 30px;
}

@media (max-width: 768px) {
  .form-item{
    margin-top: 10px;
  }

  .form-item:first-child{
    margin-top: 0;
  }
}

@media (max-width: 668px) {
  .form__width{
    width: 200%;
    display: flex;
    flex-direction: column;
  }
}
</style>
