'use client'
import { useEffect, useState } from 'react'

export default function Notes() {
  const [data, setData] = useState([])
  const [loading, setLoading] = useState(true)
  useEffect(() => {
    fetch('https://service.pace11.my.id/api/notes')
      .then((res) => res.json())
      .then((data) => setData(data.data || []))
      .finally(() => setLoading(false))
  }, [])

  type ListNotes = {
    id: number
    title: string
    description: string
    created_at: string
    updated_at: string
  }

  if (loading) return <div>Loading...</div>
  return (
    <>{data.map((el: ListNotes) => <li key={el.id}>{el.title}</li>) || []}</>
  )
}
