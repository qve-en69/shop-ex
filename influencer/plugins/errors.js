import create from '../utils/errors/errorsMessages'

export default ({ store }, inject) => {

  const errorRepo = create(store)
  const errorsBlock = {
    createShop: errorRepo('createShop'),
    addProduct: errorRepo('addProduct')
  }

  inject('errors', errorsBlock)
}
