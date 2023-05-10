<template>
  <div class="form-item">
    <div :class='{"tublerblock-mr-10": dynamicMessage}' class="tumblerblock">
      <div class="tumbler-info">
        <label class="field-label">{{ label }}</label>
        <div v-if='!dynamicMessage' class="input-msg">{{ message }}</div>
        <div v-else>
          <div v-if='model' class="input-msg">{{ dynamicMessages.active }}</div>
          <div v-else class="input-msg">{{ dynamicMessages.unactive }}</div>
        </div>
      </div>
      <button type='button' class="tumbler w-inline-block" @click='$emit("clickTumbler", model)'>
        <input type='hidden' :value='model' name='isPublished'>
        <div :class="{'active_tumbler': model}" class="active-tumbler"></div>
        <div :class="{'button_tumbler': model}" class="button-tumbler"></div>
      </button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'TumblerField',
  props: {
    id: {
      type: String,
      default: ''
    },
    model: {
      type: Boolean,
      default: true
    },
    label: {
      type: String,
      default: ''
    },
    message: {
      type: String,
      default: ''
    },
    dynamicMessage: {
      type: Boolean,
      default:false
    },
    dynamicMessages: {
      type: Object,
      default: () => {return {}}
    }
  },
  emits: {
    clickTumbler: null
  }
}
</script>

<style scoped>
.active_tumbler{
  opacity: 1;
}

.button_tumbler{
  right: 4px;
}
</style>
