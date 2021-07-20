import { http, date } from '../utils'

const key = process.env.VUE_APP_OPENWEATHER_API_KEY
const BaseUrl = 'https://api.openweathermap.org/data/2.5'

export const getCityWeatherByPeriod = async (city) => {
  const cityWeatherByPeriod = await http.get(`${BaseUrl}/weather?q=${city}&exclude=alerts,minutely,hourly&appid=${key}&units=metric`)

  if(cityWeatherByPeriod.message) return cityWeatherByPeriod

  const cityWeather = await getCityWeather(cityWeatherByPeriod.coord)

  const adaptedWeatherData = adaptResponseWeatherByPeriod(cityWeatherByPeriod, cityWeather)

  const previousWeather = await getPreviousWeather(cityWeatherByPeriod.coord)

  return { ...adaptedWeatherData, previousWeather }
}

const getCityWeather = async ({ lat, lon }) => {
  return await http.get(`${BaseUrl}/onecall?lat=${lat}&lon=${lon}&exclude=alerts,minutely,hourly&appid=${key}&units=metric`)
}

async function getPreviousWeather({ lat, lon }) {
  const previousDays = 5
  const requestBucket = []

  for (let i = 1; i <= previousDays; i++) {
    const timestamp = Math.round((Date.now() / 1000) - (i * 24 * 60 * 60))
    requestBucket.push(http.get(`${BaseUrl}/onecall/timemachine?lat=${lat}&lon=${lon}&dt=${timestamp}&appid=${key}&units=metric`))
  }

  const responseBucket = await Promise.all(requestBucket)

  return responseBucket.map(adaptPreviousWeatherResponse).reverse()
}

function adaptResponseWeatherByPeriod(cityWeatherByPeriod, cityWeather) {
  const dailyWeather = cityWeather.daily.map((item, index) => {
    item.temp.max = Math.round(item.temp.max)
    item.temp.min = Math.round(item.temp.min)

    item.isToday = index === 0 ? true : false
    return { ...item, weekday: date.getWeekdayName(item.dt) }
  })

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

function adaptPreviousWeatherResponse(response) {
  response.weekday = date.getWeekdayName(response.current.dt)

  const temp = getMinMaxTemps(response.hourly)

  return { ...response, temp }
}


function getMinMaxTemps(hours) {
  return hours.reduce((init, { temp }) => {
    if (init.min > temp) init.min = Math.round(temp)
    if (init.max < temp) init.max = Math.round(temp)

    return init
  }, { min: 100, max: -100 })
}
