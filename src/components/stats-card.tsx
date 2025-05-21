
import React from 'react';
import { ArrowDown, ArrowUp, ArrowRight } from 'lucide-react';

interface StatsCardProps {
  title: string;
  value: string | number;
  trend: number;
  trendPeriod?: string;
  icon?: React.ReactNode;
  iconBg?: string;
  textColor?: string;
  trendColor?: 'green' | 'red' | 'yellow';
}

const StatsCard: React.FC<StatsCardProps> = ({
  title,
  value,
  trend,
  trendPeriod = 'from last month',
  icon,
  iconBg = 'bg-gray-100',
  textColor = 'text-gray-800',
  trendColor,
}) => {
  const getTrendColor = () => {
    if (trendColor) {
      return trendColor === 'green' 
        ? 'text-green-600' 
        : trendColor === 'red' 
          ? 'text-red-500' 
          : 'text-yellow-500';
    }
    
    return trend > 0 ? 'text-green-600' : trend < 0 ? 'text-red-500' : 'text-gray-500';
  };

  const getTrendIcon = () => {
    if (trend > 0) {
      return <ArrowUp size={14} className="inline" />;
    } else if (trend < 0) {
      return <ArrowDown size={14} className="inline" />;
    }
    return <ArrowRight size={14} className="inline" />;
  };

  return (
    <div className="bg-white rounded-lg p-4 border">
      <div className="flex items-center justify-between mb-2">
        <span className="text-sm text-gray-500">{title}</span>
        {icon}
      </div>
      <div className={`text-2xl font-semibold ${textColor}`}>{value}</div>
      <div className={`text-xs mt-1 ${getTrendColor()}`}>
        {getTrendIcon()} {trend > 0 ? '+' : ''}{trend}% {trendPeriod}
      </div>
    </div>
  );
};

export default StatsCard;
