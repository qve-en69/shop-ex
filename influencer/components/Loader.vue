<template>
  <div v-if='active' class='loader_container'>
    <div class="loading"></div>
  </div>
</template>

<script>
export default {
  name: 'Loader',
  props: {
    active: {
      type: Boolean,
      default: false
    }
  }
}
</script>

<style scoped>
.loader_container{
  width: 100%;
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 20px 0;
}

.loading {
  display: inline-block;
  width: 30px;
  height: 30px;
  border: 3px solid rgba(255,255,255,.3);
  border-radius: 50%;
  border-top-color: #1b69e3;
  animation: spin 1s ease-in-out infinite;
  -webkit-animation: spin 1s ease-in-out infinite;
}

@keyframes spin {
  to { -webkit-transform: rotate(360deg); }
}
@-webkit-keyframes spin {
  to { -webkit-transform: rotate(360deg); }
}
</style>
