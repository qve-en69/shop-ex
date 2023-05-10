<template>
  <div class="section wf-section">
    <div class="container container-200">
      <div class="category-wrap">
        <div class="title-12">
          <h2 class="h2">{{ $t('Добро пожаловать в ShopShop!') }}</h2>
        </div>
        <p class="b1 b1-mb12">{{ $t('Здесь вы можете рекомендовать друзьям товары и зарабатывать процент с каждой продажи.') }}</p>
      </div>
      <div class="category-wrap">
        <div class="title-12">
          <h2 class="h2">{{ $t('Как заработать') }}</h2>
        </div>
        <p class="b1 b1-mb12">{{ $t('Аня — инфлюенсер. Она уже пользуется ShopShop, и в видео расскажет вам, как за 5 минут продать свой первый товар.') }}</p>
        <a href="#" class="video-block w-inline-block"><img src="@/static/images/product-img.png" loading="lazy" alt="" class="video-preview">
          <div class="play-icon w-embed"><svg width="24" height="24" viewbox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path fill-rule="evenodd" clip-rule="evenodd" d="M4.52081 2.12229C4.84189 1.947 5.23305 1.96101 5.54076 2.15882L19.5408 11.1588C19.827 11.3428 20 11.6597 20 12C20 12.3403 19.827 12.6572 19.5408 12.8412L5.54076 21.8412C5.23305 22.039 4.84189 22.053 4.52081 21.8777C4.19974 21.7024 4 21.3658 4 21V3C4 2.63419 4.19974 2.29758 4.52081 2.12229ZM6 4.83167V19.1683L17.1507 12L6 4.83167Z" fill="white"></path>
          </svg></div>
        </a>
      </div>
      <div class="title-12">
        <h2 class="h2">{{ $t('Как продавать свои товары') }}</h2>
      </div>
      <p class="b1 b1-mb12">{{ $t('Ниже мы нарисовали, как продать свой первый товар. На каждом шаге подробно объясним, как это сделать.') }}</p>
      <div class="category-wrap center">
        <div class="add-collection-placeholder">
          <div class="add-colection-item">
            <div class="add-collection-img">
              <div class="add-collection-icon w-embed"><svg width="48" height="48" viewbox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path fill-rule="evenodd" clip-rule="evenodd" d="M24.0001 8C25.1046 8 26.0001 8.89543 26.0001 10V22H38.0001C39.1046 22 40.0001 22.8954 40.0001 24C40.0001 25.1046 39.1046 26 38.0001 26H26.0001V38C26.0001 39.1046 25.1046 40 24.0001 40C22.8955 40 22.0001 39.1046 22.0001 38V26H10.0001C8.89549 26 8.00006 25.1046 8.00006 24C8.00006 22.8954 8.89549 22 10.0001 22H22.0001V10C22.0001 8.89543 22.8955 8 24.0001 8Z" fill="#ED6A9A"></path>
              </svg></div>
              <div class="arrow-absolute w-embed"><svg width="24" height="24" viewbox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path fill-rule="evenodd" clip-rule="evenodd" d="M11.2929 4.29289C11.6834 3.90237 12.3166 3.90237 12.7071 4.29289L19.7071 11.2929C20.0976 11.6834 20.0976 12.3166 19.7071 12.7071L12.7071 19.7071C12.3166 20.0976 11.6834 20.0976 11.2929 19.7071C10.9024 19.3166 10.9024 18.6834 11.2929 18.2929L16.5858 13H5C4.44772 13 4 12.5523 4 12C4 11.4477 4.44772 11 5 11H16.5858L11.2929 5.70711C10.9024 5.31658 10.9024 4.68342 11.2929 4.29289Z" fill="#E7E7E9"></path>
              </svg></div>
            </div>
            <div>{{ $t('Создайте коллекцию') }}</div>
          </div>
          <div class="add-colection-item">
            <div class="add-collection-img">
              <div class="add-collection-icon w-embed"><svg width="48" height="48" viewbox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path fill-rule="evenodd" clip-rule="evenodd" d="M10.4 2.8C10.7777 2.29639 11.3705 2 12 2H36C36.6295 2 37.2223 2.29639 37.6 2.8L43.6 10.8C43.8596 11.1462 44 11.5673 44 12V40C44 41.5913 43.3679 43.1174 42.2426 44.2426C41.1174 45.3679 39.5913 46 38 46H10C8.4087 46 6.88258 45.3679 5.75736 44.2426C4.63214 43.1174 4 41.5913 4 40V12C4 11.5673 4.14036 11.1462 4.4 10.8L10.4 2.8ZM13 6L10 10H38L35 6H13ZM40 14H8V40C8 40.5304 8.21071 41.0391 8.58579 41.4142C8.96086 41.7893 9.46957 42 10 42H38C38.5304 42 39.0391 41.7893 39.4142 41.4142C39.7893 41.0391 40 40.5304 40 40V14ZM16 18C17.1046 18 18 18.8954 18 20C18 21.5913 18.6321 23.1174 19.7574 24.2426C20.8826 25.3679 22.4087 26 24 26C25.5913 26 27.1174 25.3679 28.2426 24.2426C29.3679 23.1174 30 21.5913 30 20C30 18.8954 30.8954 18 32 18C33.1046 18 34 18.8954 34 20C34 22.6522 32.9464 25.1957 31.0711 27.0711C29.1957 28.9464 26.6522 30 24 30C21.3478 30 18.8043 28.9464 16.9289 27.0711C15.0536 25.1957 14 22.6522 14 20C14 18.8954 14.8954 18 16 18Z" fill="#ED6A9A"></path>
              </svg></div>
              <div class="arrow-absolute w-embed"><svg width="24" height="24" viewbox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path fill-rule="evenodd" clip-rule="evenodd" d="M11.2929 4.29289C11.6834 3.90237 12.3166 3.90237 12.7071 4.29289L19.7071 11.2929C20.0976 11.6834 20.0976 12.3166 19.7071 12.7071L12.7071 19.7071C12.3166 20.0976 11.6834 20.0976 11.2929 19.7071C10.9024 19.3166 10.9024 18.6834 11.2929 18.2929L16.5858 13H5C4.44772 13 4 12.5523 4 12C4 11.4477 4.44772 11 5 11H16.5858L11.2929 5.70711C10.9024 5.31658 10.9024 4.68342 11.2929 4.29289Z" fill="#E7E7E9"></path>
              </svg></div>
            </div>
            <div>{{ $t('Добавьте товары') }}</div>
          </div>
          <div class="add-colection-item">
            <div class="add-collection-img">
              <div class="add-collection-icon w-embed"><svg width="48" height="48" viewbox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path fill-rule="evenodd" clip-rule="evenodd" d="M22.5857 2.58579C23.3668 1.80474 24.6331 1.80474 25.4142 2.58579L33.4142 10.5858C34.1952 11.3668 34.1952 12.6332 33.4142 13.4142C32.6331 14.1953 31.3668 14.1953 30.5857 13.4142L25.9999 8.82843L25.9999 30C25.9999 31.1046 25.1045 32 23.9999 32C22.8954 32 21.9999 31.1046 21.9999 30L21.9999 8.82843L17.4142 13.4142C16.6331 14.1953 15.3668 14.1953 14.5857 13.4142C13.8047 12.6332 13.8047 11.3668 14.5857 10.5858L22.5857 2.58579ZM7.99994 22C9.10451 22 9.99994 22.8954 9.99994 24V40C9.99994 40.5304 10.2107 41.0391 10.5857 41.4142C10.9608 41.7893 11.4695 42 11.9999 42H35.9999C36.5304 42 37.0391 41.7893 37.4142 41.4142C37.7892 41.0391 37.9999 40.5304 37.9999 40V24C37.9999 22.8954 38.8954 22 39.9999 22C41.1045 22 41.9999 22.8954 41.9999 24V40C41.9999 41.5913 41.3678 43.1174 40.2426 44.2426C39.1174 45.3679 37.5912 46 35.9999 46H11.9999C10.4086 46 8.88252 45.3679 7.7573 44.2426C6.63208 43.1174 5.99994 41.5913 5.99994 40V24C5.99994 22.8954 6.89537 22 7.99994 22Z" fill="#ED6A9A"></path>
              </svg></div>
            </div>
            <div>{{ $t('Поделитесь ссылкой') }}</div>
          </div>
        </div>
      </div>
      <div class="button-wrap">
        <button type='button' class="button-primary button-primary-big w-inline-block" @click='clickContinue'>
          {{ $t('Продолжить') }}
        </button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'WelcomePage',
  emits: {
    clickContinue: null
  },
  methods: {
    clickContinue () {
      this.$emit('clickContinue')
    }
  }
}
</script>

<style scoped>

</style>
