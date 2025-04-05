
import React, { useState, useEffect, useRef } from 'react';
import { useGame } from '@/contexts/GameContext';

type CharacterProps = {
  onCollision: () => void;
  platforms: { x: number; y: number; width: number; height: number }[];
  enemies: { x: number; y: number; width: number; height: number; direction: number }[];
  collectibles: { x: number; y: number; collected: boolean; id: number }[];
  onCollectItem: (id: number) => void;
};

const Character: React.FC<CharacterProps> = ({ 
  onCollision, 
  platforms, 
  enemies, 
  collectibles, 
  onCollectItem 
}) => {
  const { gameState, isPaused } = useGame();
  const [position, setPosition] = useState({ x: 50, y: 400 });
  const [velocity, setVelocity] = useState({ x: 0, y: 0 });
  const [isJumping, setIsJumping] = useState(false);
  const [direction, setDirection] = useState<'right' | 'left'>('right');
  const [isMoving, setIsMoving] = useState(false);
  const keysPressed = useRef<{ [key: string]: boolean }>({});
  const gravityRef = useRef(0.5);
  const characterSize = { width: 40, height: 60 };
  const lastCollisionTime = useRef(0);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      keysPressed.current[e.code] = true;
      
      if ((e.code === 'Space' || e.code === 'ArrowUp') && !isJumping) {
        setIsJumping(true);
        setVelocity(prev => ({ ...prev, y: -12 }));
      }
    };

    const handleKeyUp = (e: KeyboardEvent) => {
      keysPressed.current[e.code] = false;
    };

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
    };
  }, [isJumping]);

  useEffect(() => {
    if (!gameState.gameStarted || gameState.gameOver || isPaused) return;

    const gameLoop = setInterval(() => {
      // Horizontal movement
      let horizontalMovement = 0;
      if (keysPressed.current['ArrowLeft'] || keysPressed.current['KeyA']) {
        horizontalMovement = -5;
        setDirection('left');
        setIsMoving(true);
      } else if (keysPressed.current['ArrowRight'] || keysPressed.current['KeyD']) {
        horizontalMovement = 5;
        setDirection('right');
        setIsMoving(true);
      } else {
        setIsMoving(false);
      }

      // Update position and apply gravity
      setPosition(prev => {
        const newX = Math.max(0, Math.min(800 - characterSize.width, prev.x + horizontalMovement));
        const newY = prev.y + velocity.y;
        
        // Check for platform collisions
        let onPlatform = false;
        let finalY = newY;
        
        for (const platform of platforms) {
          // Check if character is on top of a platform
          if (
            newX < platform.x + platform.width &&
            newX + characterSize.width > platform.x &&
            prev.y + characterSize.height <= platform.y &&
            newY + characterSize.height >= platform.y
          ) {
            finalY = platform.y - characterSize.height;
            onPlatform = true;
            setIsJumping(false);
            break;
          }
        }
        
        // Check for collectible collisions
        collectibles.forEach(item => {
          if (!item.collected &&
              newX < item.x + 30 &&
              newX + characterSize.width > item.x &&
              finalY < item.y + 30 &&
              finalY + characterSize.height > item.y) {
            onCollectItem(item.id);
          }
        });
        
        // Check for enemy collisions with cooldown
        const now = Date.now();
        if (now - lastCollisionTime.current > 1000) { // 1 second cooldown
          for (const enemy of enemies) {
            if (
              newX < enemy.x + enemy.width &&
              newX + characterSize.width > enemy.x &&
              finalY < enemy.y + enemy.height &&
              finalY + characterSize.height > enemy.y
            ) {
              onCollision();
              lastCollisionTime.current = now;
              break;
            }
          }
        }
        
        // Reset jumping if on ground
        if (finalY >= 400) {
          finalY = 400;
          setIsJumping(false);
        }
        
        return { x: newX, y: finalY };
      });
      
      // Update velocity with gravity if jumping
      if (isJumping || position.y < 400) {
        setVelocity(prev => ({ ...prev, y: prev.y + gravityRef.current }));
      } else {
        setVelocity(prev => ({ ...prev, y: 0 }));
      }
      
    }, 16); // ~60fps

    return () => clearInterval(gameLoop);
  }, [
    position, 
    velocity, 
    isJumping, 
    platforms, 
    enemies, 
    collectibles, 
    onCollision, 
    onCollectItem, 
    gameState.gameStarted, 
    gameState.gameOver, 
    isPaused
  ]);

  return (
    <div
      className={`absolute ${direction === 'right' ? '' : 'scale-x-[-1]'}`}
      style={{
        left: position.x,
        top: position.y,
        width: characterSize.width,
        height: characterSize.height,
        transition: 'transform 0.1s ease',
        zIndex: 10
      }}
    >
      <div className="w-full h-full relative">
        {/* Character body */}
        <div className="absolute inset-0 bg-gold rounded-t-full overflow-hidden">
          {/* Head/face */}
          <div className="absolute top-1/3 w-full flex justify-center">
            <div className="w-8 h-4 bg-white rounded-t-full">
              <div className="flex justify-between px-1">
                <div className="w-2 h-2 bg-black rounded-full"></div>
                <div className="w-2 h-2 bg-black rounded-full"></div>
              </div>
            </div>
          </div>
          
          {/* Egyptian headdress */}
          <div className="absolute top-0 w-full h-1/3 bg-atlantis"></div>
          
          {/* Body */}
          <div className="absolute bottom-0 w-full h-1/2 bg-pyramid"></div>
          
          {/* Animated legs when moving */}
          <div className={`absolute -bottom-2 left-1/4 w-3 h-6 bg-sandDark rounded ${isMoving ? 'animate-pulse' : ''}`}></div>
          <div className={`absolute -bottom-2 right-1/4 w-3 h-6 bg-sandDark rounded ${isMoving ? 'animate-pulse delay-75' : ''}`}></div>
        </div>
      </div>
    </div>
  );
};

export default Character;
