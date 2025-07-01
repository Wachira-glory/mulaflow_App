// import React from 'react';
// import { Bell, ChevronLeft, Plus } from 'lucide-react';
// import { Button } from '@/components/ui/button';
// import { Logo } from '@/components/ui/logo';

// interface HeaderProps {
//   showLogo?: boolean;
//   showBackButton?: boolean;
//   showNewTransaction?: boolean;
//   showDatePicker?: boolean;
//   // New prop to pass the current date from the parent (Dashboard)
//   currentDate?: Date; // Or string if you prefer 'YYYY-MM-DD'
// }

// const Header: React.FC<HeaderProps> = ({
//   showLogo = true,
//   showBackButton = false,
//   showNewTransaction = false,
//   showDatePicker = false,
//   currentDate, // Destructure the new prop
// }) => {
//   // Function to format a Date object into "Mon DD, YYYY" (e.g., "May 29, 2025")
//   const formatDate = (date: Date): string => {
//     return date.toLocaleString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
//   };

//   // Calculate the start and end of the current month based on currentDate prop
//   let dateRangeString = '';
//   if (currentDate) {
//     const today = currentDate; // Use the passed date
//     const startOfMonth = new Date(today.getFullYear(), today.getMonth(), 1);
//     const endOfMonth = new Date(today.getFullYear(), today.getMonth() + 1, 0); // Day 0 of next month is last day of current month

//     dateRangeString = `${formatDate(startOfMonth)} - ${formatDate(endOfMonth)}`;
//   }

//   return (
//     <header className="h-16 flex items-center px-6 border-b border-gray-200 bg-white">
//       <div className="flex items-center">
//         {showBackButton && (
//           <button className="mr-4 text-gray-500">
//             <ChevronLeft size={20} />
//           </button>
//         )}
//         {showLogo && <Logo />}
//       </div>
      
//       <div className="flex-1"></div>

//       <div className="flex items-center space-x-4">
//         {showNewTransaction && (
//           <Button className="bg-blue-700 hover:bg-blue-800">
//             <Plus size={18} className="mr-2" /> New Transaction
//           </Button>
//         )}
        
//         {showDatePicker && (
//           <div className="px-4 py-2 border rounded-md flex items-center text-sm">
//             <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 mr-2">
//               <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5" />
//             </svg>
//             {/* Display the dynamically calculated date range */}
//             {dateRangeString || 'Select Date Range'} 
//           </div>
//         )}
        
//         <button className="relative">
//           <Bell className="text-gray-500" size={22} />
//         </button>
        
//         <div className="h-9 w-9 rounded-full bg-gray-200 flex items-center justify-center relative">
//           <span className="text-gray-600">J</span>
//           <span className="absolute bottom-0 right-0 h-2.5 w-2.5 rounded-full bg-green-500 border-2 border-white"></span>
//         </div>
//       </div>
//     </header>
//   );
// };

// export default Header;

// src/components/header.tsx

// import React from 'react';
// import { Bell, ChevronLeft, Plus } from 'lucide-react';
// import { Button } from '@/components/ui/button';
// import { Logo } from '@/components/ui/logo';

// interface HeaderProps {
//   showLogo?: boolean;
//   showBackButton?: boolean;
//   showNewTransaction?: boolean;
//   showDatePicker?: boolean;
//   currentDate?: Date;
//   // NEW: Add a prop for the new transaction button click handler
//   onNewTransactionClick?: () => void; 
// }

// const Header: React.FC<HeaderProps> = ({
//   showLogo = true,
//   showBackButton = false,
//   showNewTransaction = false,
//   showDatePicker = false,
//   currentDate,
//   onNewTransactionClick, // NEW: Destructure the new prop
// }) => {
//   const formatDate = (date: Date): string => {
//     return date.toLocaleString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
//   };

//   let dateRangeString = '';
//   if (currentDate) {
//     const today = currentDate; 
//     const startOfMonth = new Date(today.getFullYear(), today.getMonth(), 1);
//     const endOfMonth = new Date(today.getFullYear(), today.getMonth() + 1, 0); 

//     dateRangeString = `${formatDate(startOfMonth)} - ${formatDate(endOfMonth)}`;
//   }

//   return (
//     <header className="h-16 flex items-center px-6 border-b border-gray-200 bg-white">
//       <div className="flex items-center">
//         {showBackButton && (
//           <button className="mr-4 text-gray-500">
//             <ChevronLeft size={20} />
//           </button>
//         )}
//         {showLogo && <Logo />}
//       </div>
      
//       <div className="flex-1"></div>

//       <div className="flex items-center space-x-4">
//         {showNewTransaction && (
//           // NEW: Add onClick handler to the Button
//           <Button className="bg-blue-700 hover:bg-blue-800" onClick={onNewTransactionClick}> 
//             <Plus size={18} className="mr-2" /> New Transaction
//           </Button>
//         )}
        
//         {showDatePicker && (
//           <div className="px-4 py-2 border rounded-md flex items-center text-sm">
//             <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 mr-2">
//               <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5" />
//             </svg>
//             {dateRangeString || 'Select Date Range'} 
//           </div>
//         )}
        
//         <button className="relative">
//           <Bell className="text-gray-500" size={22} />
//         </button>
        
//         <div className="h-9 w-9 rounded-full bg-gray-200 flex items-center justify-center relative">
//           <span className="text-gray-600">J</span>
//           <span className="absolute bottom-0 right-0 h-2.5 w-2.5 rounded-full bg-green-500 border-2 border-white"></span>
//         </div>
//       </div>
//     </header>
//   );
// };

// export default Header;



import React from 'react';

interface HeaderProps {
  showNewTransaction?: boolean;
  onNewTransactionClick?: () => void;
}

const Header: React.FC<HeaderProps> = ({ showNewTransaction, onNewTransactionClick }) => {
  return (
    <header className="bg-white border-b border-gray-200 px-6 py-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <input 
            type="text" 
            placeholder="Search" 
            className="w-64 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        
        <div className="flex items-center space-x-4">
          {showNewTransaction && (
            <button 
              onClick={onNewTransactionClick}
              className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
            >
              + New Transaction
            </button>
          )}
          <div className="w-8 h-8 bg-gray-300 rounded-full"></div>
        </div>
      </div>
    </header>
  );
};

export default Header;