import { useWeather } from '../hooks/useWeather'
import { useUnits } from '../hooks/useUnits'
import { getWeatherIcon, formatDate } from '../utils/weatherUtils'
import './WeatherCard.scss'
import Loading from './Loading'

interface Props {
  lat: number
  lon: number
}

export default function WeatherCard({ lat, lon }: Props) {
  const { currentSystem } = useUnits()
  const { data, isLoading, error } = useWeather(lat, lon, currentSystem)

  if (isLoading) return <Loading />
  if (error) return <p>Error al cargar el clima 😕</p>

  const { location, current } = data!
  const temperature = Math.round(current.temperature_2m)
  const weatherIcon = getWeatherIcon(current.weather_code)
  const date = formatDate(new Date())

  return (
    <div className="weather-card flex flex-col padding-2 rounded-3xl shadow-lg justify-between mt-6 bg-no-repeat">
      <div className="weather-card__info flex flex-col">
        <h2 className="weather-card__city">
          {location.city}, {location.country}
        </h2>        
        <p className="weather-card__date">{date}</p>
      </div>
      
      <div className="weather-card__weather flex items-center justify-center">
        <img 
          src={weatherIcon} 
          alt="Weather icon" 
          className="weather-card__weather-icon object-contain"
        />
        <div className="weather-card__temperature text-6xl font-bold font-italic text-gray-900">
          {temperature}°
        </div>
      </div>
          </div>
  )
}
