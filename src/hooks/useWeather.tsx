import { useQuery } from '@tanstack/react-query'
import { getWeatherByCoords } from '../api/openMeteoApi'
import { getCityName } from '../api/geocodingApi'

export function useWeather(lat: number, lon: number, unitSystem: 'metric' | 'imperial' = 'metric') {
  return useQuery({
    queryKey: ['weather', lat, lon, unitSystem],
    queryFn: async () => {
      const [weather, location] = await Promise.all([
        getWeatherByCoords(lat, lon, unitSystem),
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
