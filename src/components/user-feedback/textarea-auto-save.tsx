/**
 * TextareaAutoSave Component
 *
 * Displays the current save status for form elements with auto-save functionality.
 * Shows different status indicators based on the current save state:
 * - saving: Shows "Saving..." text
 * - saved: Shows a green checkmark with "Saved" text
 * - error: Shows a red alert icon with error message
 * - idle: Shows nothing
 */

// React Core Imports
import React from 'react';
// Lucide-React Imports
import { CheckCircle, AlertCircle } from 'lucide-react';

// Save status type
export type SaveStatus = 'idle' | 'saving' | 'saved' | 'error';

interface TextareaAutoSaveProps {
  status: SaveStatus;
  errorMessage?: string;
  className?: string;
}

const TextareaAutoSave: React.FC<TextareaAutoSaveProps> = ({
  status,
  errorMessage = 'Error saving',
  className = '',
}) => {
  // Don't render anything if status is idle
  if (status === 'idle') {
    return null;
  }

  return (
    <div className={`flex items-center text-sm ${className}`} data-testid={`save-status-${status}`}>
      {status === 'saving' && (
        <span className="text-gray-500" data-testid="saving-indicator">
          Saving...
        </span>
      )}

      {status === 'saved' && (
        <div className="flex items-center text-green-600" data-testid="saved-indicator">
          <CheckCircle className="mr-1 h-4 w-4" />
          <span>Saved</span>
        </div>
      )}

      {status === 'error' && (
        <div className="flex items-center text-red-600" data-testid="error-indicator">
          <AlertCircle className="mr-1 h-4 w-4" />
          <span data-testid="error-message">{errorMessage}</span>
        </div>
      )}
    </div>
  );
};

export default TextareaAutoSave;
