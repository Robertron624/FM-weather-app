import { fetchWeatherApi } from 'openmeteo'
import type { WeatherData } from '@/types'

export const getWeatherByCoords = async (lat: number, lon: number, unitSystem: 'metric' | 'imperial' = 'metric'): Promise<WeatherData> => {
  const params = {
    latitude: lat,
    longitude: lon,
    hourly: ['temperature_2m', 'weather_code'],
    current: ['temperature_2m', 'weather_code', 'is_day', 'apparent_temperature', 'relative_humidity_2m', 'wind_speed_10m', 'precipitation'],
    daily: ['weather_code', 'temperature_2m_max', 'temperature_2m_min'],
    temperature_unit: unitSystem === 'metric' ? 'celsius' : 'fahrenheit',
    wind_speed_unit: unitSystem === 'metric' ? 'kmh' : 'mph',
    precipitation_unit: unitSystem === 'metric' ? 'mm' : 'inch',
  }

  const url = 'https://api.open-meteo.com/v1/forecast'
  const responses = await fetchWeatherApi(url, params)
  const response = responses[0]

  if (!response) throw new Error('No se pudo obtener la respuesta del servidor.')

  const hourly = response.hourly()
  const current = response.current()
  const daily = response.daily()
  const utcOffsetSeconds = response.utcOffsetSeconds()

  if (!hourly || !current || !daily) throw new Error('No se encontraron datos completos.')

  const tempVar = hourly.variables(0)?.valuesArray()
  const weatherCodeVar = hourly.variables(1)?.valuesArray()
  
  if(!tempVar || !weatherCodeVar) throw new Error('No se encontró la variable de temperatura o código de clima')

  const dailyWeatherCode = daily.variables(0)?.valuesArray()
  const dailyMax = daily.variables(1)?.valuesArray()
  const dailyMin = daily.variables(2)?.valuesArray()

  if (!dailyWeatherCode || !dailyMax || !dailyMin) throw new Error('No se encontraron los datos diarios completos.')

  const weatherData: WeatherData = {
    time: Array.from(
      { length: (Number(hourly.timeEnd()) - Number(hourly.time())) / hourly.interval() },
      (_, i) => new Date((Number(hourly.time()) + i * hourly.interval() + utcOffsetSeconds) * 1000)
    ),
    temperature_2m: tempVar,
    weather_code_hourly: weatherCodeVar,
    current: {
      temperature_2m: current.variables(0)!.value(),
      weather_code: current.variables(1)!.value(),
      is_day: current.variables(2)!.value(),
      apparent_temperature: current.variables(3)!.value(),
      relative_humidity_2m: current.variables(4)!.value(),
      wind_speed_10m: current.variables(5)!.value(),
      precipitation: current.variables(6)!.value(),
    },
    daily: {
      time: Array.from(
        { length: (Number(daily.timeEnd()) - Number(daily.time())) / daily.interval() },
        (_, i) => new Date((Number(daily.time()) + i * daily.interval() + utcOffsetSeconds) * 1000)
      ),
      weather_code: dailyWeatherCode,
      temperature_2m_max: dailyMax,
      temperature_2m_min: dailyMin,
    }
  }

  return weatherData
}
