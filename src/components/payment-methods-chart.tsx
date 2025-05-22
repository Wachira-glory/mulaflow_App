
import React from 'react';
import { PieChart, Pie, Cell, Legend, ResponsiveContainer } from 'recharts';

interface PaymentMethod {
  name: string;
  value: number;
  color: string;
}

interface PaymentMethodsChartProps {
  data: PaymentMethod[];
  title?: string;
  isLoading?: boolean;
}

const PaymentMethodsChart: React.FC<PaymentMethodsChartProps> = ({ 
  data, 
  title = "Payment Methods",
  isLoading = false
}) => {
  if (isLoading) {
    return (
      <div className="bg-white border rounded-lg p-4">
        <h3 className="font-semibold mb-4">{title}</h3>
        <div className="w-full h-56 flex items-center justify-center">
          <div className="animate-pulse text-gray-400">Loading chart data...</div>
        </div>
      </div>
    );
  }
  
  if (!data || data.length === 0) {
    return (
      <div className="bg-white border rounded-lg p-4">
        <h3 className="font-semibold mb-4">{title}</h3>
        <div className="w-full h-56 flex items-center justify-center">
          <div className="text-gray-500">No payment method data available</div>
        </div>
      </div>
    );
  }
  
  return (
    <div className="bg-white border rounded-lg p-4">
      <h3 className="font-semibold mb-4">{title}</h3>
      <div className="w-full h-56">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              innerRadius={60}
              outerRadius={80}
              paddingAngle={0}
              dataKey="value"
              stroke="none"
            >
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Pie>
          </PieChart>
        </ResponsiveContainer>
      </div>
      <div className="mt-2 grid grid-cols-2 gap-2">
        {data.map((entry) => (
          <div key={entry.name} className="flex items-center text-sm">
            <div className="w-3 h-3 rounded-full mr-2" style={{ backgroundColor: entry.color }}></div>
            <span>{entry.name}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PaymentMethodsChart;
