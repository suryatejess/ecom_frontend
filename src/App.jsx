import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <p class="text-3xl font-bold underline">heyy wassup</p>

      <div className="bg-chestnut h-64 w-full border-2 border-violet-600 rounded-md my-4 flex justify-center items-center">
        <h1 className='text-center font-mono font-extrabold'>hello world</h1>
      </div>
    </>
  )
}

export default App
