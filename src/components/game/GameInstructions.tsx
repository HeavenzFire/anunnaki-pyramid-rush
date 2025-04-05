
import React from 'react';
import { ArrowLeft, ArrowRight, ArrowUp } from 'lucide-react';

const GameInstructions: React.FC = () => {
  return (
    <div className="mt-6 bg-sand p-4 rounded-md">
      <h2 className="text-xl font-bold text-hieroglyph mb-3">How to Play</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <div className="flex items-center">
            <div className="bg-pyramid p-2 rounded-md mr-2 flex">
              <ArrowLeft size={20} className="text-white" />
              <ArrowRight size={20} className="text-white ml-2" />
            </div>
            <span className="text-hieroglyph">or A/D - Move left/right</span>
          </div>
          
          <div className="flex items-center">
            <div className="bg-pyramid p-2 rounded-md mr-2">
              <ArrowUp size={20} className="text-white" />
            </div>
            <span className="text-hieroglyph">or SPACE - Jump</span>
          </div>
          
          <div className="flex items-center">
            <div className="bg-pyramid p-2 rounded-md mr-2 text-white text-xs font-bold">
              ESC
            </div>
            <span className="text-hieroglyph">Pause/Resume game</span>
          </div>
        </div>
        
        <div className="bg-white bg-opacity-50 p-3 rounded-md">
          <h3 className="font-bold text-hieroglyph mb-2">Objective:</h3>
          <p className="text-sm text-hieroglyph">
            Collect ancient artifacts while avoiding the Anunnaki guards. 
            Navigate through platforms inspired by Egyptian, Atlantean, and Lemurian architecture.
          </p>
        </div>
      </div>
    </div>
  );
};

export default GameInstructions;
