/**
 * NoteCard Component Unit Tests
 *
 * Tests cover:
 * - Rendering of title and timestamp
 * - Text truncation for long content
 * - Click handler for edit button
 * - Custom className application
 * - Empty content handling
 *
 * Mocks:
 * - DateFormatter: Returns static date string
 * - RenderMentionedText: Returns input text unchanged
 */

// <reference types="vitest" />
// React Core Imports
import React from 'react';
// Testing Imports
import { render, screen } from '@testing-library/react';
import { fireEvent } from '@testing-library/dom';
import { describe, test, expect, vi, beforeEach } from 'vitest';
// Relative Imports
import NoteCard from '../note_card';
// Local - Utility Function Imports
import { DateFormatter } from '@/utils/date-formatter';
import { RenderMentionedText } from '@/utils/mention-helper';
// Local - Test Helper Imports
import { mockNotes, mockUsers } from '@/test/mocks/data';
import { GetTestId } from '@/test/mocks/helpers';

// Mock the utility functions
vi.mock('@/utils/date-formatter', () => ({
  DateFormatter: vi.fn().mockReturnValue('March 15, 2023'),
}));

vi.mock('@/utils/mention-helper', () => ({
  RenderMentionedText: vi.fn().mockImplementation((text) => text),
}));

describe('NoteCard Component', () => {
  const mockNote = mockNotes[0];
  const mockHandleClick = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
  });

  test('renders note with correct title and timestamp', () => {
    render(<NoteCard note={mockNote} users={mockUsers} />);

    // Check title is rendered
    expect(screen.getByTestId(GetTestId('note-card', mockNote.id, 'title'))).toHaveTextContent(
      mockNote.title
    );

    // Check timestamp is rendered correctly
    expect(DateFormatter).toHaveBeenCalledWith(mockNote.updatedAt);
    expect(screen.getByTestId(GetTestId('note-card', mockNote.id, 'timestamp'))).toHaveTextContent(
      'Last Updated: March 15, 2023'
    );
  });

  test('truncates long note body and uses RenderMentionedText', () => {
    const longBodyNote = {
      ...mockNote,
      body: 'This is a very long note body that should be truncated because it exceeds the maximum length allowed for preview. It will have an ellipsis added at the end to indicate truncation.',
    };

    render(<NoteCard note={longBodyNote} users={mockUsers} />);

    // Check that truncation was performed and RenderMentionedText was called with truncated text
    expect(RenderMentionedText).toHaveBeenCalledWith(expect.stringContaining('...'), mockUsers);
  });

  test('calls handleClick when edit button is clicked', () => {
    render(<NoteCard note={mockNote} users={mockUsers} handleClick={mockHandleClick} />);

    // Find and click the edit button using data-testid
    const editButton = screen.getByTestId(GetTestId('note-card', mockNote.id, 'edit-button'));
    fireEvent.click(editButton);

    // Verify handler was called
    expect(mockHandleClick).toHaveBeenCalledTimes(1);
  });

  test('applies custom className when provided', () => {
    render(<NoteCard note={mockNote} users={mockUsers} className="custom-class" />);

    // Find card container using data-testid
    const cardElement = screen.getByTestId(GetTestId('note-card', mockNote.id));
    expect(cardElement).toHaveClass('custom-class');
  });

  test('handles empty note body gracefully', () => {
    const emptyBodyNote = { ...mockNote, body: '' };
    render(<NoteCard note={emptyBodyNote} users={mockUsers} />);

    // Verify that RenderMentionedText handles empty string properly
    expect(RenderMentionedText).toHaveBeenCalledWith('', mockUsers);
  });

  test('note actions stop event propagation', () => {
    // Create a mock click function to attach to the card
    const mockCardClick = vi.fn();

    render(
      <div onClick={mockCardClick}>
        <NoteCard note={mockNote} users={mockUsers} handleClick={mockHandleClick} />
      </div>
    );

    // Click on the actions area
    const actionsArea = screen.getByTestId(GetTestId('note-card', mockNote.id, 'actions'));
    fireEvent.click(actionsArea);

    // Ensure parent click handler wasn't called
    expect(mockCardClick).not.toHaveBeenCalled();
  });
});
