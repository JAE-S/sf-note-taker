/**
 * TextareaAutoSave Component Unit Tests
 *
 * Tests cover:
 * - Rendering different save status states
 * - Correct display of status text and icons
 * - Handling of custom error messages
 * - Proper data-testid attributes
 * - Idle state rendering (null)
 */

// <reference types="vitest" />
// React Core Imports
import React from 'react';
// Testing Imports
import { render, screen } from '@testing-library/react';
import { describe, test, expect } from 'vitest';
// Lucide-React Imports
// Local - Component Import
import TextareaAutoSave from '../textarea-auto-save';

describe('TextareaAutoSave Component', () => {
  test('renders nothing when status is idle', () => {
    const { container } = render(<TextareaAutoSave status="idle" />);
    expect(container.firstChild).toBeNull();
  });

  test('renders saving status correctly', () => {
    render(<TextareaAutoSave status="saving" />);

    const savingIndicator = screen.getByTestId('saving-indicator');
    expect(savingIndicator).toHaveTextContent('Saving...');
    expect(savingIndicator).toHaveClass('text-gray-500');
  });

  test('renders saved status with checkmark', () => {
    render(<TextareaAutoSave status="saved" />);

    const savedIndicator = screen.getByTestId('saved-indicator');
    expect(savedIndicator).toHaveTextContent('Saved');
    expect(savedIndicator).toHaveClass('text-green-600');

    const checkIcon = screen.getByTestId('saved-indicator').querySelector('svg');
    expect(checkIcon).toBeTruthy();
  });

  test('renders error status with custom error message', () => {
    const customErrorMessage = 'Save failed';
    render(<TextareaAutoSave status="error" errorMessage={customErrorMessage} />);

    const errorIndicator = screen.getByTestId('error-indicator');
    const errorMessage = screen.getByTestId('error-message');

    expect(errorIndicator).toHaveClass('text-red-600');
    expect(errorMessage).toHaveTextContent(customErrorMessage);

    const alertIcon = screen.getByTestId('error-indicator').querySelector('svg');
    expect(alertIcon).toBeTruthy();
  });

  test('renders default error message when not provided', () => {
    render(<TextareaAutoSave status="error" />);

    const errorMessage = screen.getByTestId('error-message');
    expect(errorMessage).toHaveTextContent('Error saving');
  });

  test('applies custom className', () => {
    const customClass = 'my-custom-class';
    render(<TextareaAutoSave status="saving" className={customClass} />);

    const container = screen.getByTestId('save-status-saving');
    expect(container).toHaveClass(customClass);
  });

  test('renders with correct data-testid for each status', () => {
    const statuses = ['idle', 'saving', 'saved', 'error'] as const;

    statuses.forEach((status) => {
      const { unmount } = render(<TextareaAutoSave status={status} />);

      if (status !== 'idle') {
        const container = screen.getByTestId(`save-status-${status}`);
        expect(container).toBeTruthy();
      }

      unmount();
    });
  });
});
