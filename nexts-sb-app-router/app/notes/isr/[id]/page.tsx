type ListNotes = {
  id: number
  title: string
  description: string
  created_at: string
  updated_at: string
}

type Notes = {
  success: boolean
  message: string
  data: ListNotes[]
}

type DetailNotes = {
  success: boolean
  message: string
  data: ListNotes
}

// Next.js will invalidate the cache when a
// request comes in, at most once every 60 seconds.
export const revalidate = 3

// We'll prerender only the params from `generateStaticParams` at build time.
// If a request comes in for a path that hasn't been generated,
// Next.js will server-render the page on-demand.
export const dynamicParams = true // or false, to 404 on unknown paths

export async function generateStaticParams() {
  const notes: Notes = await fetch(
    'https://service.pace11.my.id/api/notes',
  ).then((res) => res.json())

  return notes.data.map((note: ListNotes) => ({
    id: String(note.id),
  }))
}

export default async function Page({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params
  const note: DetailNotes = await fetch(
    `https://service.pace11.my.id/api/note/${id}`,
  ).then((res) => res.json())
  return (
    <main>
      <h1>{note.data.title}</h1>
      <p>{note.data.description}</p>
    </main>
  )
}
