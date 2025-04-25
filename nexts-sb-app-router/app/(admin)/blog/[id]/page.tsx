// export default async function BlogDetail({
//   params,
// }: {
//   params: Promise<{ id: string }>
// }) {
//   console.log('params', params)
//   const id = (await params).id
//   return <div>Blog Detail Page {id}</div>
// }

'use client'
import { useParams, useSearchParams } from 'next/navigation'

export default function BlogDetail() {
  const { id } = useParams()
  const search = useSearchParams()
  const { user, age } = Object.fromEntries(search.entries())

  return (
    <div>Blog Detail Page {`dynamic: ${id}, query: ${user}, age: ${age}`}</div>
  )
}
