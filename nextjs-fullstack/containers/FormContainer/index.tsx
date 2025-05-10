import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import useFormAction from '@/hooks/useFormAction'
import { formType } from '@/hooks/useFormAction'
import { useState } from 'react'

export default function FormContainer({
  id,
  values,
  onFinished,
}: {
  id?: number
  values?: formType
  onFinished?: () => void
}) {
  const [loading, setLoading] = useState<boolean>(false)
  const { form } = useFormAction({ values })

  const onSubmit = async (values: formType) => {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    console.log(values)
    setLoading(true)
    try {
      const type = id ? 'patch' : 'post'
      const mapping = {
        post: {
          method: 'POST',
          url: '/api/links/create',
        },
        patch: {
          method: 'PATCH',
          url: `/api/links/edit/${id}`,
        },
      }

      await fetch(mapping[type].url, {
        method: mapping[type].method,
        body: JSON.stringify(values),
      })
    } catch (error) {
      console.log('Error:', error)
    } finally {
      onFinished?.()
      if (!id) {
        form.reset()
      }
      setLoading(false)
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Title</FormLabel>
              <FormControl>
                <Input placeholder="Input title" {...field} />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="url"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Url</FormLabel>
              <FormControl>
                <Input placeholder="Input url" {...field} />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" disabled={loading}>
          {loading ? 'Loading...' : 'Submit'}
        </Button>
      </form>
    </Form>
  )
}
