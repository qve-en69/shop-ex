<template>
  <div>
    <Collection>
      <template v-slot:collectionAbout>
        <CollectionAboutContainer/>
      </template>
      <template v-slot:collectionInfo>
        <CollectionInfoContainer/>
      </template>
    </Collection>
    <div class='popups'>
      <CollectionRedactPopupContainer/>
      <CollectionDeletePopupContainer/>
      <CollectionDeleteProductContainer/>
      <CollectionMovePopupContainer/>
      <CreateCollectionPopupContainer/>
      <CollectionEditProductContainer/>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import CollectionAboutContainer from '@/containers/collection/CollectionAboutContainer'
import CollectionInfoContainer from '@/containers/collection/CollectionInfoContainer'
import CollectionRedactPopupContainer from '@/containers/collection/CollectionRedactPopupContainer'
import CollectionDeletePopupContainer from '@/containers/collection/CollectionDeletePopupContainer'
import CollectionMovePopupContainer from '@/containers/collection/CollectionMovePopupContainer'
import CreateCollectionPopupContainer from '@/containers/collection/CreateCollectionPopupContainer'
import CollectionDeleteProductContainer from '@/containers/collection/CollectionDeleteProductContainer'
import CollectionEditProductContainer from '@/containers/collection/CollectionEditProductContainer'
export default {
  components: { CollectionEditProductContainer, CollectionDeleteProductContainer, CreateCollectionPopupContainer, CollectionMovePopupContainer, CollectionDeletePopupContainer, CollectionRedactPopupContainer, CollectionInfoContainer, CollectionAboutContainer },
  layout: 'influencer',
  async validate ({params, store}) {
    const token = store.state.auth.token
    await store.dispatch('collections/loadCollection', params.id)
    await store.dispatch('shop/loadSelfShop')
    const shop = store.state.shop.externalId
    await store.dispatch('shop/loadShop',shop)
    const isSelfShop = store.state.shop.shop.collections.find(item => item.id === parseInt(params.id))
    return (token !== null && isSelfShop)
  },
  head () {
    return {
      title: `${this.collection.name} — ${this.shop}`
    }
  },
  computed: {
    ...mapState({
      collection: state => state.collections.collection,
      shop:state => state.shop.shop.name
    })
  }
}
</script>

<style scoped>
.nav-link:hover .icon-20px path{
  fill: #ED6A9A;
}
@media screen and (max-width: 640px) {
  .nav-link .b2{
    display: none;
  }
}
.product-color-item .icon-20px{
  opacity: 0;
}
.product-color-item.current .icon-20px{
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
.cbx:hover {
//background: rgba(0,119,255,0.06);
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
  box-shadow: 0 1px 1px rgba(0,16,75,0.05);
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
.form-item .input-error-msg{
  opacity: 0;
}
.form-item.form-item-error .input-error-msg{
  opacity: 1;
}
.form-item.form-item-error .input{
  border-color: #D45B5B;
}
/* Form-item styles ends */
.radio-option:hover .radio-btn{
  border-color:#FFA1C3;
}
.hint{
  display: none;
  opacity: 0;
}
.info-block:hover .hint{
  display: block;
  animation: hint 200ms ease-out forwards;
}
@keyframes hint {
  to {
    opacity: 1;
    transform: translate(0, 4px);
  }
}
.radio-button-wrap:hover .radio-circle{
  border: 4px solid rgba(47, 53, 59, 1);
}
.radio-button-wrap:hover .radio-label{
  opacity: .8;
}
</style>
