<template>
  <div class="footer">
    <div class="footer-container">
      <div class="part part-vertical">
        <slot></slot>
        <div class="b2-secondary">{{ COMPANY_NAME }}</div>
        <div class="b2-secondary">© 2021 {{ $t('Все права защищены') }}</div>
      </div>
      <div class="part">
        <div class="footer-menu">
          <a :href="`http://${$env.NON_WWW_HOST}${POLICY_LINK}`" target="_blank" class="nav-link">{{ $t('Политика конфиденциальности') }}</a>
          <a :href="`http://${$env.NON_WWW_HOST}`" target="_blank" class="nav-link">{{ $t('О компании') }}</a>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { COMPANY_NAME, POLICY_LINK } from 'common/utils/constants';

export default {
  name: 'Footer',
  data() {
    return {
      COMPANY_NAME,
      POLICY_LINK
    }
  }
}
</script>

<style scoped>

</style>
