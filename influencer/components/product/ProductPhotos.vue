<template>
  <div class="product-photo-wrap">
    <div v-if='images.length > 0' class="product-img-list">
      <a v-for="image in images" :key="image.id" href="#" :class="{'current': image.id === currentImageId}" class="product-img-item w-inline-block" @click.prevent="clickPhoto(image.id)">
        <img :src="`${image.image.original}`" loading="lazy" alt="" class="product-img-item-file"></a>
    </div>
    <div v-else class="product-img-list">
      <a href="#" :class="{'current': true}" class="product-img-item w-inline-block" @click.prevent="clickPhoto()">
        <img src='~/static/images/default/defaultProduct.png' loading="lazy" alt="" class="product-img-item-file"></a>
    </div>
    <div class="current-product-img-wrap">
      <div v-if="windowWidth > 479" class="cur__photo">
        <img v-if="currentImage !== null && images.length > 0" :src="`${currentImage.image.original}`" loading="lazy" alt="" class="product-img-current img__photo-item"
             @click='clickLightBox(currentImage.image.original)'>
        <img v-else src='~/static/images/default/defaultProduct.png' loading="lazy" alt="" class="product-img-current img__photo-item">

      </div>
      <div v-else class="cur__photo">
        <div v-swiper="swiperOptions" class="swiper" >
          <div class="swiper-wrapper">
            <div v-for="image in images" :key="image.id" class="swiper-slide">
              <img :src="`${image.image.original}`" loading="lazy" alt="" class="product-img-current img__photo-item"
                   @click.stop='clickLightBox(image.image.original)'>
            </div>
          </div>
        </div>
      </div>
      <div class="buttons-icons-wrap absolute-vetical">
        <ShareLink>
          <ShareSvg/>
        </ShareLink>
      </div>
    </div>
  </div>
</template>

<script>
import { directive } from 'vue-awesome-swiper'
import { cloneDeep } from 'lodash'
import ShareLink from 'common/components/ui/ShareLink'
import ShareSvg from '@/static/svg/share.svg'
export default {
  name: 'ProductPhotos',
  components: {
    ShareLink,
    ShareSvg
  },
  directives: {
    swiper: directive
  },
  props: {
    productImages: {
      type: Array,
      default: () => {
        return []
      }
    }
  },
  emits: {
    clickLightBox: null
  },
  data: () => ({
    images: [],
    currentImageId: -1,
    windowWidth: 0,
    swiperOptions: {
      loop: false,
      centeredSlides: true,
      allowTouchMove: true
    }
  }),
  computed: {
    currentImage () {
      if (this.currentImageId !== -1) {
        return this.images.find(image => image.id === this.currentImageId)
      } else {
        return null
      }
    }
  },
  mounted() {
    this.images = cloneDeep(this.productImages)
    if (this.productImages.length > 0) {
      this.currentImageId = this.productImages[0].id
    }
    window.addEventListener('resize', this.handleResize)
    this.handleResize()
  },
  destroyed() {
    window.removeEventListener('resize', this.handleResize)
  },
  methods: {
    clickPhoto(id) {
      this.currentImageId = id
    },
    handleResize() {
      this.windowWidth = window.innerWidth
    },
    clickLightBox (image) {
      this.$emit('clickLightBox', {status: true, image})
    }
  }
}
</script>

<style scoped>
.swiper {
  height: 300px;
  width: 100%;
}

@media (max-width: 424px) {
  .swiper{
    height: 250px;
  }
}

.cur__photo{
  width: 100%;
  position: relative;
  max-height: 380px;
}

.img__photo-item{
  overflow: hidden;
  max-width: 100%;
  width: 100%;
  height: 100%;
  border-radius: 12px;
  object-fit: contain;
}

.swiper{
  height: 100%;
  width: 100%;
}

@media (max-width: 468px) {
  .cur__photo{
    max-height: 380px;
  }
}
</style>
