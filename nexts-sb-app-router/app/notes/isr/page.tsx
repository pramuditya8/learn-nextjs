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

// Next.js will invalidate the cache when a
// request comes in, at most once every 60 seconds.
export const revalidate = 3

export default async function Page() {
  const notes: Notes = await fetch(
    `https://service.pace11.my.id/api/notes/`,
  ).then((res) => res.json())
  return (
    <main>
      {notes.data.map((note) => {
        return (
          <li
            key={note.id}
            style={{
              border: '1px solid black',
              marginBottom: '10px',
              padding: '8px',
            }}
          >
            <a href={`/notes/isr/${note.id}`}>{note.title}</a>
          </li>
        )
      })}
    </main>
  )
}
