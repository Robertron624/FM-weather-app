import { defaultUnits } from "@/constants"
import { Units } from "@/types"
import { ReactNode, useState } from "react"
import { UnitsContext } from "./UnitsContext"

export const  UnitsProvider = ({ children }: { children: ReactNode }) => {
  const [units, setUnits] = useState<Units>(defaultUnits)
  const [currentSystem, setCurrentSystem] = useState<'metric' | 'imperial'>('metric')
  return (
    <UnitsContext.Provider value={{ units, setUnits, currentSystem, setCurrentSystem }}>
      {children}
    </UnitsContext.Provider>
  )
}