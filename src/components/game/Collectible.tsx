
import React from 'react';

type CollectibleProps = {
  x: number;
  y: number;
  collected: boolean;
  type?: 'artifact' | 'gem' | 'scroll';
};

const Collectible: React.FC<CollectibleProps> = ({ 
  x, 
  y, 
  collected, 
  type = 'artifact' 
}) => {
  if (collected) return null;
  
  return (
    <div
      className={`absolute animate-float ${collected ? 'opacity-0' : 'opacity-100'} transition-opacity`}
      style={{
        left: x,
        top: y,
        width: 30,
        height: 30,
        transition: 'opacity 300ms'
      }}
    >
      {type === 'artifact' && (
        <div className="w-full h-full">
          <div className="w-full h-full bg-gold rounded-full flex items-center justify-center animate-shine">
            <div className="w-3/4 h-3/4 bg-sand rounded-full flex items-center justify-center">
              <div className="w-1/2 h-1/2 bg-hieroglyph rounded-full"></div>
            </div>
          </div>
        </div>
      )}
      
      {type === 'gem' && (
        <div className="w-full h-full">
          <div className="w-full h-full bg-atlantis rounded-lg rotate-45 animate-pulse"></div>
        </div>
      )}
      
      {type === 'scroll' && (
        <div className="w-full h-full">
          <div className="w-full h-full bg-sandDark rounded-md flex items-center justify-center">
            <div className="w-3/4 h-1/2 bg-sand"></div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Collectible;
