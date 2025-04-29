import { GetServerSideProps, InferGetServerSidePropsType } from 'next'

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
  data: ListNotes
}

export const getServerSideProps = (async (context) => {
  const { params } = context

  const notes = await fetch(
    `https://service.pace11.my.id/api/note/${params?.id || ''}`,
  ).then((res) => res.json())

  return {
    props: { notes: notes.data },
  }
}) satisfies GetServerSideProps<{ notes: Notes }>

export default function NotesServerPage({
  notes,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  return (
    <div className="grid grid-cols-4 gap-4">
      <div className="p-4 bg-white shadow-sm rounded-lg">
        <h1>{notes.title}</h1>
        <p>{notes.description}</p>
      </div>
    </div>
  )
}
