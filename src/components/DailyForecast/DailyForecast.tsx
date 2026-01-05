import { useWeather } from '@/hooks/useWeather'
import { useUnits } from '@/hooks/useUnits'
import { getWeatherIcon, celsiusToFahrenheit } from '@/utils/weatherUtils'
import './DailyForecast.scss'
import { DailyForecastSkeleton } from '../Skeletons/DailyForecastSkeleton'

interface Props {
    lat: number
    lon: number
}

export const DailyForecast = ({ lat, lon }: Props) => {
    const { units } = useUnits()
    const { data, isLoading, error } = useWeather(lat, lon)

    if (isLoading) return <DailyForecastSkeleton />
    if (error) return <p>Error loading forecast</p>
    if (!data) return null

    const { daily } = data

    // Helper to format day name
    const getDayName = (date: Date) => {
        return new Intl.DateTimeFormat('en-US', { weekday: 'short' }).format(date)
    }

    return (
        <div className="daily-forecast">
            <h2 className="section-title">
                Daily forecast
            </h2>
            <div className="forecast-items">
                {daily.time.map((date, index) => {
                    const maxTemp = units.temperature === 'fahrenheit'
                        ? celsiusToFahrenheit(daily.temperature_2m_max[index])
                        : daily.temperature_2m_max[index];
                    const minTemp = units.temperature === 'fahrenheit'
                        ? celsiusToFahrenheit(daily.temperature_2m_min[index])
                        : daily.temperature_2m_min[index];

                    return (
                        <div key={index} className="forecast-item">
                            <p className="day">{getDayName(date)}</p>
                            <img 
                                src={getWeatherIcon(daily.weather_code[index])} 
                                alt="Weather icon" 
                                className="weather-icon mx-auto"
                            />
                            <div className="temps justify-between">
                                <span className="max">{Math.round(maxTemp)}°</span>
                                <span className="min">{Math.round(minTemp)}°</span>
                            </div>
                        </div>
                    )
                })}
            </div>
        </div>
    )
}
