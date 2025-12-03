import { useWeather } from '../../hooks/useWeather'
import { useUnits } from '../../hooks/useUnits'
import Loading from '../Loading'
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
    unit
}: GridItemProps) {
    return (
        <div className="grid-item">
            <p className='name'>{title}</p>
            <div className="value-container">
                {
                    (title === "Feels Like" || title === "Humidity") ?
                        <p>{value}{unit}</p> :
                        <>
                            <p>{
                                limitDecimalPlaces(Number(value), 4)
                            }</p>
                            <p>{unit}</p>
                        </>
                }
            </div>
        </div>
    )
}

interface Props {
    lat: number
    lon: number
}

export function CurrentStats({ lat, lon }: Props) {
    const { currentSystem, units } = useUnits()
    const { data, isLoading, error } = useWeather(lat, lon, currentSystem)

    console.log(data)

    if (isLoading) return <Loading />
    if (error) return <p>Error loading stats</p>
    if (!data) return null

    const { current } = data

    const getUnitLabel = (measure: string) => {
        switch(measure) {
            case 'apparentTemperature': return units.temperature === 'celsius' ? '°C' : '°F'
            case 'humidity': return '%'
            case 'windSpeed': return units.windSpeed === 'kmh' ? 'km/h' : 'mph'
            case 'precipitation': return units.precipitation === 'mm' ? 'mm' : 'in'
            default: return ''
        }
    }

    const getValue = (measure: string) => {
        switch(measure) {
            case 'apparentTemperature': return Math.round(current.apparent_temperature).toString()
            case 'humidity': return Math.round(current.relative_humidity_2m).toString()
            case 'windSpeed': return Math.round(current.wind_speed_10m).toString()
            case 'precipitation': return current.precipitation.toString()
            default: return ''
        }
    }

    return (
        <div className="current-stats-grid">
            {gridItems.map(item => (
                <GridItem
                    key={item.name}
                    title={item.title}
                    value={getValue(item.measure)}
                    unit={getUnitLabel(item.measure)}
                />
            ))}
        </div>
    )
}