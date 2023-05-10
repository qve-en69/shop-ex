import { sortBy, cloneDeep } from 'lodash'

export const sortProducts = (products, status) => {
  // Todo переделать под бэк
  if (status === 'expensive') {
    return sortBy(products, o => o.skus[0].price).reverse()
  } else if (status === 'cheap') {
    return sortBy(products, o => o.skus[0].price)
  } else {
    return sortBy(products, o => o.skus[0].price)
  }
}

export const sortFeatures = (skus) => {
  const arrSkus = cloneDeep(skus)
  return sortBy(arrSkus, o => {
    if (o.product_discount !== null) {
      return o.product_discount.discount.new_price
    } else {
      return o.price
    }
  })
}


export default {
  sortFeatures,
  sortProducts
}
