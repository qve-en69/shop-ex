<template>
  <div :class='{"active":active}' class='w-lightbox-backdrop lightbox__deactive' tabindex='0'
       @click.stop="clickPopupBackground">
    <div class='w-lightbox-container'>
      <div class='w-lightbox-content clipper_content'>
        <div class='w-lightbox-view clipper_view' style='opacity: 1;'>
          <div v-if='image.length > 0' class='w-lightbox-frame'>
            <client-only>
              <clipper-basic ref='clipper' class="my-clipper" :src="image" ></clipper-basic>
            </client-only>
          </div>
        </div>
        <div class='w-lightbox-spinner w-lightbox-hide'></div>
        <div class='w-lightbox-control w-lightbox-left w-lightbox-inactive'></div>
        <div class='w-lightbox-control w-lightbox-right w-lightbox-inactive'></div>
        <button type='button' class='button__none' @click='clickCloseCheck'>
          <div class='w-lightbox-control w_clipper-check'></div>
        </button>
      </div>
      <div class='w-lightbox-strip'></div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ClipperModal',
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
    clickClose: null,
    clickCloseCheck: null
  },
  methods: {
    clickClose () {
      this.$emit('clickClose')
    },
    clickCloseCheck () {
      const pos = this.$refs.clipper.getDrawPos()
      const coordinate = {
        left: parseFloat(pos.pos.sx),
        top: parseFloat(pos.pos.sy),
        right: parseFloat(pos.pos.dwidth) + parseFloat(pos.pos.sx),
        bottom: parseFloat(pos.pos.dheight) + parseFloat(pos.pos.sy)
      }
      const canvas = this.$refs.clipper.clip()
      const resultUrl = canvas.toDataURL("image/jpeg", 1)
      this.$emit('clickCloseCheck', {coordinate, imageUrl: resultUrl })
    },
    clickPopupBackground (e) {
      if (e.target.classList[0] === 'w-lightbox-view') {
        this.$emit('clickClose')
      }
    }
  }
}
</script>

<style lang='css'>
@import "vuejs-clipper/dist/vuejs-clipper.css";
.button__none{
  background: transparent;
  border: none;
  outline: 0;
}

.button__none:focus{
  outline: 0;
}

.lightbox__deactive{
  display: none !important;
  opacity: 0 !important;
  transition: opacity 300ms ease 0s;
}

.active{
  display: block !important;
  opacity: 1 !important;
}

.clipper_content {
  display: flex;
  align-items: center;
  justify-content: center;
}

.clipper_view {
  width: 50%;
}
.r_30{
  right: 50px;
}

.w_clipper-check {
  right: 0;
  height: 2.6em;
  background-size: 25px;
  background-image: url(data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAiIGhlaWdodD0iMjAiIHZpZXdib3g9IjAgMCAyMCAyMCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KICA8cGF0aCBmaWxsLXJ1bGU9ImV2ZW5vZGQiIGNsaXAtcnVsZT0iZXZlbm9kZCIgZD0iTTE3LjI1NTkgNC40MTA3NEMxNy41ODE0IDQuNzM2MTggMTcuNTgxNCA1LjI2MzgyIDE3LjI1NTkgNS41ODkyNUw4LjA4OTI2IDE0Ljc1NTlDNy43NjM4MiAxNS4wODE0IDcuMjM2MTggMTUuMDgxNCA2LjkxMDc0IDE0Ljc1NTlMMi43NDQwOCAxMC41ODkzQzIuNDE4NjQgMTAuMjYzOCAyLjQxODY0IDkuNzM2MTggMi43NDQwOCA5LjQxMDc0QzMuMDY5NTEgOS4wODUzMSAzLjU5NzE1IDkuMDg1MzEgMy45MjI1OSA5LjQxMDc0TDcuNSAxMi45ODgyTDE2LjA3NzQgNC40MTA3NEMxNi40MDI4IDQuMDg1MyAxNi45MzA1IDQuMDg1MyAxNy4yNTU5IDQuNDEwNzRaIiBmaWxsPSJ3aGl0ZSI+PC9wYXRoPgo8L3N2Zz4K)
}
</style>
