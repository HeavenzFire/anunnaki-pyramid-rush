
import React, { useEffect, useState } from 'react';
import { useGame } from '@/contexts/GameContext';

type EnemyProps = {
  x: number;
  y: number;
  width: number;
  height: number;
  patrolDistance?: number;
  speed?: number;
};

const Enemy: React.FC<EnemyProps> = ({ 
  x, 
  y, 
  width, 
  height, 
  patrolDistance = 100, 
  speed = 1 
}) => {
  const { gameState, isPaused } = useGame();
  const [position, setPosition] = useState({ x, y });
  const [direction, setDirection] = useState(1); // 1 for right, -1 for left
  const startX = x;

  useEffect(() => {
    if (!gameState.gameStarted || gameState.gameOver || isPaused) return;

    const interval = setInterval(() => {
      setPosition(prev => {
        let newX = prev.x + speed * direction;
        
        // Change direction if reached patrol limits
        if (newX > startX + patrolDistance) {
          newX = startX + patrolDistance;
          setDirection(-1);
        } else if (newX < startX) {
          newX = startX;
          setDirection(1);
        }
        
        return { ...prev, x: newX };
      });
    }, 16);

    return () => clearInterval(interval);
  }, [startX, patrolDistance, direction, speed, gameState.gameStarted, gameState.gameOver, isPaused]);

  return (
    <div
      className={`absolute ${direction === 1 ? '' : 'scale-x-[-1]'} transition-transform`}
      style={{
        left: position.x,
        top: position.y,
        width: width,
        height: height,
      }}
    >
      {/* Anunnaki Enemy Design */}
      <div className="relative w-full h-full">
        {/* Head */}
        <div className="absolute top-0 left-1/4 w-1/2 h-1/3 bg-anunnaki rounded-t-lg">
          {/* Eyes */}
          <div className="flex justify-between px-1 pt-1">
            <div className="w-3 h-2 bg-yellow-400 rounded-full"></div>
            <div className="w-3 h-2 bg-yellow-400 rounded-full"></div>
          </div>
        </div>
        
        {/* Body */}
        <div className="absolute top-1/3 left-0 w-full h-2/3 bg-anunnaki">
          {/* Decorative pattern */}
          <div className="absolute top-1 left-1/4 w-1/2 h-1 bg-gold"></div>
          <div className="absolute top-3 left-1/4 w-1/2 h-1 bg-gold"></div>
          
          {/* Arms */}
          <div className="absolute -left-3 top-2 w-3 h-8 bg-anunnaki"></div>
          <div className="absolute -right-3 top-2 w-3 h-8 bg-anunnaki"></div>
        </div>
        
        {/* Legs */}
        <div className="absolute -bottom-4 left-1/4 w-3 h-4 bg-anunnaki"></div>
        <div className="absolute -bottom-4 right-1/4 w-3 h-4 bg-anunnaki"></div>
      </div>
    </div>
  );
};

export default Enemy;
