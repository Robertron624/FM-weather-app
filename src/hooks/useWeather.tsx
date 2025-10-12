import { useQuery } from '@tanstack/react-query'
import { getWeatherByCoords } from '../api/openMeteoApi'

export function useWeather(lat: number, lon: number) {
  return useQuery({
    queryKey: ['weather', lat, lon],
    queryFn: () => getWeatherByCoords(lat, lon),
    enabled: !!lat && !!lon, // evita ejecutar si no hay coordenadas
    retry: 2, // reintenta en caso de error
    staleTime: 1000 * 60 * 5, // cache por 5 minutos
    refetchOnWindowFocus: false, // evita refetch al cambiar de pestaña
  })
}
