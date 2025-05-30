import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'

import { Button } from '@/components/ui/button'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'
import useSWR from 'swr'

import { Drawer, DrawerContent } from '@/components/ui/drawer'
import FormContainer from '@/containers/FormContainer'
import { useState, useRef } from 'react'
import { getToken } from 'next-auth/jwt'
import { useSession, signOut } from 'next-auth/react'

const fetcher = async (...args) => fetch(...args).then((res) => res.json())

export default function Home() {
  const session = useSession()
  const popoverRef = useRef<HTMLButtonElement | null>(null)
  const [showCreate, setShowCreate] = useState<boolean>(false)
  const [showEdit, setshowEdit] = useState<boolean>(false)
  const [valueEdit, setShowValueEdit] = useState<{
    id: number
    title: string
    url: string
  }>({ id: 0, title: '', url: '' })
  const { data: dataLinks, isLoading, mutate } = useSWR('/api/links', fetcher)

  const handleDelete = async (id: number) => {
    try {
      await fetch(`/api/links/delete/${id}`, {
        method: 'DELETE',
      })
    } catch (error) {
      console.log(error)
    } finally {
      mutate()
      popoverRef.current?.click()
    }
  }

  return (
    <>
      <div className="grid grid-cols-1 gap-4">
        <div className="container">
          <h1 className="text-xl font-bold">{`Hello, ${session?.data?.user?.email}`}</h1>
          <p>This is an area to create your links, let&apos;s put here !!</p>
          <Button variant="link" size="sm" onClick={() => signOut()}>
            Sign Out
          </Button>
        </div>
        <div className="flex justify-end">
          <Button onClick={() => setShowCreate(true)}>Add Link</Button>
        </div>

        {isLoading && <div>Loading...</div>}
        {dataLinks?.data.map(
          (link: { id: number; url: string; title: string }) => (
            <Card key={link.id}>
              <CardContent className="flex justify-between">
                <a href={link.url} target="_blank">
                  {link.title}
                </a>
                <div>
                  <Button
                    variant="secondary"
                    size="sm"
                    onClick={() => {
                      setShowValueEdit({
                        id: link.id,
                        title: link.title,
                        url: link.url,
                      })
                      setshowEdit(true)
                    }}
                  >
                    Edit
                  </Button>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button ref={popoverRef} variant="ghost" size="sm">
                        Delete
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-80">
                      <p>Are you sure for delete this data ?</p>
                      <Button size="sm" onClick={() => handleDelete(link.id)}>
                        Yes
                      </Button>
                    </PopoverContent>
                  </Popover>
                </div>
              </CardContent>
            </Card>
          ),
        )}
      </div>
      {/* drawer create */}
      <Drawer open={showCreate} onOpenChange={setShowCreate}>
        <DrawerContent>
          <div className="container mx-auto px-4">
            <FormContainer
              onFinished={() => {
                setShowCreate(false)
                mutate()
              }}
            />
          </div>
        </DrawerContent>
      </Drawer>
      {/* drawer edit */}
      <Drawer open={showEdit} onOpenChange={setshowEdit}>
        <DrawerContent>
          <div className="container mx-auto px-4">
            <FormContainer
              id={valueEdit.id}
              values={{ title: valueEdit.title, url: valueEdit.url }}
              onFinished={() => {
                setshowEdit(false)
                mutate()
              }}
            />
          </div>
        </DrawerContent>
      </Drawer>
    </>
  )
}

export const getServerSideProps = async (context: any) => {
  const token = await getToken({
    req: context.req,
    secret: process.env.NEXTAUTH_SECRET,
  })
  if (!token) {
    return {
      redirect: {
        destination: '/login',
        permanent: false,
      },
    }
  }

  return {
    props: {},
  }
}
