
import React from 'react';

type PlatformProps = {
  x: number;
  y: number;
  width: number;
  height: number;
  type?: 'stone' | 'sand' | 'atlantis';
};

const Platform: React.FC<PlatformProps> = ({ x, y, width, height, type = 'stone' }) => {
  let platformStyle = 'bg-pyramid';
  
  switch (type) {
    case 'sand':
      platformStyle = 'bg-sand';
      break;
    case 'atlantis':
      platformStyle = 'bg-atlantis';
      break;
    default:
      platformStyle = 'bg-pyramid';
  }
  
  return (
    <div
      className={`absolute ${platformStyle} rounded-md border-b-4 border-hieroglyph`}
      style={{
        left: x,
        top: y,
        width: width,
        height: height,
      }}
    >
      {/* Hieroglyphs or decoration for stone platforms */}
      {type === 'stone' && (
        <div className="flex justify-around items-center h-full px-2">
          <div className="text-hieroglyph text-xl">𓂀</div>
          <div className="text-hieroglyph text-xl">𓇳</div>
          <div className="text-hieroglyph text-xl">𓅓</div>
        </div>
      )}
      
      {/* Atlantean symbols for atlantis platforms */}
      {type === 'atlantis' && (
        <div className="w-full h-full flex justify-around items-center">
          <div className="w-4 h-4 bg-blue-500 rounded-full opacity-75"></div>
          <div className="w-6 h-1 bg-blue-300"></div>
          <div className="w-4 h-4 bg-blue-500 rounded-full opacity-75"></div>
        </div>
      )}
    </div>
  );
};

export default Platform;
