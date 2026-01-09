import { useWeather } from '../hooks/useWeather'
import { useUnits } from '../hooks/useUnits'
import { getWeatherIcon, formatDate, celsiusToFahrenheit } from '../utils/weatherUtils'
import './WeatherCard.scss'
import { WeatherCardSkeleton } from './Skeletons/WeatherCardSkeleton'

interface Props {
  lat: number
  lon: number
}

export default function WeatherCard({ lat, lon }: Readonly<Props>) {
  const { units } = useUnits()
  const { data, isLoading, error } = useWeather(lat, lon)

  if (isLoading) return <WeatherCardSkeleton />
  if (error) return <p>Error al cargar el clima 😕</p>

  const { location, current } = data!
  const temp = units.temperature === 'fahrenheit' 
    ? celsiusToFahrenheit(current.temperature_2m) 
    : current.temperature_2m;
  const temperature = Math.round(temp)
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
      
      <div className="weather-card__weather flex items-center justify-around">
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
