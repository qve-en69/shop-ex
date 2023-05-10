import { PRODUCT } from '@/constants/morphography'
export const morphProduct = (value) => {
  let result = ''
  let count = value % 100
  if (count >= 5 && count <= 20) {
    result = PRODUCT[1]
  } else {
    count = count % 10
    if (count === 1) {
      result = PRODUCT[0]
    } else if (count >= 2 && count <= 4) {
      result = PRODUCT[2]
    } else {
      result = PRODUCT[1]
    }
  }

  return result
}
