
import React, { useState, useEffect } from 'react';
import Character from './Character';
import Platform from './Platform';
import Enemy from './Enemy';
import Collectible from './Collectible';
import { useGame } from '@/contexts/GameContext';

// Define level layout
const platforms = [
  { x: 0, y: 460, width: 800, height: 40, type: 'stone' }, // Ground
  { x: 200, y: 380, width: 100, height: 20, type: 'stone' },
  { x: 350, y: 320, width: 120, height: 20, type: 'atlantis' },
  { x: 100, y: 280, width: 80, height: 20, type: 'sand' },
  { x: 500, y: 250, width: 100, height: 20, type: 'sand' },
  { x: 650, y: 320, width: 80, height: 20, type: 'atlantis' },
];

const initialEnemies = [
  { x: 350, y: 290, width: 40, height: 30, patrolDistance: 80, direction: 1 },
  { x: 550, y: 220, width: 40, height: 30, patrolDistance: 50, direction: 1 },
];

const initialCollectibles = [
  { x: 220, y: 350, collected: false, type: 'artifact', id: 1 },
  { x: 400, y: 290, collected: false, type: 'gem', id: 2 },
  { x: 130, y: 250, collected: false, type: 'scroll', id: 3 },
  { x: 700, y: 290, collected: false, type: 'artifact', id: 4 },
  { x: 520, y: 220, collected: false, type: 'gem', id: 5 },
];

const GameArea: React.FC = () => {
  const { gameState, incrementScore, decrementHealth, isPaused } = useGame();
  const [collectibles, setCollectibles] = useState(initialCollectibles);
  const [enemies, setEnemies] = useState(initialEnemies);

  // Reset game state when restarting
  useEffect(() => {
    if (!gameState.gameStarted) {
      setCollectibles(initialCollectibles);
      setEnemies(initialEnemies);
    }
  }, [gameState.gameStarted]);

  const handleCollision = () => {
    decrementHealth();
  };

  const handleCollectItem = (id: number) => {
    setCollectibles(prev =>
      prev.map(item =>
        item.id === id ? { ...item, collected: true } : item
      )
    );
    
    incrementScore(100);
  };

  return (
    <div className="relative w-full h-[500px] bg-gradient-to-b from-blue-300 to-sky-500 overflow-hidden border-4 border-hieroglyph rounded-md">
      {/* Background elements */}
      <div className="absolute bottom-0 w-full h-[40px] bg-sand"></div>
      <div className="absolute left-[80px] bottom-[40px] w-[100px] h-[70px] bg-pyramid skew-x-12"></div>
      <div className="absolute right-[120px] bottom-[40px] w-[150px] h-[120px] bg-pyramid skew-x-[-12]"></div>
      
      {/* Sun */}
      <div className="absolute top-[40px] right-[80px] w-[60px] h-[60px] bg-gold rounded-full"></div>
      
      {/* Platforms */}
      {platforms.map((platform, index) => (
        <Platform
          key={index}
          x={platform.x}
          y={platform.y}
          width={platform.width}
          height={platform.height}
          type={platform.type as 'stone' | 'sand' | 'atlantis'}
        />
      ))}
      
      {/* Collectibles */}
      {collectibles.map((item, index) => (
        <Collectible
          key={index}
          x={item.x}
          y={item.y}
          collected={item.collected}
          type={item.type as 'artifact' | 'gem' | 'scroll'}
        />
      ))}
      
      {/* Enemies */}
      {enemies.map((enemy, index) => (
        <Enemy
          key={index}
          x={enemy.x}
          y={enemy.y}
          width={enemy.width}
          height={enemy.height}
          patrolDistance={enemy.patrolDistance}
        />
      ))}
      
      {/* Player character */}
      <Character
        onCollision={handleCollision}
        platforms={platforms}
        enemies={enemies.map(e => ({
          ...e,
          x: e.x + (isPaused ? 0 : (e.patrolDistance / 2) * Math.sin(Date.now() / 1000 * e.direction)),
          width: e.width,
          height: e.height
        }))}
        collectibles={collectibles}
        onCollectItem={handleCollectItem}
      />
      
      {/* UI overlays */}
      {!gameState.gameStarted && !gameState.gameOver && (
        <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="text-center text-white">
            <h1 className="text-4xl font-bold mb-4">Anunnaki Pyramid Rush</h1>
            <p className="text-xl mb-8">Navigate the ancient ruins and collect artifacts while avoiding the Anunnaki!</p>
            <p className="text-md mb-4">Use arrow keys or WASD to move, and Space to jump</p>
          </div>
        </div>
      )}
      
      {isPaused && (
        <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="text-center text-white">
            <h2 className="text-3xl font-bold mb-4">Game Paused</h2>
            <p className="text-lg">Press ESC to resume</p>
          </div>
        </div>
      )}
      
      {gameState.gameOver && (
        <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="text-center text-white">
            <h2 className="text-3xl font-bold mb-4">Game Over</h2>
            <p className="text-xl mb-4">Your score: {gameState.score}</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default GameArea;
