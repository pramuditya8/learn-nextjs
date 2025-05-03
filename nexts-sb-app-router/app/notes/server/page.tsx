async function getNotes() {
  const notes = await fetch('https://service.pace11.my.id/api/notes').then(
    (res) => res.json(),
  )
  return notes
}

export default async function Notes() {
  const notes = await getNotes()

  type ListNotes = {
    id: number
    title: string
    description: string
    created_at: string
    updated_at: string
  }

  return (
    <>
      {notes.data.map((el: ListNotes) => (
        <li key={el.id}>{el.title}</li>
      ))}
    </>
  )
}
