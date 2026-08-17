interface GameOverProps {
  winner: number;
}

function GameOver({ winner }: GameOverProps) {
  return (
    <div>
      <h1>Game over, the winner is: {winner}</h1>
    </div>
  );
}

export default GameOver;