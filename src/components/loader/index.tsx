// React Core Imports
import React from 'react';
// Lucide-React Imports
import { Loader2 } from 'lucide-react';

interface LoaderProps {
  message?: string;
  className?: string;
  size?: number;
}

const Loader: React.FC<LoaderProps> = ({ message = 'Loading...', className = '', size = 24 }) => {
  return (
    <div
      className={`flex flex-col items-center justify-center space-y-3 ${className}`}
      data-testid="loader-container"
    >
      <Loader2 className="animate-spin text-blue-500" size={size} data-testid="loader-icon" />
      {message && (
        <p className="animate-pulse text-sm text-gray-600" data-testid="loader-message">
          {message}
        </p>
      )}
    </div>
  );
};

export default Loader;
