import { createContext } from "react";
import type { Units } from "@/types";
import { defaultUnits } from "@/constants";

interface UnitsContextValue {
  currentSystem: 'metric' | 'imperial'
  setCurrentSystem: (s: 'metric' | 'imperial') => void
  units: Units
  setUnits: (u: Units) => void
}

export const UnitsContext = createContext<UnitsContextValue>({
    setUnits: () => {},
    units: defaultUnits,
    currentSystem: 'metric',
    setCurrentSystem: () => {}
})
