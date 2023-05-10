<template>
  <div class="share_block con-tooltip bottom">
    <a href="#" class="button-round button-white outline w-inline-block"
       @click.prevent="copyLink">
      <div class="icon-20px w-embed">
        <slot></slot>
      </div>
    </a>
    <div :class="{'active__tooltip':activeTooltip}" class="tooltip">
      <p>{{ $t('Ссылка скопирована') }}</p>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ShareLink',
  components: {},
  data: () => ({
    activeTooltip: false
  }),
  methods: {
    async copyLink () {
      try {
        if (!this.activeTooltip) {
          await navigator.clipboard.writeText(location.href)
          this.activeTooltip = true
          if (navigator.share) {
            await navigator.share({
              title: document.title,
              url: location.href
            })
          }
          setTimeout(() => {
            this.activeTooltip = false
          },1500)
        }
      } catch (err) {
      }
    }
  }
}
</script>

<style scoped>
.share_block {
  position: relative;
}

.tooltip{
  visibility: hidden;
  z-index: 1;
  opacity: .40;
  padding: 0px 10px;

  background: #333;
  color: white;
  text-align: center;
  font-size: 12px;

  position: absolute;
  top:-140%;
  right: 0%;
  border-radius: 9px;

  transform: translateY(9px);
  transition: all 0.3s ease-in-out;

  box-shadow: 0 0 3px rgba(56, 54, 54, 0.86);
}

.tooltip::after {
  content: " ";
  width: 0;
  height: 0;

  border-style: solid;
  border-width: 12px 12.5px 0 12.5px;
  border-color: #333 transparent transparent transparent;

  position: absolute;
  left: 37%;

}

.bottom .tooltip {
  top:115%;
  right:-53%;
}

.bottom .tooltip::after{
  top:-17%;
  left:37%;
  transform: rotate(180deg);
}

@media (max-width: 478px) {
  .bottom .tooltip {
    right: 0;
  }
  .bottom .tooltip::after{
    left: 63%;
  }
}

.active__tooltip {
  visibility: visible;
  transform: translateY(5px);
  opacity: 1;
  transition: .3s linear;
}

.tooltip p {
  margin: 3px 0;
  line-height: 1.30;
}

.share_block{
  z-index: 10;
}
</style>
