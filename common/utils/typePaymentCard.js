import { VISA_REGEX, AMEX_REGEX, DISCOVER_REGEX, MASTERCARD_REGEX, TROY_REGEX } from '@/constants/regexes'
export const getTypeCard = (value) => {
  if (!value.match(VISA_REGEX)) {
    return 'visa'
  } else if (! value.match(AMEX_REGEX)) {
    return 'amex'
  } else if (! value.match(MASTERCARD_REGEX)) {
    return 'mastercard'
  } else if (! value.match(DISCOVER_REGEX)) {
    return 'discover'
  } else if (! value.match(TROY_REGEX)) {
    return 'troy'
  }
  // default type
  return 'visa'
}

export default {
  getTypeCard
}
