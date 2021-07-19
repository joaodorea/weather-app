import { http } from '../utils'

const key = process.env.VUE_APP_OPENWEATHER_API_KEY
const BaseUrl = 'https://api.openweathermap.org/data/2.5'

export const getCityWeather = async ({ lat, lon }) => {
  return await http.get(`${BaseUrl}/onecall?lat=${lat}&lon=${lon}&exclude=alerts,minutely,hourly&appid=${key}&units=metric`)
}

export const getCityWeatherByPeriod = async (city = 'São Paulo') => {
  const resp = await http.get(`${BaseUrl}/weather?q=${city}&exclude=alerts,minutely,hourly&appid=${key}&units=metric`)

  if (resp.cod !== 200) {
    return resp
  }

  const { coord } = resp

  return getCityWeather(coord)
}
