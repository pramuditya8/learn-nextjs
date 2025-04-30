import { NextApiRequest, NextApiResponse } from 'next'
import { z } from 'zod'

const formSchema = z.object({
  title: z.string().min(1, { message: 'Title is required' }),
  description: z.string().min(1, { message: 'Description is required' }),
})

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' })
  }

  try {
    const validateData = formSchema.parse(req.body)

    const response = await fetch('https://service.pace11.my.id/api/note', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(validateData),
    })

    if (response.ok) {
      const data = await response.json()
      return res.status(201).json(data)
    }
  } catch (error) {
    console.log(error)
    if (error instanceof z.ZodError) {
      const errors = Object.keys(error.formErrors.fieldErrors)?.reduce(
        (acc, key) => {
          acc[key] = error.formErrors.fieldErrors[key]?.[0] || 'Unknown error'
          return acc
        },
        {} as Record<string, string>,
      )
      return res.status(400).json({ errors })
    }

    return res.status(500).json({ errors: 'Internal server error' })
  }
}
