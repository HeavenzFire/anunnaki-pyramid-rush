
import React from 'react';
import { GameProvider } from '@/contexts/GameContext';
import GameArea from '@/components/game/GameArea';
import GameStats from '@/components/game/GameStats';
import GameControls from '@/components/game/GameControls';
import GameInstructions from '@/components/game/GameInstructions';

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-sandDark to-sand py-8 px-4">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold text-center text-hieroglyph mb-6">
          Anunnaki Pyramid Rush
        </h1>
        
        <GameProvider>
          <div className="bg-white rounded-md shadow-xl overflow-hidden">
            <GameStats />
            <GameArea />
            <GameControls />
          </div>
          
          <GameInstructions />
        </GameProvider>
        
        <div className="mt-8 text-center text-hieroglyph text-sm">
          <p>
            A platformer game inspired by ancient Egyptian mythology, 
            the lost civilizations of Lemuria and Atlantis, with the Anunnaki as antagonists.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Index;
