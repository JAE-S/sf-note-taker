/**
 * Header Component Unit Tests
 *
 * Tests cover:
 * - Rendering of logo and reset button
 * - Accessibility features
 * - Button state management
 * - Interaction handling
 */

// <reference types="vitest" />
// React Core Imports
import React from 'react';
// Testing Imports
import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
// Store Imports
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { api } from '@/store/apis/';
// Relative Imports
import Header from '..';

// Manually import the actions to ensure correct path
import {
  resetSession,
  resetSessionStart,
  resetSessionComplete,
} from '@/store/slices/session_slice';

// Mock the hooks
vi.mock('@/store/hooks', () => ({
  useAppDispatch: vi.fn(),
  useAppSelector: vi.fn(),
}));

// Mock the APIs
vi.mock('@/store/apis/', () => ({
  api: {
    util: {
      resetApiState: vi.fn(),
    },
  },
}));

// Mock the session slice actions
vi.mock('@/store/slices/session_slice', () => ({
  resetSession: vi.fn(() => 'new-session-id'),
  resetSessionStart: vi.fn(),
  resetSessionComplete: vi.fn(),
  selectIsResettingSession: vi.fn(),
}));

describe('Header Component', () => {
  const mockDispatch = vi.fn();

  beforeEach(() => {
    // Clear all mocks before each test
    vi.clearAllMocks();

    // Setup mock implementations
    (useAppDispatch as ReturnType<typeof vi.fn>).mockReturnValue(mockDispatch);
    (useAppSelector as ReturnType<typeof vi.fn>).mockReturnValue(false); // not resetting by default
  });

  it('renders header with logo and reset button', () => {
    render(<Header />);

    // Check logo elements
    const logoLink = screen.getByTestId('header-logo-link');
    const logoImage = screen.getByTestId('header-logo-image');
    expect(logoLink).toBeTruthy();
    expect(logoImage).toBeTruthy();

    // Check reset button
    const resetButton = screen.getByTestId('reset-session-button');
    expect(resetButton).toHaveTextContent('Reset Session');
  });

  it('handles reset session button click', () => {
    render(<Header />);

    const resetButton = screen.getByTestId('reset-session-button');
    fireEvent.click(resetButton);

    // Verify dispatched actions
    expect(resetSessionStart).toHaveBeenCalled();
    expect(resetSession).toHaveBeenCalled();
    expect(api.util.resetApiState).toHaveBeenCalled();
    expect(resetSessionComplete).toHaveBeenCalledWith('new-session-id');
  });

  it('disables reset button during session reset', () => {
    // Mock isResetting to true
    (useAppSelector as ReturnType<typeof vi.fn>).mockReturnValue(true);

    render(<Header />);

    const resetButton = screen.getByTestId('reset-session-button');
    expect(resetButton).toBeDisabled();
    expect(resetButton).toHaveTextContent('Resetting...');
  });

  it('ensures keyboard navigation accessibility', () => {
    render(<Header />);

    const header = screen.getByTestId('app-header');
    const logoLink = screen.getByTestId('header-logo-link');
    const resetButton = screen.getByTestId('reset-session-button');

    // Check tabIndex and focusability
    expect(header).toHaveAttribute('tabindex', '0');

    // Check focus states
    expect(logoLink).toHaveClass('focus:outline-none', 'focus:ring-2', 'focus:ring-blue-500');
    expect(resetButton).toHaveClass('focus:outline-none', 'focus:ring-2', 'focus:ring-red-500');
  });

  it('provides appropriate aria attributes', () => {
    render(<Header />);

    const logoLink = screen.getByTestId('header-logo-link');
    const resetButton = screen.getByTestId('reset-session-button');
    const nav = screen.getByRole('navigation');

    expect(logoLink).toHaveAttribute('title', 'SURFE');
    expect(resetButton).toHaveAttribute('aria-label', 'Reset current session');
    expect(nav).toHaveAttribute('aria-label', 'Session controls');
  });
});
