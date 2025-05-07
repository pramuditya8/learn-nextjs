import { create } from 'zustand'
import { createJSONStorage, persist } from 'zustand/middleware'

type Store = {
  countZustand: number
  inc: () => void
}

export const dataStore = create<Store>()(
  persist(
    (set) => ({
      countZustand: 1,
      inc: () => set((state) => ({ countZustand: state.countZustand + 1 })),
    }),
    { name: 'data-store', storage: createJSONStorage(() => localStorage) },
  ),
)
