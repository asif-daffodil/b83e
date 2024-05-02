
import { useEffect, useState } from 'react'
import './App.css'
import TextCompo from './components/TextCompo'

function App() {
  const [num, setNum] = useState(0)

  const increment = () => {
    setNum(num + 1)
  }

  const decrement = () => {
    setNum(num - 1)
  }

  useEffect(() => {
    console.log('useEffect called')
  },[num]);
  

  return (
    <>
      Hello World!
      <TextCompo taklu="Asif" />
      <TextCompo taklu="Hamza" />
      {num}
      <br />
      <button onClick={() => increment()} className='py-3 w-36 border border-black rounded-md mx-4 hover:bg-blue-600 hover:text-white hover:font-extrabold hover:shadow-[3px_3px_3px_#333]'>Increment</button>
      <button onClick={() => decrement()}>Decrement</button>
    </>
  )
}

export default App
