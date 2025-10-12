import { useWeather } from '../hooks/useWeather'

interface Props {
  lat: number
  lon: number
}

export default function WeatherCard({ lat, lon }: Props) {
  const { data, isLoading, error } = useWeather(lat, lon)

  if (isLoading) return <p>Cargando datos del clima...</p>
  if (error) return <p>Error al cargar el clima 😕</p>

  return (
    <div className="p-4 bg-blue-100 rounded-2xl shadow">
      <h2 className="font-semibold text-lg mb-2">Clima actual</h2>
      <p>Ubicación: {lat.toFixed(2)}, {lon.toFixed(2)}</p>
      <p>Temperatura actual: {data!.temperature_2m[0].toFixed(1)}°C</p>
      <p>Datos horarios: {data!.time.length} registros</p>
    </div>
  )
}
