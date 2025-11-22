export type TemperatureUnit = 'celsius' | 'fahrenheit'
export type WindSpeedUnit = 'kmh' | 'mph'
export type PrecipitationUnit = 'mm' | 'inch'

export interface Units {
    temperature: TemperatureUnit
    windSpeed: WindSpeedUnit
    precipitation: PrecipitationUnit
}