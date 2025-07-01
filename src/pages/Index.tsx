import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Index = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Redirect to landing page
    navigate('/landing');
  }, [navigate]);

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50">
      <div className="text-center">
        <div className="animate-pulse">
          <div className="flex items-center justify-center">
            <img 
              src="/lovable-uploads/0389ac1e-d4ac-470b-a3fc-9031dcceb13c.png" 
              alt="Mulaflow Logo" 
              className="h-12 w-auto"
            />
          </div>
        </div>
        <p className="mt-4 text-gray-500">Loading...</p>
      </div>
    </div>
  );
};

export default Index;
