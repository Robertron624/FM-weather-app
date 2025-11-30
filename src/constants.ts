import type { Units } from "./types";

export const defaultUnits: Units = {
  temperature: "celsius",
  windSpeed: "kmh",
  precipitation: "mm",
};

export const unitSelectGroups = [
  {
    title: "Temperature",
    key: "temperature",
    options: [
      { label: "°C", value: "celsius" },
      { label: "°F", value: "fahrenheit" },
    ],
  },
  {
    title: "Wind Speed",
    key: "windSpeed",
    options: [
      { label: "km/h", value: "kmh" },
      { label: "mph", value: "mph" },
    ],
  },
  {
    title: "Precipitation",
    key: "precipitation",
    options: [
      { label: "mm", value: "mm" },
      { label: "in", value: "inch" },
    ],
  },
] as const;

