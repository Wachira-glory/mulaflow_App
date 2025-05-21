
import React from 'react';
import { File, ArrowLeftRight, Download } from 'lucide-react';
import { Link } from 'react-router-dom';

interface QuickActionsProps {
  className?: string;
}

const QuickActions: React.FC<QuickActionsProps> = ({ className }) => {
  const actions = [
    {
      title: 'Generate Report',
      icon: <File size={20} />,
      path: '/reports/generate'
    },
    {
      title: 'Reconcile Accounts',
      icon: <ArrowLeftRight size={20} />,
      path: '/reconciliation'
    },
    {
      title: 'Export Data',
      icon: <Download size={20} />,
      path: '/export'
    }
  ];

  return (
    <div className={`bg-white border rounded-lg ${className}`}>
      <div className="p-4 border-b">
        <h3 className="font-semibold">Quick Actions</h3>
      </div>
      <div className="divide-y">
        {actions.map((action, index) => (
          <Link 
            key={index} 
            to={action.path} 
            className="flex items-center p-4 hover:bg-gray-50 transition-colors"
          >
            <div className="mr-3 text-gray-600">{action.icon}</div>
            <span>{action.title}</span>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default QuickActions;
