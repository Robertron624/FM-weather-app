import { useWeather } from '../../hooks/useWeather'
import { useUnits } from '../../hooks/useUnits'
import './CurrentStats.scss'
import { limitDecimalPlaces } from '@/utils/utilityFunctions'

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
    return (
        <div className="grid-item">
            <p className='name'>{title}</p>
            <div className="value-container">
                {isLoading ? (
                    <p>__</p>
                ) : (
                    (title === "Feels Like" || title === "Humidity") ?
                        <p>{value}{unit}</p> :
                        <>
                            <p>{value}</p>
                            <p className='unit'>{unit}</p>
                        </>
                )}
            </div>
        </div>
    )
}

interface Props {
    lat: number
    lon: number
}

export const CurrentStats = ({ lat, lon }: Props) => {
    const { currentSystem } = useUnits()
    const { data, isLoading, error } = useWeather(lat, lon, currentSystem)

    if (error) return <p>Error loading stats</p>

    const { current } = data || {}

    return (
        <div className="current-stats-grid">
            {gridItems.map((item) => {
                let value = ""
                let unit = ""

                if (!isLoading && current) {
                    switch (item.name) {
                        case "feelsLike":
                            value = Math.round(current.apparent_temperature).toString()
                            unit = "°"
                            break
                        case "humidity":
                            value = current.relative_humidity_2m.toString()
                            unit = "%"
                            break
                        case "wind":
                            value = Math.round(current.wind_speed_10m).toString()
                            unit = currentSystem === 'metric' ? "km/h" : "mph"
                            break
                        case "precipitation":
                            value = limitDecimalPlaces(current.precipitation, 2).toString()
                            unit = currentSystem === 'metric' ? "mm" : "in"
                            break
                    }
                }

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
