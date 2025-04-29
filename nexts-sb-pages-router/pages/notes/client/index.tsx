import useSWR from 'swr'

const fetcher = (url: string) => fetch(url).then((res) => res.json())

type ListNotes = {
  id: number
  title: string
  description: string
  created_at: string
  updated_at: string
}

export default function NoteCLientPage() {
  const { data, error, isLoading } = useSWR(
    'https://service.pace11.my.id/api/notes',
    fetcher,
    {
      revalidateOnFocus: true,
      // revalidateOnMount: true
      // refreshInterval: 5000,
    },
  )

  if (isLoading) return <div>Loading...</div>
  if (error) return <div>Error...</div>
  else
    return (
      <div className="grid grid-cols-4 gap-4">
        {data?.data.map((note: ListNotes) => (
          <div key={note.id} className="p-4 bg-white shadow-sm rounded-lg">
            <h1>{note.title}</h1>
            <p>{note.description}</p>
          </div>
        ))}
      </div>
    )
}
