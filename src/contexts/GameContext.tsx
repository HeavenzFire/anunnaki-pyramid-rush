
import React, { createContext, useContext, useState, useEffect } from 'react';

type GameState = {
  score: number;
  health: number;
  level: number;
  gameOver: boolean;
  gameStarted: boolean;
};

type GameContextType = {
  gameState: GameState;
  incrementScore: (points: number) => void;
  decrementHealth: () => void;
  restartGame: () => void;
  startGame: () => void;
  pauseGame: () => void;
  isPaused: boolean;
};

const initialGameState: GameState = {
  score: 0,
  health: 3,
  level: 1,
  gameOver: false,
  gameStarted: false,
};

const GameContext = createContext<GameContextType | undefined>(undefined);

export const GameProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [gameState, setGameState] = useState<GameState>(initialGameState);
  const [isPaused, setIsPaused] = useState(false);

  const incrementScore = (points: number) => {
    setGameState(prev => ({
      ...prev,
      score: prev.score + points
    }));
  };

  const decrementHealth = () => {
    setGameState(prev => {
      const newHealth = prev.health - 1;
      return {
        ...prev,
        health: newHealth,
        gameOver: newHealth <= 0
      };
    });
  };

  const restartGame = () => {
    setGameState(initialGameState);
    setIsPaused(false);
  };

  const startGame = () => {
    setGameState(prev => ({
      ...prev,
      gameStarted: true,
      gameOver: false
    }));
    setIsPaused(false);
  };

  const pauseGame = () => {
    setIsPaused(prev => !prev);
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.code === 'Escape') {
        pauseGame();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  return (
    <GameContext.Provider
      value={{
        gameState,
        incrementScore,
        decrementHealth,
        restartGame,
        startGame,
        pauseGame,
        isPaused
      }}
    >
      {children}
    </GameContext.Provider>
  );
};

export const useGame = () => {
  const context = useContext(GameContext);
  if (context === undefined) {
    throw new Error('useGame must be used within a GameProvider');
  }
  return context;
};
