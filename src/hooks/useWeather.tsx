import { useQuery } from '@tanstack/react-query'
import { getWeatherByCoords } from '../api/openMeteoApi'
import { getCityName } from '../api/geocodingApi'

export function useWeather(lat: number, lon: number) {
  return useQuery({
    queryKey: ['weather', lat, lon],
    queryFn: async () => {
      const [weather, location] = await Promise.all([
        getWeatherByCoords(lat, lon, 'metric'),
        getCityName(lat, lon)
      ])
      return { ...weather, location }
    },
    enabled: !!lat && !!lon,
    retry: 2,
    staleTime: 1000 * 60 * 5,
    refetchOnWindowFocus: false,
  })
}
