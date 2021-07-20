import { http, date } from '../utils'

const key = process.env.VUE_APP_OPENWEATHER_API_KEY
const BaseUrl = 'https://api.openweathermap.org/data/2.5'

export const getCityWeather = async ({ lat, lon }) => {
  return await http.get(`${BaseUrl}/onecall?lat=${lat}&lon=${lon}&exclude=alerts,minutely,hourly&appid=${key}&units=metric`)
}

export const getCityWeatherByPeriod = async (city) => {
  const cityWeatherByPeriod = await http.get(`${BaseUrl}/weather?q=${city}&exclude=alerts,minutely,hourly&appid=${key}&units=metric`)

  const cityWeather = await getCityWeather(cityWeatherByPeriod.coord)

  return adaptResponse(cityWeatherByPeriod, cityWeather)
}

function adaptResponse(cityWeatherByPeriod, cityWeather) {
  const dailyWeather = cityWeather.daily.map(item => ({ ...item, weekday: date.getWeekdayName(item.dt) }))
  cityWeather.current.sunrise = date.getTime2Digit(cityWeather.current.sunrise)
  cityWeather.current.sunset = date.getTime2Digit(cityWeather.current.sunset)
  cityWeatherByPeriod.main.temp = Math.round(cityWeatherByPeriod.main.temp)
  cityWeatherByPeriod.main.temp_min = Math.round(cityWeatherByPeriod.main.temp_min)
  cityWeatherByPeriod.main.temp_max = Math.round(cityWeatherByPeriod.main.temp_max)

  return {
    daily: dailyWeather,
    current: {
      ...cityWeather.current,
      ...cityWeatherByPeriod.main
    }
  }
}
