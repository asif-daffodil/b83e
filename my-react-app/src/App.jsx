import './App.css'
import Sazal from './Components/Sazal'

const App = () => {
  return (
    <>
    <div className='grid place-items-center py-12'>
      <Sazal age="30" ex="Babita" />
      <Sazal age="31" ex="Purnima" />
    </div>
      <p className="sazal">Sazaler Bangladesh</p>
    </>
  )
}

export default App
