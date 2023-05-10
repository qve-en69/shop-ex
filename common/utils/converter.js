export const convertWeight = (value) => {
  const kg = Math.trunc(value / 1000)
  if (kg === 0) {
    return `${value} г`
  } else {
    return `${kg} кг ${value - kg * 1000} г`
  }
}

export default {
  convertWeight
}
