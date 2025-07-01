
// import React from 'react';
// import { PieChart, Pie, Cell, Legend, ResponsiveContainer } from 'recharts';

// interface PaymentMethod {
//   name: string;
//   value: number;
//   color: string;
// }

// interface PaymentMethodsChartProps {
//   data: PaymentMethod[];
//   title?: string;
//   isLoading?: boolean;
// }

// const PaymentMethodsChart: React.FC<PaymentMethodsChartProps> = ({ 
//   data, 
//   title = "Payment Methods",
//   isLoading = false
// }) => {
//   if (isLoading) {
//     return (
//       <div className="bg-white border rounded-lg p-4">
//         <h3 className="font-semibold mb-4">{title}</h3>
//         <div className="w-full h-56 flex items-center justify-center">
//           <div className="animate-pulse text-gray-400">Loading chart data...</div>
//         </div>
//       </div>
//     );
//   }
  
//   if (!data || data.length === 0) {
//     return (
//       <div className="bg-white border rounded-lg p-4">
//         <h3 className="font-semibold mb-4">{title}</h3>
//         <div className="w-full h-56 flex items-center justify-center">
//           <div className="text-gray-500">No payment method data available</div>
//         </div>
//       </div>
//     );
//   }
  
//   return (
//     <div className="bg-white border rounded-lg p-4">
//       <h3 className="font-semibold mb-4">{title}</h3>
//       <div className="w-full h-56">
//         <ResponsiveContainer width="100%" height="100%">
//           <PieChart>
//             <Pie
//               data={data}
//               cx="50%"
//               cy="50%"
//               innerRadius={60}
//               outerRadius={80}
//               paddingAngle={0}
//               dataKey="value"
//               stroke="none"
//             >
//               {data.map((entry, index) => (
//                 <Cell key={`cell-${index}`} fill={entry.color} />
//               ))}
//             </Pie>
//           </PieChart>
//         </ResponsiveContainer>
//       </div>
//       <div className="mt-2 grid grid-cols-2 gap-2">
//         {data.map((entry) => (
//           <div key={entry.name} className="flex items-center text-sm">
//             <div className="w-3 h-3 rounded-full mr-2" style={{ backgroundColor: entry.color }}></div>
//             <span>{entry.name}</span>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default PaymentMethodsChart;


import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from 'recharts';

interface PaymentMethodsChartProps {
  data: { name: string; value: number }[];
}

// Define an array of distinct colors for the chart segments
const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#AF19FF', '#E65100']; // Add more colors if you expect more than 6 payment methods

// Custom label for the Pie chart to display percentages directly on segments
const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent, index }: any) => {
  const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
  const x = cx + radius * Math.cos(-midAngle * Math.PI / 180);
  const y = cy + radius * Math.sin(-midAngle * Math.PI / 180);

  // Only display label if the percentage is significant enough
  if (percent * 100 > 5) { // e.g., show label if segment is larger than 5%
    return (
      <text x={x} y={y} fill="white" textAnchor={x > cx ? 'start' : 'end'} dominantBaseline="central" fontSize={12}>
        {`${(percent * 100).toFixed(0)}%`}
      </text>
    );
  }
  return null;
};

// Custom Tooltip component to display name, count, and percentage
const CustomTooltip = ({ active, payload }: any) => {
  if (active && payload && payload.length) {
    const dataEntry = payload[0];
    const name = dataEntry.name;
    const value = dataEntry.value;

    // Calculate total to get percentage
    const total = payload[0].payload.total; // Access the total calculated in the PieChart component
    const percentage = total > 0 ? ((value / total) * 100).toFixed(1) : 0;

    return (
      <div className="custom-tooltip" style={{ backgroundColor: 'white', padding: '10px', border: '1px solid #ccc', borderRadius: '4px' }}>
        <p className="label" style={{ color: dataEntry.color, fontWeight: 'bold' }}>{`${name}`}</p>
        <p className="intro">{`Transactions: ${value}`}</p>
        <p className="desc">{`Percentage: ${percentage}%`}</p>
      </div>
    );
  }
  return null;
};

const PaymentMethodsChart: React.FC<PaymentMethodsChartProps> = ({ data }) => {
  // Calculate total value for percentage calculations in the tooltip
  const total = data.reduce((sum, entry) => sum + entry.value, 0);

  // Add the total to each data entry for easy access in the CustomTooltip
  const dataWithTotal = data.map(entry => ({ ...entry, total }));

  return (
    <div className="bg-white rounded-lg p-4 border"> {/* Added a container div for consistent styling */}
      <h2 className="font-semibold text-lg mb-4">Payment Methods</h2> {/* Added the title here */}
      <ResponsiveContainer width="100%" height={300}>
        <PieChart>
          <Pie
            data={dataWithTotal} // Use dataWithTotal to pass 'total' to CustomTooltip
            dataKey="value"
            nameKey="name"
            cx="50%"
            cy="50%"
            outerRadius={80}
            fill="#8884d8" // This fill will be overridden by Cell colors
            label={renderCustomizedLabel} // Display percentage labels on segments
            labelLine={false} // Hide the lines connecting labels to segments
          >
            {/* Assign different colors to each segment */}
            {dataWithTotal.map((entry, index) => (
              <Cell key={`cell-${entry.name}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          {/* Use the custom tooltip component */}
          <Tooltip content={<CustomTooltip />} /> 
          <Legend /> {/* The legend will show the color and name */}
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
};

export default PaymentMethodsChart;
