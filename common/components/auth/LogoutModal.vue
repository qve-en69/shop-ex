<template>
    <div :class="{'popup__active': viewPopup}" class="popup popup-delete" @click.stop="clickPopupBackground">
      <div class="popup-flex scroll">
        <div data-w-id="effd599a-0553-0263-f492-dd39af54a6a2" class="close-popup"></div>
        <div class="window">
          <div class="form-block-popup w-form">
            <form id="email-form" name="email-form" data-name="Email Form">
              <div class="title-12">
                <h4 class="h4">{{ $t('Выйти из аккаунта?') }}</h4>
              </div>
              <div class="buttons-wrap-hor">
                <button type="button" class="button-primary button-primary-big w-inline-block"
                        @click="handleModal(false)">
                  <div>{{ $t('Отмена') }}</div>
                </button>
                <button type="button" class="button-secondary button-secondary-big w-inline-block"
                        @click="handleModal(true)">
                  <div>{{ $t('Выйти') }}</div>
                </button>
              </div>
            </form>
          </div>
          <button type="button" data-w-id="effd599a-0553-0263-f492-dd39af54a6ba" class="close-2 w-inline-block btn__none"
             @click.prevent="handleModal(false)">
            <div class="icon-24px w-embed">
              <slot></slot>
            </div>
          </button>
        </div>
      </div>
    </div>
</template>

<script>
import CloseSvg from "static/svg/close.svg";

export default {
  name: "LogoutModal",
  components: {
    CloseSvg
  },
  props: {
    activePopup: {
      type: Boolean,
      default: false
    }
  },
  emit: {
    handleModal: null
  },
  computed: {
    viewPopup () {
      return this.activePopup
    }
  },
  methods: {
    handleModal (status) {
      this.$emit('handleModal', status)
    },
    clickPopupBackground(e) {
      if (e.target.classList[0] === 'close-popup') {
        this.$emit('handleModal', false)
      }
    }
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
</style>
