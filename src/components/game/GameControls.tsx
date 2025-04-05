
import React from 'react';
import { Button } from "@/components/ui/button";
import { useGame } from '@/contexts/GameContext';
import { Play, RefreshCw } from 'lucide-react';

const GameControls: React.FC = () => {
  const { gameState, startGame, restartGame } = useGame();
  
  return (
    <div className="flex justify-center p-4 bg-pyramid bg-opacity-90 rounded-b-md space-x-4">
      {!gameState.gameStarted ? (
        <Button 
          onClick={startGame} 
          className="bg-gold hover:bg-yellow-500 text-hieroglyph"
        >
          <Play className="mr-2 h-4 w-4" /> Start Game
        </Button>
      ) : (
        <Button 
          onClick={restartGame} 
          className="bg-gold hover:bg-yellow-500 text-hieroglyph"
          disabled={!gameState.gameOver}
        >
          <RefreshCw className="mr-2 h-4 w-4" /> Restart
        </Button>
      )}
    </div>
  );
};

export default GameControls;
