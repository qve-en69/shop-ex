<template>
  <div class="desc-under-button" :class="{ 'form-item-activate': v.$error }">
    <div class="checkbox-text w-embed">
      <input id="agreement" :checked='agreement' class="inp-cbx" type="checkbox" style="display: none;" @click='$emit("clickCheck")'>
      <label class="cbx" for="agreement"><span>
              <svg width="12px" height="10px">
                <use xlink:href="#check"></use>
              </svg></span><span>{{ $t('Cоглашаюсь с') }} <a class="link">{{ $t('правилами сервиса') }}</a> и <a class="link">{{ $t('офертой') }}</a></span></label>
      <!-- SVG Sprites -->
      <svg class="inline-svg">
        <symbol id="check" viewbox="0 0 12 10">
          <path d="M10 2L4.5 7.5L2 5"></path>
        </symbol>
      </svg>
    </div>
    <div v-if='!v.empty' class="input-error-msg active_error">{{ $t('Выберите этот пункт') }}</div>
  </div>
</template>

<script>
export default {
  name: 'AgreementField',
  props: {
    v: {
      type: Object,
      default: () => { return {}}
    },
    agreement: {
      type: Boolean,
      default: true
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
</style>
