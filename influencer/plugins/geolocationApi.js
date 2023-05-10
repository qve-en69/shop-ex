import axios from "axios"
export default ({ app, $axios }, inject) => {
  const getIp = () => {
    return axios.get('https://api.ipify.org?format=json',{})
  }

  const getCity = async (DADATA_KEY) => {
    const response = await getIp()
    return axios.get(`https://suggestions.dadata.ru/suggestions/api/4_1/rs/iplocate/address?ip=${response.data.ip}`,
      {
        mode: "cors",
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json",
          "Authorization": `Token ${DADATA_KEY}`
        }
      })
  }
  inject('getCity', getCity)
}
