'use client'
import { useActionState } from 'react'
import { useFormStatus } from 'react-dom'
import { createNote } from './action'

const initialState = {
  message: '',
  errors: {
    title: '',
    description: '',
  },
}

function SubmitButton() {
  const { pending } = useFormStatus()
  return (
    <button
      type="submit"
      aria-disabled={pending}
      className="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition duration-300 cursor-pointer"
    >
      Submit
    </button>
  )
}

export default function CreateForm() {
  const [state, formAction] = useActionState(createNote, initialState)
  return (
    <div className="max-w mx-auto p-6 bg-white shadow-lg rounded-lg mb-10 sticky top-0">
      <h2 className="text-xl font-semibold mb-4">Create Notes</h2>
      <form className="space-y-4" action={formAction}>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label
              htmlFor="title"
              className="block text-sm font-medium text-gray-700"
            >
              Title
            </label>
            <input
              type="text"
              name="title"
              placeholder="Input Title ..."
              className="mt-1 block w-full border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500 p-2"
            />
            {state.errors && typeof state.errors === 'object' && (
              <small className="text-red-500">{state.errors.title}</small>
            )}
          </div>
          <div>
            <label
              htmlFor="description"
              className="block text-sm font-medium text-gray-700"
            >
              Description
            </label>
            <textarea
              name="description"
              placeholder="Input Description ..."
              className="mt-1 block w-full border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500 p-2"
            />
            {state.errors && typeof state.errors === 'object' && (
              <small className="text-red-500">{state.errors.description}</small>
            )}
          </div>
        </div>

        <SubmitButton />
      </form>
    </div>
  )
}
