const key = process.env.VUE_APP_OPENWEATHER_API_KEY
const BaseUrl = 'https://api.openweathermap.org/data/2.5'

async function getApi (url) {
  try {
    const resp = await fetch(url)
    const data = await resp.json()
    return data
  } catch (error) {
    return error
  }
}

export const getCityWeather = async ({ lat, lon }) => {
  return await getApi(`${BaseUrl}/onecall?lat=${lat}&lon=${lon}&exclude=alerts,minutely,hourly&appid=${key}&units=metric`)
}

export const getCityWeatherByPeriod = async (city = 'São Paulo') => {
  const resp = await getApi(`${BaseUrl}/weather?q=${city}&exclude=alerts,minutely,hourly&appid=${key}&units=metric`)

  if (resp.cod !== 200) {
    return resp
  }

  const { coord } = resp

  return getCityWeather(coord)
}
