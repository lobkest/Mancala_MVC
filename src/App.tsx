import { useState } from 'react'
import mancalaimage from './assets/mancala.jpg'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <header>
      <h1>Welcome to Mancala</h1>
      <img src={mancalaimage} alt="Mancala bord" className="mancala-foto" />
      <div>
        <a href="https://reactjs.org" target="_blank">
          Learn React
        </a>
      </div>
      <div>
        use count and setcount here: {count}
        <button onClick={() => setCount((count) => count + 1)}>+</button>
        <button onClick={() => setCount((count) => count - 1)}>-</button>
      </div>
      <div>
        <button onClick={() => game.tsx}>Start Mancala</button>
      </div>
    </header>
  )
}

export default App