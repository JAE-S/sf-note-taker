// React Core Imports
import React from 'react';
// Testing Imports
import { vi } from 'vitest';
// Relative Imports
import { mockSessionId } from './data';

// Mock utility functions
export const setupMockUtils = () => {
  // Mock the mention helper
  vi.mock('@/utils/mention-helper', () => ({
    RenderMentionedText: vi
      .fn()
      .mockImplementation((text) =>
        React.createElement('div', { 'data-testid': 'mention-preview' }, text)
      ),
  }));

  // Mock the date formatter
  vi.mock('@/utils/date-formatter', () => ({
    DateFormatter: vi.fn().mockReturnValue('March 15, 2023'),
  }));

  // Mock session selector
  vi.mock('@/store/slices/session_slice', () => ({
    selectSessionId: vi.fn().mockReturnValue(mockSessionId),
  }));

  // Mock the app selector hook
  vi.mock('@/store/hooks', () => ({
    useAppSelector: vi.fn().mockImplementation((selector) => {
      if (selector.name === 'selectSessionId') {
        return mockSessionId;
      }
      return null;
    }),
  }));
};
