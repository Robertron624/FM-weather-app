import { fetchWeatherApi } from 'openmeteo'

export interface WeatherData {
  time: Date[]
  temperature_2m: Float32Array
}

export const getWeatherByCoords = async (lat: number, lon: number): Promise<WeatherData> => {
  const params = {
    latitude: lat,
    longitude: lon,
    hourly: 'temperature_2m',
  }

  const url = 'https://api.open-meteo.com/v1/forecast'
  const responses = await fetchWeatherApi(url, params)
  const response = responses[0]

  if (!response) throw new Error('No se pudo obtener la respuesta del servidor.')

  const hourly = response.hourly()
  const utcOffsetSeconds = response.utcOffsetSeconds()

  if (!hourly) throw new Error('No se encontraron datos horarios.')

    const tempVar = hourly.variables(0)?.valuesArray()
    if(!tempVar) throw new Error('No se encontró la variable de temperatura')

  const weatherData: WeatherData = {
    time: [...Array((Number(hourly.timeEnd()) - Number(hourly.time())) / hourly.interval())].map(
      (_, i) => new Date((Number(hourly.time()) + i * hourly.interval() + utcOffsetSeconds) * 1000)
    ),
    temperature_2m: tempVar,
  }

  return weatherData
}
