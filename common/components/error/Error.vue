<template>
  <div :class="{'active_position': active}" class='position_error'>
    <div class='w-form-fail active_error error_view' @click='clickUnactive'>
      <div>{{textError}}</div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Error',
  props: {
    active: {
      type: Boolean,
      default: false
    },
    textError: {
      type: String,
      default: ''
    }
  },
  emits: {
    clickUnactive: null
  },
  methods: {
    clickUnactive () {
      this.$emit('clickUnactive')
    }
  }
}
</script>

<style scoped>
.active_error{
  display: block;
}

.position_error{
  position: fixed;
  top: 0;
  left: 0;
  z-index: 10001;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;

  transform: translateY(-120%);

  transition: transform 0.2s linear;
}

.active_position{
  transform: translateY(0%);
  display: flex;

}

.active_position .w-form-fail{
  display: block;
}

.error_view{
  width: 90%;
  padding: 12px 10px;
  border-radius: 8px;
  box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
  cursor: pointer;
}

@media (max-width: 1440px) {
  .error_view {
    width: 60%;
  }
}
@media (max-width: 1024px) {
  .error_view {
    width: 70%;
  }
}

@media (max-width: 568px) {
  .error_view {
    width: 80%;
  }
}

@media (max-width: 468px) {
  .error_view {
    width: 90%;
  }
}
</style>
