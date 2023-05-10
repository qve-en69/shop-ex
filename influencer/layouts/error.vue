<template>
  <div>
    <div v-if="error.statusCode === 404">
     <Error404Container/>
    </div>
    <h1 v-else>Server error</h1>
  </div>
</template>

<script>
import Error404Container from '@/containers/error/Error404Container'
export default {
  components: { Error404Container },
  props: ['error'],
  layout: 'error'
}
</script>

<style scoped>
.nav-link:hover .icon-20px path {
  fill: #ED6A9A;
}

@media screen and (max-width: 640px) {

  .nav-link .b2 {
    display: none;
  }
}

.product-color-item .icon-20px {
  opacity: 0;
}

.product-color-item.current .icon-20px {
  opacity: 1;
}


/* Checkbox styles start */

.cbx {
  -webkit-user-select: none;
  user-select: none;
  cursor: pointer;
  padding: 8px 8px;
  border-radius: 6px;
  overflow: hidden;
  transition: all 0.2s ease;
  margin: 0px;
  font-weight: 400;
  display: flex;
  align-items: center
}

.cbx:not(:last-child) {

}

.cbx span {
  float: left;
  vertical-align: middle;
  transform: translate3d(0, 0, 0);
}

.cbx span:first-child {
  position: relative;
  width: 18px;
  height: 18px;
  border-radius: 4px;
  transform: scale(1);
  border: 1px solid #cccfdb;
  transition: all 0.2s ease;
  box-shadow: 0 1px 1px rgba(0, 16, 75, 0.05);
  flex-shrink: 0;
}

.cbx span:first-child svg {
  position: absolute;
  top: 3px;
  left: 2px;
  fill: none;
  stroke: #fff;
  stroke-width: 2;
  stroke-linecap: round;
  stroke-linejoin: round;
  stroke-dasharray: 16px;
  stroke-dashoffset: 16px;
  transition: all 0.3s ease;
  transition-delay: 0.1s;
  transform: translate3d(0, 0, 0);
}

.cbx span:last-child {
  padding-left: 8px;
  line-height: 18px;
}

.cbx:hover span:first-child {
  border-color: #ed6a9a;
}

.inp-cbx:checked + .cbx span:first-child {
  background: #ed6a9a;
  border-color: #ed6a9a;
  animation: wave 0.4s ease;
}

.inp-cbx:checked + .cbx span:first-child svg {
  stroke-dashoffset: 32px;
}

.inline-svg {
  position: absolute;
  width: 0;
  height: 0;
  pointer-events: none;
  user-select: none;
}

@media screen and (max-width: 640px) {

  .cbx {
    width: 100%;
    display: flex;
  }
}

@-moz-keyframes wave {
  50% {
    transform: scale(0.9);
  }
}

@-webkit-keyframes wave {
  50% {
    transform: scale(0.9);
  }
}

@-o-keyframes wave {
  50% {
    transform: scale(0.9);
  }
}

@keyframes wave {
  50% {
    transform: scale(0.9);
  }
}

/* Checkboxes styles ends */

/* Form-item styles start */

.form-item .input-error-msg {
  opacity: 0;
}

.form-item.form-item-error .input-error-msg {
  opacity: 1;
}

.form-item.form-item-error .input {
  border-color: #D45B5B;
}


/* Form-item styles ends */

.radio-option:hover .radio-btn {
  border-color: #FFA1C3;
}


.hint {
  display: none;
  opacity: 0;
}

.info-block:hover .hint {
  display: block;
  animation: hint 200ms ease-out forwards;
}

@keyframes hint {
  to {
    opacity: 1;
    transform: translate(0, 4px);
  }
}


.radio-button-wrap:hover .radio-circle {
  border: 4px solid rgba(47, 53, 59, 1);
}

.radio-button-wrap:hover .radio-label {
  opacity: .8;
}


/* table styles starts */

.table-header, .table-row {
  display: contents;
}

.table-header .table-item {
  background: #F2F3FA;
  border-radius: 0;
  text-transform: uppercase;
  color: #545B66;
  font-weight: 700;
  font-size: 12px;
  position: sticky;
  letter-spacing: 1px;
  top: 0;
  z-index: 120;
  padding: 8px 12px;
}

.table-header .table-item:first-child {
  border-radius: 8px 0 0 8px;
}

.table-row:not(:last-child) .table-item {
  border-bottom: 1px solid #DCDEF8;
}

.table-header .table-item:last-child {
  border-radius: 0 8px 8px 0;
}

@media screen and (max-width: 991px) {
  .table-row {
    display: block
  }

  .table-row:not(:last-child) .table-item {
    border-bottom: none;
  }

  .table-header {
    display: none;
  }
}

@media screen and (max-width: 479px) {

  .table-toggle, .order-item {
    flex-direction: column;

  }

}

/* table styles ends */
</style>
