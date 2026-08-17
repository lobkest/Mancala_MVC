import { useState } from 'react'
import mancalaimage from './assets/mancala.jpg'
import './App.css'
import Game from './game.tsx'


function App() {

  const [isPlaying, setIsPlaying] = useState(false)

  return (
    <div lang="en">
      <div>
        <h1>Welcome to Mancala</h1>
      
      </div>

      <div>
        {isPlaying ? (
          <Game />
        ) : (
          <div>
            <img src={mancalaimage} alt="Mancala bord" className="mancala-foto" />
            <button onClick={() => setIsPlaying(true)}>Start Game</button>
          </div>
        )}
      </div>

    </div>
  )
}

export default App