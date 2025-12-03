import { useState, useMemo } from 'react'
import { useWeather } from '@/hooks/useWeather'
import { useUnits } from '@/hooks/useUnits'
import { getWeatherIcon } from '@/utils/weatherUtils'
import './HourlyForecast.scss'

interface Props {
    lat: number
    lon: number
}

export const HourlyForecast = ({ lat, lon }: Props) => {
    const { currentSystem } = useUnits()
    const { data, isLoading, error } = useWeather(lat, lon, currentSystem)
    const [selectedDateIndex, setSelectedDateIndex] = useState(0)

    const dailyDates = useMemo(() => {
        if (!data) return []
        return data.daily.time
    }, [data])

    const hourlyData = useMemo(() => {
        if (!data) return []
        
        const selectedDate = dailyDates[selectedDateIndex]
        if (!selectedDate) return []

        // Filter hourly data for the selected date
        // The API returns hourly data for all days, we need to filter by day
        // We can compare the date part of the timestamp
        
        const startOfDay = new Date(selectedDate)
        startOfDay.setHours(0, 0, 0, 0)
        
        const endOfDay = new Date(selectedDate)
        endOfDay.setHours(23, 59, 59, 999)

        const indices: number[] = []
        data.time.forEach((date, index) => {
            if (date >= startOfDay && date <= endOfDay) {
                indices.push(index)
            }
        })

        return indices.map(index => ({
            time: data.time[index],
            temp: data.temperature_2m[index],
            weatherCode: data.weather_code_hourly[index]
        }))

    }, [data, dailyDates, selectedDateIndex])

    if (isLoading) return null // Or a loading skeleton if preferred, but main loading is handled elsewhere usually
    if (error || !data) return null

    const formatTime = (date: Date) => {
        return new Intl.DateTimeFormat('en-US', { hour: 'numeric', hour12: true }).format(date)
    }

    const formatDate = (date: Date) => {
        return new Intl.DateTimeFormat('en-US', { weekday: 'long' }).format(date)
    }

    return (
        <section className="hourly-forecast">
            <header>
                <h2>Hourly forecast</h2>
                <select
                    id='hourly-select'
                    value={selectedDateIndex} 
                    onChange={(e) => setSelectedDateIndex(Number(e.target.value))}
                >
                    {dailyDates.map((date, index) => (
                        <option key={index} value={index}>
                            {formatDate(date)}
                        </option>
                    ))}
                </select>
            </header>

            <div className="hourly-list">
                {hourlyData.map((item, index) => (
                    <div key={index} className="hourly-item">
                        <div className="left">
                            <img 
                                src={getWeatherIcon(item.weatherCode)} 
                                alt="Weather icon" 
                                className="weather-icon"
                            />
                            <span className="time">{formatTime(item.time)}</span>
                        </div>
                        <span className="temp">{Math.round(item.temp)}°</span>
                    </div>
                ))}
            </div>
        </section>
    )
}
