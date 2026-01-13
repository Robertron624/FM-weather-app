import { useWeather } from '../../hooks/useWeather'
import { useUnits } from '../../hooks/useUnits'
import './CurrentStats.scss'
import { limitDecimalPlaces } from '@/utils/utilityFunctions'
import { celsiusToFahrenheit, kmhToMph, mmToInch } from '@/utils/weatherUtils'
import type { Units, WeatherDataCurrent } from '@/types'

const gridItems = [
    {
        name: "feelsLike",
        title: "Feels Like",
        measure: "apparentTemperature"

    },
    {
        name: "humidity",
        title: "Humidity",
        measure: "humidity"
    },
    {
        name: "wind",
        title: "Wind",
        measure: "windSpeed"
    },
    {
        name: "precipitation",
        title: "Precipitation",
        measure: "precipitation"
    }
]

interface GridItemProps {
    title: string;
    value: string;
    unit: string;
}

function GridItem({
    title,
    value,
    unit,
    isLoading
}: GridItemProps & { isLoading?: boolean }) {
    const content = (title === "Feels Like" || title === "Humidity") ?
        <p>{value}{unit}</p> :
        <>
            <p>{value}</p>
            <p className='unit'>{unit}</p>
        </>

    return (
        <div className="grid-item">
            <p className='name'>{title}</p>
            <div className="value-container">
                {isLoading ? (
                    <p>__</p>
                ) : (
                    content
                )}
            </div>
        </div>
    )
}

interface Props {
    lat: number
    lon: number
}

const getStatValueAndUnit = (item: typeof gridItems[number], current: WeatherDataCurrent, units: Units) => {
    let value = ""
    let unit = ""

    switch (item.name) {
        case "feelsLike": {
            const temp = units.temperature === 'fahrenheit'
                ? celsiusToFahrenheit(current.apparent_temperature)
                : current.apparent_temperature;
            value = Math.round(temp).toString()
            unit = "°"
            break
        }
        case "humidity":
            value = current.relative_humidity_2m.toString()
            unit = "%"
            break
        case "wind": {
            const wind = units.windSpeed === 'mph'
                ? kmhToMph(current.wind_speed_10m)
                : current.wind_speed_10m;
            value = Math.round(wind).toString()
            unit = units.windSpeed === 'mph' ? "mph" : "km/h"
            break
        }
        case "precipitation": {
            const precip = units.precipitation === 'inch'
                ? mmToInch(current.precipitation)
                : current.precipitation;
            value = limitDecimalPlaces(precip, 2).toString()
            unit = units.precipitation === 'inch' ? "in" : "mm"
            break
        }
    }
    return { value, unit }
}

export const CurrentStats = ({ lat, lon }: Props) => {
    const { units } = useUnits()
    const { data, isLoading, error } = useWeather(lat, lon)

    if (error) return <p>Error loading stats</p>

    const { current } = data || {}

    return (
        <div className="current-stats-grid">
            {gridItems.map((item) => {
                const { value, unit } = (!isLoading && current)
                    ? getStatValueAndUnit(item, current, units)
                    : { value: "", unit: "" }

                return (
                    <GridItem
                        key={item.name}
                        title={item.title}
                        value={value}
                        unit={unit}
                        isLoading={isLoading}
                    />
                )
            })}
        </div>
    )
}
