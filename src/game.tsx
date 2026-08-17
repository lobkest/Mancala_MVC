import { useState, useEffect } from 'react'
import './game.css'
import GameOver from './gameOver.tsx'

interface BoardState {
  stonesArray: [number, number, number, number, number, number, number, number, number, number, number, number, number, number];
  isTurnPlayer: [boolean, boolean, boolean, boolean, boolean, boolean, boolean, boolean, boolean, boolean, boolean, boolean, boolean, boolean];
  winner: number;
}

function Game() {

  const [board, setBoard] = useState<BoardState | null>(null);

  useEffect(() => {
    async function fetchInitialBoard() {
      try {
        const response = await fetch('http://localhost:8080/api/start'); 
        const data: BoardState = await response.json();

        console.log(data);
      
        setBoard(data);
      } catch (error) {
        console.error("Fout bij het ophalen:", error);
      }
    }

    fetchInitialBoard();
  }, []);

  async function handleMove(pitIndex: number) {
    console.log(`Poging tot zet op pitIndex: ${pitIndex}`);
    console.log("Huidige board vlak voor de klik:", board);
    try {
      const response = await fetch(`http://localhost:8080/api/move/${pitIndex}`, {
        method: 'POST'
      });

      if (!response.ok) {
        const errorText = await response.text(); 
        console.error(`[SERVER FOUT] Code: ${response.status}. Bericht van Java:`, errorText);
        console.error(`[FOUT DETAILS] Je klikte op kuiltje ${pitIndex}. Het aantal stenen in dit kuiltje was:`, board?.stonesArray[pitIndex - 1]);
        
        return;
      }

      const newBoardData: BoardState = await response.json();


      setBoard(newBoardData);
    } catch (error) {
      console.error("Fout bij het doen van een zet:", error);
    }
  }

  if (!board) return <div>Spel is aan het laden...</div>;

  if (board.winner > 0) {
    return <GameOver winner={board.winner} />
  }
  
  
  return (
    <div>
      <h1>Spelbord maken hier</h1>

      <div>Mancala of this player 1 has: {board.stonesArray[6]} stones</div>
      <button id="one2" type="button" onClick={() => handleMove(8)} disabled={!board.isTurnPlayer[7]}>{board.stonesArray[7]}</button>
      <button id="two2" type="button" onClick={() => handleMove(9)} disabled={!board.isTurnPlayer[8]}>{board.stonesArray[8]}</button>
      <button id="three2" type="button" onClick={() => handleMove(10)} disabled={!board.isTurnPlayer[9]}>{board.stonesArray[9]}</button>
      <button id="four2" type="button" onClick={() => handleMove(11)} disabled={!board.isTurnPlayer[10]}>{board.stonesArray[10]}</button>
      <button id="five2" type="button" onClick={() => handleMove(12)} disabled={!board.isTurnPlayer[11]}>{board.stonesArray[11]}</button>
      <button id="six2" type="button" onClick={() => handleMove(13)} disabled={!board.isTurnPlayer[12]}>{board.stonesArray[12]}</button>
      <div>{board.stonesArray[13]} stones in Mancala of this player 2</div>
       <button id="one1" type="button" onClick={() => handleMove(1)} disabled={!board.isTurnPlayer[0]}>{board.stonesArray[0]}</button>
      <button id="two1" type="button" onClick={() => handleMove(2)} disabled={!board.isTurnPlayer[1]}>{board.stonesArray[1]}</button>
      <button id="three1" type="button" onClick={() => handleMove(3)} disabled={!board.isTurnPlayer[2]}>{board.stonesArray[2]}</button>
      <button id="four1" type="button" onClick={() => handleMove(4)} disabled={!board.isTurnPlayer[3]}>{board.stonesArray[3]}</button>
      <button id="five1" type="button" onClick={() => handleMove(5)} disabled={!board.isTurnPlayer[4]}>{board.stonesArray[4]}</button>
      <button id="six1" type="button" onClick={() => handleMove(6)} disabled={!board.isTurnPlayer[5]}>{board.stonesArray[5]}</button>

    </div>
  );
}

export default Game
