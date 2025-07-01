import React from 'react';
import { Link } from 'react-router-dom';

export const Bg: React.FC<{ variant?: 'default' | 'white' }> = ({ variant = 'default' }) => {
  return (
    <Link to="/" className="flex items-center">
      <div className="flex items-center gap-2">
        <img 
          src="/public/lovable-uploads/BG.png" 
          alt="Mulaflow Logo" 
          className="w-full h-full object-contain"
        />
        {variant === 'white' && (
          <span className="text-white font-bold text-xl">Mulaflow</span>
        )}
      </div>
    </Link>
  );
};