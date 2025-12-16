export function getWeatherIcon(code: number): string {
  // WMO Weather interpretation codes (WW)
  // 0: Clear sky
  // 1, 2, 3: Mainly clear, partly cloudy, and overcast
  // 45, 48: Fog and depositing rime fog
  // 51, 53, 55: Drizzle: Light, moderate, and dense intensity
  // 56, 57: Freezing Drizzle: Light and dense intensity
  // 61, 63, 65: Rain: Slight, moderate and heavy intensity
  // 66, 67: Freezing Rain: Light and heavy intensity
  // 71, 73, 75: Snow fall: Slight, moderate, and heavy intensity
  // 77: Snow grains
  // 80, 81, 82: Rain showers: Slight, moderate, and violent
  // 85, 86: Snow showers slight and heavy
  // 95: Thunderstorm: Slight or moderate
  // 96, 99: Thunderstorm with slight and heavy hail

  switch (code) {
    case 0:
      return '/images/icon-sunny.webp';
    case 1:
    case 2:
      return '/images/icon-partly-cloudy.webp';
    case 3:
      return '/images/icon-overcast.webp';
    case 45:
    case 48:
      return '/images/icon-fog.webp';
    case 51:
    case 53:
    case 55:
    case 56:
    case 57:
      return '/images/icon-drizzle.webp';
    case 61:
    case 63:
    case 65:
    case 66:
    case 67:
    case 80:
    case 81:
    case 82:
      return '/images/icon-rain.webp';
    case 71:
    case 73:
    case 75:
    case 77:
    case 85:
    case 86:
      return '/images/icon-snow.webp';
    case 95:
    case 96:
    case 99:
      return '/images/icon-storm.webp';
    default:
      return '/images/icon-sunny.webp';
  }
}

export function formatDate(date: Date): string {
  return new Intl.DateTimeFormat('en-US', {
    weekday: 'long',
    day: 'numeric',
    month: 'short',
  }).format(date);
}

export const celsiusToFahrenheit = (celsius: number) => (celsius * 9/5) + 32;
export const kmhToMph = (kmh: number) => kmh * 0.621371;
export const mmToInch = (mm: number) => mm / 25.4;
