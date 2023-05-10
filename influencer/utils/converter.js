import { LIBRARY } from '@/constants/transliterate'
export const convertWeight = (value) => {
  const kg = Math.trunc(value / 1000)
  if (kg === 0) {
    return `${value} г`
  } else {
    return `${kg} кг ${value - kg * 1000} г`
  }
}

export const transliterate = (string) => {
  string = string.replace(/зг/gi, 'zgh');
  let result = '';
  for(let i = 0; i < string.length; i++){
    result += LIBRARY[string[i]] || LIBRARY[string[i]] === '' ? LIBRARY[string[i]] : string[i];
  }
  return result;
};

export default {
  convertWeight,
  transliterate
}
