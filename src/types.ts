export type TemperatureUnit = "celsius" | "fahrenheit";
export type WindSpeedUnit = "kmh" | "mph";
export type PrecipitationUnit = "mm" | "inch";

export interface Units {
  temperature: TemperatureUnit;
  windSpeed: WindSpeedUnit;
  precipitation: PrecipitationUnit;
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

export interface WeatherDataCurrent {
  temperature_2m: number;
  weather_code: number;
  is_day: number;
  apparent_temperature: number;
  relative_humidity_2m: number;
  wind_speed_10m: number;
  precipitation: number;
}

export interface WeatherData {
  time: Date[];
  temperature_2m: Float32Array;
  weather_code_hourly: Float32Array;
  current: WeatherDataCurrent;
  daily: {
    time: Date[];
    weather_code: Float32Array;
    temperature_2m_max: Float32Array;
    temperature_2m_min: Float32Array;
  };
}
