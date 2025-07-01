
// import React from 'react';
// import { ArrowDown, ArrowUp, ArrowRight } from 'lucide-react';

// interface StatsCardProps {
//   title: string;
//   value: string | number;
//   trend: number;
//   trendPeriod?: string;
//   icon?: React.ReactNode;
//   iconBg?: string;
//   textColor?: string;
//   trendColor?: 'green' | 'red' | 'yellow';
// }

// const StatsCard: React.FC<StatsCardProps> = ({
//   title,
//   value,
//   trend,
//   trendPeriod = 'from last month',
//   icon,
//   iconBg = 'bg-gray-100',
//   textColor = 'text-gray-800',
//   trendColor,
// }) => {
//   const getTrendColor = () => {
//     if (trendColor) {
//       return trendColor === 'green' 
//         ? 'text-green-600' 
//         : trendColor === 'red' 
//           ? 'text-red-500' 
//           : 'text-yellow-500';
//     }
    
//     return trend > 0 ? 'text-green-600' : trend < 0 ? 'text-red-500' : 'text-gray-500';
//   };

//   const getTrendIcon = () => {
//     if (trend > 0) {
//       return <ArrowUp size={14} className="inline" />;
//     } else if (trend < 0) {
//       return <ArrowDown size={14} className="inline" />;
//     }
//     return <ArrowRight size={14} className="inline" />;
//   };

//   return (
//     <div className="bg-white rounded-lg p-4 border">
//       <div className="flex items-center justify-between mb-2">
//         <span className="text-sm text-gray-500">{title}</span>
//         {icon}
//       </div>
//       <div className={`text-2xl font-semibold ${textColor}`}>{value}</div>
//       <div className={`text-xs mt-1 ${getTrendColor()}`}>
//         {getTrendIcon()} {trend > 0 ? '+' : ''}{trend}% {trendPeriod}
//       </div>
//     </div>
//   );
// };

// export default StatsCard;


import React from 'react';

interface StatsCardProps {
  title: string;
  value: string;
  trend?: number;
  trendColor?: 'green' | 'red' | 'yellow';
  icon?: React.ReactNode;
  textColor?: string;
  isLoading?: boolean;
  onClick?: () => void; // New prop: function to call when the card is clicked
  isActive?: boolean; // New prop: boolean to indicate if the card is currently active
}

const StatsCard: React.FC<StatsCardProps> = ({
  title,
  value,
  trend,
  trendColor,
  icon,
  textColor = 'text-gray-800',
  isLoading = false,
  onClick, // Destructure the new onClick prop
  isActive = false // Destructure the new isActive prop, default to false
}) => {
  const trendClass =
    trendColor === 'green'
      ? 'text-green-500'
      : trendColor === 'red'
      ? 'text-red-500'
      : trendColor === 'yellow'
      ? 'text-yellow-500'
      : 'text-gray-500';

  const cardClasses = `
    bg-white
    rounded-lg
    p-4
    border
    shadow-sm
    ${onClick ? 'cursor-pointer hover:shadow-md transition-shadow duration-200' : ''}
    ${isActive ? 'border-blue-500 ring-2 ring-blue-200' : 'border-gray-200'}
  `;

  return (
    <div className={cardClasses} onClick={onClick}> {/* Apply onClick handler here */}
      {isLoading ? (
        // Loading skeleton
        <>
          <div className="h-4 bg-gray-200 rounded w-1/3 mb-2"></div>
          <div className="h-8 bg-gray-200 rounded w-1/2 mb-2"></div>
          <div className="h-4 bg-gray-200 rounded w-1/4"></div>
        </>
      ) : (
        <>
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-sm font-medium text-gray-500">{title}</h3>
            {icon && <div className="text-gray-400">{icon}</div>}
          </div>
          <div className="flex items-end justify-between">
            <p className={`text-2xl font-bold ${textColor}`}>{value}</p>
            {trend !== undefined && (
              <div className={`flex items-center text-sm font-medium ${trendClass}`}>
                {trend > 0 && (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-4 w-4 mr-1"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
                  </svg>
                )}
                {trend < 0 && (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-4 w-4 mr-1"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                  </svg>
                )}
                {trend}%
              </div>
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default StatsCard;
