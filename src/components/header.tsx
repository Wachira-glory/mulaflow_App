
import React from 'react';
import { Bell, ChevronLeft, Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Logo } from '@/components/ui/logo';

interface HeaderProps {
  showLogo?: boolean;
  showBackButton?: boolean;
  showSearch?: boolean;
  showPaymentAction?: boolean;
  showNewTransaction?: boolean;
  showDatePicker?: boolean;
}

const Header: React.FC<HeaderProps> = ({
  showLogo = true,
  showBackButton = false,
  showSearch = true,
  showPaymentAction = true,
  showNewTransaction = false,
  showDatePicker = false,
}) => {
  return (
    <header className="h-16 flex items-center px-6 border-b border-gray-200 bg-white">
      <div className="flex items-center">
        {showBackButton && (
          <button className="mr-4 text-gray-500">
            <ChevronLeft size={20} />
          </button>
        )}
        {showLogo && <Logo />}
      </div>
      
      {showSearch && (
        <div className="mx-auto max-w-md w-full flex-1 px-4">
          <div className="relative">
            <input
              type="text"
              placeholder="Search transactions..."
              className="w-full border border-gray-300 rounded-md pl-4 pr-10 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 text-gray-400">
                <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
              </svg>
            </div>
          </div>
        </div>
      )}

      <div className="flex items-center space-x-4">
        {showPaymentAction && (
          <Button className="bg-blue-700 hover:bg-blue-800">
            Payment Action
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4 ml-2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
            </svg>
          </Button>
        )}
        
        {showNewTransaction && (
          <Button className="bg-blue-700 hover:bg-blue-800">
            <Plus size={18} className="mr-2" /> New Transaction
          </Button>
        )}
        
        {showDatePicker && (
          <div className="px-4 py-2 border rounded-md flex items-center text-sm">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 mr-2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5" />
            </svg>
            Mar 11, 2025 - Apr 09,2025
          </div>
        )}
        
        <button className="relative">
          <Bell className="text-gray-500" size={22} />
          <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-4 w-4 flex items-center justify-center">
            2
          </span>
        </button>
        
        <div className="h-9 w-9 rounded-full bg-gray-200 flex items-center justify-center relative">
          <span className="text-gray-600">J</span>
          <span className="absolute bottom-0 right-0 h-2.5 w-2.5 rounded-full bg-green-500 border-2 border-white"></span>
        </div>
      </div>
    </header>
  );
};

export default Header;
