import { defaultUnits } from "@/constants"
import { Units } from "@/types"
import { ReactNode, useState, useEffect, useMemo } from "react"
import { UnitsContext } from "./UnitsContext"

export const  UnitsProvider = ({ children }: { children: ReactNode }) => {
  const [units, setUnits] = useState<Units>(defaultUnits)
  const [currentSystem, setCurrentSystem] = useState<'metric' | 'imperial'>('metric')

  useEffect(() => {
    if (units.temperature === 'celsius') {
      setCurrentSystem('metric')
    } else {
      setCurrentSystem('imperial')
    }
  }, [units.temperature])

  const contextValue = useMemo(
    () => ({ units, setUnits, currentSystem, setCurrentSystem }),
    [units, currentSystem]
  )

  return (
    <UnitsContext.Provider value={contextValue}>
      {children}
    </UnitsContext.Provider>
  )
}