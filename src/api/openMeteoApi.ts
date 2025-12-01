import { fetchWeatherApi } from 'openmeteo'

export interface WeatherData {
  time: Date[]
  temperature_2m: Float32Array
  current: {
    temperature_2m: number
    weather_code: number
    is_day: number
    apparent_temperature: number
    relative_humidity_2m: number
    wind_speed_10m: number
    precipitation: number
  }
}

export const getWeatherByCoords = async (lat: number, lon: number, unitSystem: 'metric' | 'imperial' = 'metric'): Promise<WeatherData> => {
  const params = {
    latitude: lat,
    longitude: lon,
    hourly: 'temperature_2m',
    current: ['temperature_2m', 'weather_code', 'is_day', 'apparent_temperature', 'relative_humidity_2m', 'wind_speed_10m', 'precipitation'],
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
  const utcOffsetSeconds = response.utcOffsetSeconds()

  if (!hourly || !current) throw new Error('No se encontraron datos completos.')

  const tempVar = hourly.variables(0)?.valuesArray()
  if(!tempVar) throw new Error('No se encontró la variable de temperatura')

  const weatherData: WeatherData = {
    time: [...Array((Number(hourly.timeEnd()) - Number(hourly.time())) / hourly.interval())].map(
      (_, i) => new Date((Number(hourly.time()) + i * hourly.interval() + utcOffsetSeconds) * 1000)
    ),
    temperature_2m: tempVar,
    current: {
      temperature_2m: current.variables(0)!.value(),
      weather_code: current.variables(1)!.value(),
      is_day: current.variables(2)!.value(),
      apparent_temperature: current.variables(3)!.value(),
      relative_humidity_2m: current.variables(4)!.value(),
      wind_speed_10m: current.variables(5)!.value(),
      precipitation: current.variables(6)!.value(),
    }
  }

  return weatherData
}
