import { useState } from 'react';
import './App.css'
import Sazal from './Components/Sazal'

const App = () => {
  const [count, setCount] = useState(1);
  const [name, setName] = useState('Sazal');
  const handleIncrement = () => {
    setCount(count + 1);
  }
  const handleDecrement = () => {
    setCount(count - 1);
  }

  return (
    <>
    <div className='grid place-items-center py-12'>
      <Sazal age="30" ex="Babita" />
      <Sazal age="31" ex="Purnima" />
      <div className='flex mt-3'>
        <button className='border px-3' onClick={handleIncrement}>+</button>
          <span className='mx-3'>{count}</span>
        <button className='border px-3' onClick={handleDecrement}>-</button>
      </div>
      <div onMouseEnter={() => setName('Sazal')}>{name}</div>
      <button onClick={() => setName('Roy')}>Change Name</button>
    </div>
      <p className="sazal">Sazaler Bangladesh</p>
    </>
  )
}

export default App
