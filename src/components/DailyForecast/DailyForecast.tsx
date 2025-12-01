import { useWeather } from '@/hooks/useWeather'
import { useUnits } from '@/hooks/useUnits'
import { getWeatherIcon } from '@/utils/weatherUtils'
import './DailyForecast.scss'
import Loading from '../Loading'

interface Props {
    lat: number
    lon: number
}

export const DailyForecast = ({ lat, lon }: Props) => {
    const { currentSystem } = useUnits()
    const { data, isLoading, error } = useWeather(lat, lon, currentSystem)

    if (isLoading) return <Loading />
    if (error) return <p>Error loading forecast</p>
    if (!data) return null

    const { daily } = data

    // Helper to format day name
    const getDayName = (date: Date) => {
        return new Intl.DateTimeFormat('en-US', { weekday: 'short' }).format(date)
    }

    return (
        <div className="daily-forecast">
            {daily.time.map((date, index) => (
                <div key={index} className="forecast-item">
                    <p className="day">{getDayName(date)}</p>
                    <img 
                        src={getWeatherIcon(daily.weather_code[index])} 
                        alt="Weather icon" 
                        className="weather-icon"
                    />
                    <div className="temps">
                        <span className="max">{Math.round(daily.temperature_2m_max[index])}°</span>
                        <span className="min">{Math.round(daily.temperature_2m_min[index])}°</span>
                    </div>
                </div>
            ))}
        </div>
    )
}
