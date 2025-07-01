
import React from 'react';
import { File, ArrowLeftRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { toast } from 'sonner';

interface QuickActionsProps {
  className?: string;
}

const QuickActions: React.FC<QuickActionsProps> = ({ className }) => {
  const handleGenerateReport = () => {
    // Simulate report generation and download
    toast.success('Report generated successfully!');
    
    // Create a sample CSV content
    const csvContent = `Transaction ID,Customer,Amount,Status,Date
TR-001,John Doe,50000,Successful,2025-01-15
TR-002,Jane Smith,75000,Pending,2025-01-14
TR-003,Mike Johnson,30000,Failed,2025-01-13`;
    
    // Create and trigger download
    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `mulaflow-report-${new Date().toISOString().split('T')[0]}.csv`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    window.URL.revokeObjectURL(url);
  };

  const actions = [
    {
      title: 'Generate Report',
      icon: <File size={20} />,
      onClick: handleGenerateReport
    },
    {
      title: 'Reconcile Accounts',
      icon: <ArrowLeftRight size={20} />,
      path: '/reconciliation'
    }
  ];

  return (
    <div className={`bg-white border rounded-lg ${className}`}>
      <div className="p-4 border-b">
        <h3 className="font-semibold">Quick Actions</h3>
      </div>
      <div className="divide-y">
        {actions.map((action, index) => (
          action.path ? (
            <Link 
              key={index} 
              to={action.path} 
              className="flex items-center p-4 hover:bg-gray-50 transition-colors"
            >
              <div className="mr-3 text-gray-600">{action.icon}</div>
              <span>{action.title}</span>
            </Link>
          ) : (
            <button
              key={index}
              onClick={action.onClick}
              className="w-full flex items-center p-4 hover:bg-gray-50 transition-colors text-left"
            >
              <div className="mr-3 text-gray-600">{action.icon}</div>
              <span>{action.title}</span>
            </button>
          )
        ))}
      </div>
    </div>
  );
};

export default QuickActions;
