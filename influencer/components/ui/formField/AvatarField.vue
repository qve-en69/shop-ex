<template>
  <div class="profile-img-wrap w-inline-block profile__img">
    <div class="change-cover">
      <input id="avatar" ref="avatar" type="file" name="avatar" accept='image/jpeg, image/png, image/jpg, image/webp' class="send__file--input" @change="handleFileUpload">
      <div class="camera-icon w-embed">
        <svg width="24" height="24" viewbox="0 0 24 24" fill="white" xmlns="http://www.w3.org/2000/svg">
          <path fill-rule="evenodd" clip-rule="evenodd" d="M8.16795 2.4453C8.35342 2.1671 8.66565 2 9 2H15C15.3344 2 15.6466 2.1671 15.8321 2.4453L17.5352 5H21C21.7957 5 22.5587 5.31607 23.1213 5.87868C23.6839 6.44129 24 7.20435 24 8V19C24 19.7957 23.6839 20.5587 23.1213 21.1213C22.5587 21.6839 21.7957 22 21 22H3C2.20435 22 1.44129 21.6839 0.87868 21.1213C0.316071 20.5587 0 19.7957 0 19V8C0 7.20435 0.316071 6.44129 0.87868 5.87868C1.44129 5.31607 2.20435 5 3 5H6.46482L8.16795 2.4453ZM9.53518 4L7.83205 6.5547C7.64658 6.8329 7.33435 7 7 7H3C2.73478 7 2.48043 7.10536 2.29289 7.29289C2.10536 7.48043 2 7.73478 2 8V19C2 19.2652 2.10536 19.5196 2.29289 19.7071C2.48043 19.8946 2.73478 20 3 20H21C21.2652 20 21.5196 19.8946 21.7071 19.7071C21.8946 19.5196 22 19.2652 22 19V8C22 7.73478 21.8946 7.48043 21.7071 7.29289C21.5196 7.10536 21.2652 7 21 7H17C16.6656 7 16.3534 6.8329 16.1679 6.5547L14.4648 4H9.53518Z"></path>
          <path fill-rule="evenodd" clip-rule="evenodd" d="M12 10C10.3431 10 9 11.3431 9 13C9 14.6569 10.3431 16 12 16C13.6569 16 15 14.6569 15 13C15 11.3431 13.6569 10 12 10ZM7 13C7 10.2386 9.23858 8 12 8C14.7614 8 17 10.2386 17 13C17 15.7614 14.7614 18 12 18C9.23858 18 7 15.7614 7 13Z"></path>
        </svg>
      </div>
      <div>{{ $t('изменить') }}</div>
    </div>
    <img v-if='avatarUrl.length === 0' src="@/static/images/default/avatar.png" alt="" class="img-cover img__cover">
    <img v-else :src="avatarUrl" alt="" class="img-cover img__cover">
    <div class="delete cur_pointer" @click='clickDelete'>
      <svg class="delete-icon" width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path fill-rule="evenodd" clip-rule="evenodd" d="M15.5893 4.41076C15.9147 4.7362 15.9147 5.26384 15.5893 5.58928L5.58928 15.5893C5.26384 15.9147 4.7362 15.9147 4.41076 15.5893C4.08533 15.2638 4.08533 14.7362 4.41076 14.4108L14.4108 4.41076C14.7362 4.08533 15.2638 4.08533 15.5893 4.41076Z" fill="white"/>
        <path fill-rule="evenodd" clip-rule="evenodd" d="M4.41076 4.41076C4.7362 4.08533 5.26384 4.08533 5.58928 4.41076L15.5893 14.4108C15.9147 14.7362 15.9147 15.2638 15.5893 15.5893C15.2638 15.9147 14.7362 15.9147 14.4108 15.5893L4.41076 5.58928C4.08533 5.26384 4.08533 4.7362 4.41076 4.41076Z" fill="white"/>
      </svg>
    </div>
  </div>
</template>

<script>
export default {
  name: 'AvatarField',
  props: {
    avatarUrl: {
      type: String,
      default: ""
    }
  },
  emits: {
    handleFileUpload: null,
    clickDelete: null
  },
  methods: {
    handleFileUpload (e) {
      const file = e.target.files[0]
      if (file) {
        this.$emit('handleFileUpload', file)
      }
    },
    clickDelete () {
      this.$emit('clickDelete')
      this.$refs.avatar.value = null
    },
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

.send__file--input{
  font-size: 0;
  width: 100%;
  height: 100%;
  position: absolute;
  border-radius: 50%;
  cursor: pointer;
  opacity: 0;
  z-index: 36;
}

.profile__img{
  display: flex;
  align-items: center;
  justify-content: center;
}

.img__cover{
  height: 100%;
  border-radius: 50%;
  object-fit: cover;
}

.cur_pointer{
  cursor: pointer;
}

.send__file--input{
  font-size: 0;
  width: 100%;
  height: 100%;
  position: absolute;
  opacity: 0;
}

</style>
