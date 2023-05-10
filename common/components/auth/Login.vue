<template>
  <div class="popups">
    <div class="popup popup-login index_z">
      <div class="popup-flex scroll">
        <div data-w-id="6636ed3b-cb56-e933-d19d-2e317c4cceb9" class="close-popup"></div>
        <slot></slot>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Login',
  emit: {
    closeModal: null
  },
  methods: {
    clickPopupBackground(e) {
      if (e.target.classList[0] === 'close-popup') {
        this.$emit('closeModal')
      }
    }
  }
}
</script>

<style scoped>
.index_z{
  z-index: 1001;
}

.radio-button-wrap:hover .radio-circle{
  border: 4px solid rgba(47, 53, 59, 1);
}
.radio-button-wrap:hover .radio-label{
  opacity: .8;
}
</style>
