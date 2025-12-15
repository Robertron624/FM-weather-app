export type TemperatureUnit = 'celsius' | 'fahrenheit'
export type WindSpeedUnit = 'kmh' | 'mph'
export type PrecipitationUnit = 'mm' | 'inch'

export interface Units {
    temperature: TemperatureUnit
    windSpeed: WindSpeedUnit
    precipitation: PrecipitationUnit
}

export interface GeocodingData {
  city: string;
  country: string;
}

export interface LocationSearchResult {
  id: number;
  name: string;
  latitude: number;
  longitude: number;
  country: string;
  admin1?: string; // State/Region
}