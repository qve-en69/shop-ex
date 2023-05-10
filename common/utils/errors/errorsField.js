import {isValidNumber, parsePhoneNumber} from 'libphonenumber-js'
import {
  ERROR_EMPTY,
  ERROR_EMAIL_FORMAT,
  ERROR_PHONE_FORMAT,
  ERROR_LOCATION_FORMAT,
  ERROR_AGREEMENT,
  ERROR_HAVE_LOCALITY, ERROR_HAVE_COUNTRY
} from '@/constants/errors'
import { MAIL_REGEX } from '@/constants/regexes'

export const emptyField = (value) => {
  if (value === '' || value === null) {
    return ERROR_EMPTY
  } else {
    return ''
  }
}

export const validFieldEmail = (value) => {
  if (!value.match(MAIL_REGEX)) {
    return ERROR_EMAIL_FORMAT
  } else {
    return ''
  }
}

export const validFieldPhone = (value) => {
  try {
    const phone = parsePhoneNumber(value)
    if (isValidNumber(phone.number)) {
      return  { phone: phone.number, error: ''}
    } else {
      return { phone:  value, error: ERROR_PHONE_FORMAT}
    }
  } catch (e) {
    return { phone: value, error: ERROR_PHONE_FORMAT}
  }
}

export const validFieldLocation = (value) => {
    const partsValue = value.split(',')
    if (partsValue.length !== 4) {
      return ERROR_LOCATION_FORMAT
    } else {
      return ''
    }
}

export const validFieldLocationDaData = (value) => {
  if (value.country === ''){
    return 'Введите страну'
  } else if (value.city === '') {
    return 'Введите город'
  } else if (value.street === '') {
    return 'Введите улицу'
  } else if (value.house === '') {
    return 'Введите дом'
  } else {
    return ''
  }
}

export const validCheckAgreement = (value) => {
  return value === false ? ERROR_AGREEMENT : ''
}

// Todo убрать когда будет проверка на бэке
export const validLocality = (value, locality) => {
  const localityItems =  locality.find(item => item.name.toLowerCase() === value.trim().toLowerCase())
  if (localityItems !== undefined) {
    return ''
  } else {
    return ERROR_HAVE_LOCALITY
  }
}

// Todo убрать когда будет проверка на бэке
export const validCountry = (value, country) => {
  const countryItems =  country.find(item => item.name.toLowerCase() === value.trim().toLowerCase())
  if (countryItems !== undefined) {
    return ''
  } else {
    return ERROR_HAVE_COUNTRY
  }
}

export const validCvv = (params) => (value) => {
  return value.length === params.length;
}

export const validNumber = (params) => (value) => {
  return value.length === params.length;
}

export default {
  emptyField,
  validFieldEmail,
  validFieldPhone,
  validLocality,
  validCountry,
  validCvv,
  validNumber
}
