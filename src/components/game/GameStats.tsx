
import React from 'react';
import { useGame } from '@/contexts/GameContext';
import { Heart, Pyramid, PauseCircle, PlayCircle } from 'lucide-react';

const GameStats: React.FC = () => {
  const { gameState, pauseGame, isPaused } = useGame();
  
  return (
    <div className="flex justify-between items-center p-4 bg-pyramid text-white rounded-t-md shadow-md">
      <div className="flex items-center space-x-2">
        <Pyramid className="text-gold" />
        <span className="font-bold">Score: {gameState.score}</span>
      </div>
      
      <div className="flex">
        {Array.from({ length: gameState.health }).map((_, i) => (
          <Heart key={i} className="text-red-500 mr-1" />
        ))}
        {Array.from({ length: 3 - gameState.health }).map((_, i) => (
          <Heart key={i + gameState.health} className="text-gray-400 mr-1" />
        ))}
      </div>
      
      <div>
        <button 
          onClick={pauseGame}
          className="bg-transparent border-none cursor-pointer"
          aria-label={isPaused ? "Resume game" : "Pause game"}
        >
          {isPaused ? 
            <PlayCircle className="text-white hover:text-gold transition-colors" /> : 
            <PauseCircle className="text-white hover:text-gold transition-colors" />
          }
        </button>
      </div>
    </div>
  );
};

export default GameStats;
