<template>
  <div :class='{"active":active}' class='w-lightbox-backdrop lightbox__deactive' tabindex='0'
       @click.stop="clickPopupBackground">
    <div class='w-lightbox-container'>
      <div class='w-lightbox-content'>
        <div class='w-lightbox-view' style='opacity: 1;'>
          <div class='w-lightbox-frame'>
            <figure class='w-lightbox-figure'>
              <img v-if='image.length > 0' width='370' height='370' class='w-lightbox-img w-lightbox-image' :src='image'>
            </figure>
          </div>
        </div>
        <div class='w-lightbox-spinner w-lightbox-hide'></div>
        <div class='w-lightbox-control w-lightbox-left w-lightbox-inactive'></div>
        <div class='w-lightbox-control w-lightbox-right w-lightbox-inactive'></div>
        <button type='button' class='button__none' @click='clickClose'>
          <div class='w-lightbox-control w-lightbox-close'></div>
        </button>
      </div>
      <div class='w-lightbox-strip'></div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'LightBox',
  props: {
    active: {
      type: Boolean,
      default: false
    },
    image: {
      type: String,
      default: ''
    }
  },
  emits: {
    clickClose: null
  },
  methods: {
    clickClose () {
      this.$emit('clickClose')
    },
    clickPopupBackground (e) {
      if (e.target.classList[0] === 'w-lightbox-view') {
        this.$emit('clickClose')
      }
    }
  }
}
</script>

<style scoped>
.button__none{
  background: transparent;
  border: none;
  outline: 0;
}

.button__none:focus{
  outline: 0;
}

.lightbox__deactive{
  display: none;
  opacity: 0;
  transition: opacity 300ms ease 0s;
}

.active{
display: block;
  opacity: 1;
}
</style>
