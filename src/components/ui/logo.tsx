
import React from 'react';
import { Link } from 'react-router-dom';

export const Logo: React.FC<{ variant?: 'default' | 'white' }> = ({ variant = 'default' }) => {
  return (
    <Link to="/" className="flex items-center">
      <div className="flex items-center gap-2">
        <div className={`relative transform rotate-12 ${variant === 'white' ? 'text-white' : 'text-blue-500'}`}>
          <div className="w-8 h-8 bg-current rounded-md"></div>
          <div className="absolute top-1/2 left-1/2 w-6 h-6 -translate-x-1/2 -translate-y-1/2 
              bg-white rounded-md z-10"></div>
          <div className="absolute top-1/4 left-1/4 w-4 h-4 -translate-x-1/2 -translate-y-1/2 
              bg-current rounded-sm rotate-12"></div>
        </div>
        <span className={`text-xl font-bold ${variant === 'white' ? 'text-white' : 'text-gray-800'}`}>
          Flow Track
        </span>
      </div>
    </Link>
  );
};
