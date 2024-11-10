import { useState } from 'react'
import './App.css'
import ConversorDeMoedas from './Components/Conversor'
function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <ConversorDeMoedas/>
    </>
  )
}

export default App
