<template>
  <div :class="{'popup__active': active}" class="popup popup-product-settings">
    <div class="popup-flex scroll scroll-top full">
      <div class="close-popup" @click.stop="clickClose(false)"></div>
      <div class="window window-full-m">
        <div class="form-block-popup w-form">
          <form id="email-form" name="email-form" enctype="multipart/form-data" data-name="Email Form" @submit.prevent='submitForm'>
            <div class="title-12">
              <h4 class="h4">{{ $t('Настройки товара') }}</h4>
            </div>
            <div class="form">
              <TumblerField
                :id="'isPublished'"
                :label="$t('Опубликовать товар')"
                :model='model.isPublished'
                :dynamic-message='true'
                :dynamic-messages='{
                  active: (collection !== null) ? `${$t("Покупатели видят товар в коллекции")} «${collection.name}».` : "",
                unactive: (collection !== null) ? `${$t("Товар скрыт.Покупатели не увидят его в коллекции")} «${collection.name}».` : ""}'
                @clickTumbler='clickTumbler' />
              <EarningsPercentBlock :product='product'/>
              <div class="title-12">
                <div>
                  <h4 class="b1">{{ $t('Описание') }}</h4>
                </div>
              </div>
              <InputNameField
                :id="'name'"
                :v='$v.model.name'
                :model='model.name'
                :label="$t('Название товара')"
                :counter='true'
                :max-length='NUMBER_SYMBOLS_NAME'
                @updateValue='updateValue' />
              <TextareaFormField
                :id="'description'"
                :placeholder="$t('Кратко опишите тематику вашей коллекции')"
                :model='model.description'
                :v='$v.description'
                :label="$t('Описание товара')"
                @updateValue='updateValue'
              />
              <DownloadPhotosField :id='"photos"'
                                   :label="$t('Фото товара')"
                                   :files-url=model.filesUrl
                                   @handleFileUpload='handleFileUpload'
                                   @clickDeletePhoto='clickDeletePhoto'
                                   @updateFilesUrl='updateFilesUrl' />

              <div v-if='parameters && parameters.length > 0'>
                <h4 class="b1 b1-mb4">{{ $t('Варианты') }}</h4>
                <div class="b3 b3-secondary">{{ $t('Оставьте варианты товара, которые покупатели увидят в вашем магазине.') }}</div>
                <div class="form-item form-item-mb20">
                  <div v-for='option in parameters' :key='option.id' class="parameter-wrap nm">
                    <div class="b3">{{option.name}}</div>
                    <div class="mychips_wrap">
                      <div v-for='value in option.choices' :key='value.id'>
                        <a v-if='value.string_value !== null' href="#"
                           :class='{"chip-item-current": value.active}'
                           class="chip-item w-inline-block"
                           @click.prevent="clickOption({ option, value })">
                          <div>{{value.string_value}}</div>
                        </a>
                        <a v-else href='#' class='product-color-item current w-inline-block posit'
                           @click.prevent="clickOption({ option, value })">
                          <div class="icon-20px w-embed width_100">
                            <img v-if='value.picture.original' :src='value.picture.original' alt=''>
                          </div>
                          <div :class='{"active_check": value.active}' class='svg_check'>
                            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                              <path fill-rule="evenodd" clip-rule="evenodd" d="M17.2559 4.41074C17.5814 4.73618 17.5814 5.26382 17.2559 5.58925L8.08926 14.7559C7.76382 15.0814 7.23618 15.0814 6.91074 14.7559L2.74408 10.5893C2.41864 10.2638 2.41864 9.73618 2.74408 9.41074C3.06951 9.08531 3.59715 9.08531 3.92259 9.41074L7.5 12.9882L16.0774 4.41074C16.4028 4.0853 16.9305 4.0853 17.2559 4.41074Z" fill="white"></path>
                            </svg>
                          </div>
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div class="button-wrap">
                <button type='submit' class="button-primary button-primary-big w-inline-block">
                  {{ $t('Сохранить') }}
                </button>
              </div>
            </div>
          </form>
        </div>
        <button type='button' data-w-id="dc34b05c-6cea-dcb9-7990-223ae108853b"
                class="close-2 w-inline-block btn__none"
                @click.stop="clickClose(false)">
          <div class="icon-24px w-embed">
            <CloseSvg/>
          </div>
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import required from 'vuelidate/lib/validators/required'
import DownloadPhotosField from 'common/components/ui/formField/DownloadPhotosField'
import TumblerField from '../ui/formField/TumblerField'
import EarningsPercentBlock from '../ui/infoBlock/EarningsPercentBlock'
import InputNameField from '../ui/formField/InputNameField'
import TextareaFormField from '../../../common/components/ui/formField/TextareaFormField'
import CloseSvg from '@/static/svg/close.svg'
import { NUMBER_SYMBOLS_NAME } from '@/constants/inputField'
import { emptyFile } from '@/utils/errors/errorsField'
export default {
  name: 'ProductAddInShop',
  components: {
    CloseSvg,
    TumblerField,
    EarningsPercentBlock,
    InputNameField,
    TextareaFormField,
    DownloadPhotosField
  },
  props: {
    active: {
      type: Boolean,
      default: false
    },
    collection: {
      type: Object,
      default: () => {
        return {}
      }
    },
    product: {
      type: Object,
      default: () => {
        return null
      }
    },
    parameters: {
      type: Array,
      default: () => {return[]}
    },
    imageUrl: {
      type: Object,
      default: () => {return {}}
    },
    activeNameFile: {
      type: String,
      default: ""
    }
  },
  emits: {
    clickClose: null,
    submitForm: null,
    clickOption: null,
    clipperImages: null
  },
  validations()  {
    return {
      model: {
        name: { required },
        description: { required },
        filesUrl: { empty: emptyFile }
      },
    }
  },
  data: () => ({
    model: {
      isPublished: true,
      name: '',
      description: '',
      files: [],
      filesUrl: []
    },
    submitStatus: null,
    NUMBER_SYMBOLS_NAME
  }),
  watch: {
    active () {
      this.model.name = this.product.name
      this.model.description = this.product.description
      this.model.filesUrl = this.product.images.map((item) => {
        const nameSplit = item.image.original.split('/')
        return {url: item.image.original, name: nameSplit[nameSplit.length - 1], id: item.id}
      })
    },
    imageUrl () {
      const file = this.model.filesUrl.find(item => item.name === this.activeNameFile)
      file.url = this.imageUrl.imageUrl
    }
  },
  methods: {
    clickClose (status) {
      this.$emit('clickClose', status)
    },
    clickTumbler () {
      this.model.isPublished = !this.model.isPublished
    },
    submitForm () {
      this.$v.$touch()
      if (this.$v.$invalid) {
        this.submitStatus = 'ERROR'
      } else {
        // do your submit logic here
        this.submitStatus = 'OK'
        const resFiles = []
        this.model.filesUrl.forEach((item,index) => {
          const findFile = this.model.files.find(file => file[0].name === item.name)
          if (findFile !== undefined) {
            resFiles.push({file:findFile[0], nameFile: findFile[0].name, type: 'load', pos: index+1})
          } else {
            resFiles.push({type: 'product', ...item, pos: index+1})
          }
        })
        const data = {
          name: this.model.name,
          description: this.model.description,
          collection: this.collection.id,
          product: this.product.id,
          skus: this.product.skus.map(item => {
            return item.id
          }),
          isPublished: this.model.isPublished,
          files: resFiles,
        }
        this.$emit('submitForm', data)
      }
    },
    handleFileUpload (uploadedFiles) {
      Array.from(uploadedFiles).forEach((item) => {
        this.model.filesUrl.push({url: URL.createObjectURL(item), name: item.name})
      })
      this.model.files.push(Array.from(uploadedFiles))
      this.$emit('clipperImages', {file: uploadedFiles[0], nameFile:uploadedFiles[0].name})
    },
    clickDeletePhoto (index) {
      this.model.filesUrl.splice(index,1)
      this.model.files.splice(index,1)
    },
    clickOption (payload) {
      this.$emit('clickOption', payload)
    },
    updateValue (payload) {
      this.model[payload.id] = payload.value
    },
    updateFilesUrl (value) {
      this.model.filesUrl = value
    },
  }
}
</script>

<style scoped>
.popup__deactive {
  opacity:0.5;
  display:none
}

.popup__active {
  opacity: 1;
  display: block;
}

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
.form-item-activate .active_error {
  opacity: 1;
}

.width_100{
  width: 100%;
  border-radius: 4px;
}

.width_100 img{
  border-radius: 4px;
}

.posit{
  position: relative;
}

.svg_check{
  width: 20px;
  height: 20px;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%,-50%);
  opacity: 0;
}

.active_check{
  opacity: 1;
}
.mychips_wrap {
  display: grid;
  margin-top: 8px;
  grid-auto-columns: 1fr;
  grid-column-gap: 8px;
  grid-row-gap: 8px;
  grid-template-columns: max-content max-content max-content;
  -ms-grid-rows: auto;
  grid-template-rows: auto;
}

.form .form-item {
  margin-bottom: 15px;
}
</style>
