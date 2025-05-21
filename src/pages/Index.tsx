
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Index = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Redirect to welcome page
    navigate('/welcome');
  }, [navigate]);

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50">
      <div className="text-center">
        <div className="animate-pulse">
          <div className="flex items-center justify-center">
            <div className="relative transform rotate-12 text-blue-500">
              <div className="w-12 h-12 bg-current rounded-md"></div>
              <div className="absolute top-1/2 left-1/2 w-8 h-8 -translate-x-1/2 -translate-y-1/2 
                bg-white rounded-md z-10"></div>
              <div className="absolute top-1/4 left-1/4 w-6 h-6 -translate-x-1/2 -translate-y-1/2 
                bg-current rounded-sm rotate-12"></div>
            </div>
            <span className="text-3xl font-bold ml-3 text-gray-800">Flow Track</span>
          </div>
        </div>
        <p className="mt-4 text-gray-500">Loading...</p>
      </div>
    </div>
  );
};

export default Index;
