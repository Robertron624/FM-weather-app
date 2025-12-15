import { useState, useMemo, useRef } from 'react'
import { useWeather } from '@/hooks/useWeather'
import { useUnits } from '@/hooks/useUnits'
import { useOnClickOutside } from '@/hooks/useOnClickOutside'
import { getWeatherIcon } from '@/utils/weatherUtils'
import './HourlyForecast.scss'
import { HourlyForecastSkeleton } from '../Skeletons/HourlyForecastSkeleton'

interface Props {
    lat: number
    lon: number
}

export const HourlyForecast = ({ lat, lon }: Props) => {
    const { currentSystem } = useUnits()
    const { data, isLoading, error } = useWeather(lat, lon, currentSystem)
    const [selectedDateIndex, setSelectedDateIndex] = useState(0)
    const [isDropdownOpen, setIsDropdownOpen] = useState(false)
    const dropdownRef = useRef<HTMLDivElement>(null)

    useOnClickOutside(dropdownRef, () => setIsDropdownOpen(false))

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

    if (error) return <p>Error loading forecast</p>

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
                <div className="hourly-forecast__dropdown" ref={dropdownRef}>
                    <button 
                        className="hourly-forecast__dropdown-trigger"
                        onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                        disabled={isLoading}
                        aria-expanded={isDropdownOpen}
                    >
                        <span>{isLoading ? 'Loading...' : (dailyDates[selectedDateIndex] ? formatDate(dailyDates[selectedDateIndex]) : '')}</span>
                        <img 
                            src="/images/icon-dropdown.svg" 
                            alt="Dropdown" 
                            className="dropdown-icon"
                            data-open={isDropdownOpen}
                        />
                    </button>

                    {isDropdownOpen && !isLoading && (
                        <div className="hourly-forecast__dropdown-menu">
                            {dailyDates.map((date, index) => (
                                <div 
                                    key={index} 
                                    className="hourly-forecast__dropdown-item"
                                    onClick={() => {
                                        setSelectedDateIndex(index)
                                        setIsDropdownOpen(false)
                                    }}
                                >
                                    <span>{formatDate(date)}</span>
                                    {index === selectedDateIndex && (
                                        <img src="/images/icon-checkmark.svg" alt="Selected" />
                                    )}
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </header>

            {isLoading ? (
                <HourlyForecastSkeleton />
            ) : (
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
            )}
        </section>
    )
}
