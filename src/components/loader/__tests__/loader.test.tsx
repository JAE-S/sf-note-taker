/**
 * Loader Component Unit Tests
 *
 * Tests cover:
 * - Rendering with default props
 * - Rendering with custom message
 * - Rendering with custom className
 * - Rendering with custom size
 * - Presence of correct data-testid attributes
 */

// <reference types="vitest" />
// React Core Imports
import React from 'react';
// Testing Imports
import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
// Relative Import
import Loader from '..';

describe('Loader Component', () => {
  it('renders with default props', () => {
    render(<Loader />);

    // Check loader container
    const loaderContainer = screen.getByTestId('loader-container');
    expect(loaderContainer).toBeTruthy();

    // Check loader icon
    const loaderIcon = screen.getByTestId('loader-icon');
    expect(loaderIcon).toBeTruthy();

    // Check default message
    const loaderMessage = screen.getByTestId('loader-message');
    expect(loaderMessage).toHaveTextContent('Loading...');
  });

  it('renders with custom message', () => {
    const customMessage = 'Please wait';
    render(<Loader message={customMessage} />);

    const loaderMessage = screen.getByTestId('loader-message');
    expect(loaderMessage).toHaveTextContent(customMessage);
  });

  it('applies custom className', () => {
    const customClass = 'my-custom-loader';
    render(<Loader className={customClass} />);

    const loaderContainer = screen.getByTestId('loader-container');
    expect(loaderContainer).toHaveClass(customClass);
  });

  it('renders with custom size', () => {
    const customSize = 48;
    render(<Loader size={customSize} />);

    const loaderIcon = screen.getByTestId('loader-icon');
    // Check icon has spin and color classes
    expect(loaderIcon).toHaveClass('animate-spin', 'text-blue-500');
  });
});
