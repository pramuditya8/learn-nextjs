'use client'
import { useCount } from '@/context'
import { dataStore } from '@/store/dataStore'

export default function About() {
  const { count, setCount } = useCount()
  const { inc } = dataStore()

  return (
    <div>
      <h1>About Page</h1>
      <button onClick={() => setCount(count + 1)}>Count++ (Context)</button>
      <button onClick={() => inc()}>Count++ (Zustand)</button>
    </div>
  )
}
