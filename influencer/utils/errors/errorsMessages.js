export const messages = {
  createShop: {
    'Not supported form data.': {
      status: 415,
      ruMessage: 'Создание магазина временно не работает :('
    },
    'influencer shop с таким external id уже существует.': {
      status: 400,
      ruMessage: 'Уже существует магазин с такой ссылкой.'
    }
  },
  addProduct: {

  }
}

export default store => resource => ({
  setMessage (message) {
    const resMessage = messages[resource][message] ? messages[resource][message].ruMessage : message
    store.dispatch('error/handleActiveError', true)
    store.dispatch('error/handleMessageError', resMessage)
  }
})
