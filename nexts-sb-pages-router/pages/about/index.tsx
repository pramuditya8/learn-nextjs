// import HeavyComponent from '@/components/HeavyComponent'
// import Image from 'next/image'
// import imgTest from '@/assets/img-test.jpg'
import dynamic from 'next/dynamic'
import { useState } from 'react'

const HeavyComponent = dynamic(() => import('@/components/HeavyComponent'), {
  ssr: false,
  loading: () => <p>Loading</p>,
})

export default function About() {
  const [show, setShow] = useState(false)
  return (
    <div>
      <h1>About Page</h1>
      {/* <Image
        src="/img-test.jpg"
        alt="img-test"
        width="1000"
        height="800"
        priority
      /> */}
      <button onClick={() => setShow(show ? false : true)}>Show</button>
      {show && <HeavyComponent />}
    </div>
  )
}
