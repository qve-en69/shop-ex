export const parseFeatures = (features) => {
  const curFeature = {}
  features.forEach(feature => {
    const { name,description } = feature.feature
    if (!curFeature[name]) {
      curFeature[name] = {
        description,
        value: feature.value
      }
    }
  })
  return curFeature
}

export const parseLocation = (location) => {
  const dictLocation = {
    0: 'country',
    1: 'city',
    2: 'street',
    3: 'building'
  }
  const result = {}
  location.split(',').forEach((item, index) => {
    result[dictLocation[index]] = item === '-' ? null : item
  })
  return result
}

export const parseAddress = (address) => {
  const data = {}
  data.firstName = address.first_name
  data.lastName = address.last_name
  data.phoneNumber = address.phone_number
  data.email = address.email
  data.comment = address.comment
  data.street = address.street
  data.building = address.building
  data.flat = address.flat
  data.floor = address.floor
  data.index = address.postcode
  data.location = {
    fullAddress: `${address.country.name}, ${address.locality.name}, ${address.street}, ${address.building}`,
    country: address.country.name,
    city: address.locality.name,
    street: address.street,
    house: address.building
  }
  data.errors ={
    firstName: '',
    lastName: '',
    email: '',
    phoneNumber: '',
    location: '',
  }

  return data
}

export const findSku = (skus, payload) => {
  return skus.find(sku => {
    if (sku.features.length > 0){
      const parseSkuFeatures = parseFeatures(sku.features)
      const isFind  = payload.every((item) => {
        if (!sku[item.name]) {
          if (parseSkuFeatures[item.name] && parseSkuFeatures[item.name].value === item.value) {
            return true
          }
        } else if (sku[item.name] === item.value) {
          return true
        }
        return false
      })
      if (isFind) {
        return sku
      }
    }
    return null
  })
}

export const findWishList = (wishlist, id) => {
  return wishlist.find(item => item.product_sku.id === id)
}

export const findCountry = (value, country) => {
  return country.find(item => item.name.toLowerCase() === value.trim().toLowerCase())
}

export const parseCoords = (value) => {
  const splitValue = value.split('POINT ')[1].replace('(', '').replace(')', '').split(' ')
  return [splitValue[1], splitValue[0]]
}

export const bUrlToFile = (blobUrl) => new Promise((resolve) => {
  const name = blobUrl.split('/')
  fetch(blobUrl).then((res) => {
    res.blob().then((blob) => {
      const file = new File([blob], `${name[name.length-1]}`, {type: `image/${name[name.length-1].split('.')[1]}`})
      resolve(file)
    })
  })
})


export default {
  parseFeatures,
  findSku,
  findCountry,
  findWishList,
  parseAddress,
  parseLocation,
  parseCoords,
  bUrlToFile
}
