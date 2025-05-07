'use client'

import { createContext, useContext, useState, ReactNode } from 'react'

const countContext = createContext<any>(null)

export function CountProvider({ children }: { children: ReactNode }) {
  const [count, setCount] = useState(0)

  return (
    <countContext.Provider value={{ count, setCount }}>
      {children}
    </countContext.Provider>
  )
}

export function useCount() {
  return useContext(countContext)
}
