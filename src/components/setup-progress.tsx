
import React from 'react';
import { cn } from '@/lib/utils';
import { Link } from 'react-router-dom';

interface SetupStep {
  number: number;
  title: string;
  description: string;
  path: string;
  buttonText: string;
  isComplete?: boolean;
}

interface SetupProgressProps {
  steps: SetupStep[];
  completedSteps: number[];
}

const SetupProgress: React.FC<SetupProgressProps> = ({ steps, completedSteps }) => {
  return (
    <div className="mb-8">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-semibold">Onboarding Progress</h2>
        <div className="text-sm text-gray-500">
          {completedSteps.length}/{steps.length} completed
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {steps.map((step) => (
          <div key={step.number} className="border rounded-lg p-5 bg-white">
            <div className="mb-4">
              <h3 className="font-semibold text-lg">Step {step.number}</h3>
              <p className="text-gray-700">{step.title}</p>
            </div>
            <p className="text-sm text-gray-500 mb-8">{step.description}</p>
            <Link
              to={step.path}
              className={cn(
                "block text-center px-4 py-2 rounded-md font-medium text-sm",
                completedSteps.includes(step.number)
                  ? "bg-blue-700 text-white hover:bg-blue-800"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              )}
            >
              {step.buttonText}
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SetupProgress;
