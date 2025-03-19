/**
 * NoteEditor Component Unit Tests
 *
 * Tests cover:
 * - Rendering of create and edit modes
 * - Form validation and input handling
 * - Mention suggestions and preview functionality
 * - Button state management
 * - Interaction with users and notes data
 *
 * Mocks:
 * - Redux hooks and API queries
 * - DateFormatter to return static date
 * - RenderMentionedText to return input text
 */

// <reference types="vitest" />
// React Core Imports
import React from 'react';
// Testing Imports
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
// Redux Imports
import { useGetUsersQuery, useUpdateNoteMutation, useCreateNoteMutation } from '@/store/apis';
import { useAppSelector } from '@/store/hooks';
// Local - Utility Function Imports
import { RenderMentionedText } from '@/utils/mention-helper';
// Local - Test Helper Imports
import { mockNotes, mockUsers } from '@/test/mocks/data';
//  Relative Imports
import NoteEditor from '../note_editor';

// Mock the utility functions
vi.mock('@/utils/mention-helper', () => ({
  RenderMentionedText: vi.fn().mockImplementation((text) => text),
}));

// Mock Redux hooks and API queries
vi.mock('@/store/hooks', () => ({
  useAppSelector: vi.fn(),
}));

vi.mock('@/store/apis', () => ({
  useGetUsersQuery: vi.fn(),
  useUpdateNoteMutation: vi.fn(),
  useCreateNoteMutation: vi.fn(),
}));

describe('NoteEditor Component', () => {
  const mockNote = mockNotes[0];
  const mockOnClose = vi.fn();

  beforeEach(() => {
    // Reset all mocks
    vi.clearAllMocks();

    // Mock session ID
    (useAppSelector as any).mockReturnValue('test-session-123');

    // Mock users query
    (useGetUsersQuery as any).mockReturnValue({
      data: mockUsers,
      isLoading: false,
    });

    // Mock mutations with resolved promises
    const mockCreateNote = vi.fn().mockResolvedValue({
      data: { id: Date.now(), title: 'New Note', body: 'Test content' },
    });
    const mockUpdateNote = vi.fn().mockResolvedValue({
      data: { id: 1, title: 'Updated Note', body: 'Updated content' },
    });

    (useCreateNoteMutation as any).mockReturnValue([mockCreateNote, { isLoading: false }]);
    (useUpdateNoteMutation as any).mockReturnValue([mockUpdateNote, { isLoading: false }]);
  });

  it('renders create mode with empty fields', () => {
    render(<NoteEditor selectedNote={null} onClose={mockOnClose} isOpen={true} />);

    const titleInput = screen.getByTestId('note-title-input');
    const bodyTextarea = screen.getByTestId('note-body-textarea');
    const createButton = screen.getByTestId('create-note-button');

    expect(titleInput).toHaveValue('');
    expect(bodyTextarea).toHaveValue('');
    expect(createButton).toBeDisabled();
  });

  it('renders edit mode with pre-filled note', () => {
    render(<NoteEditor selectedNote={mockNote} onClose={mockOnClose} isOpen={true} />);

    const titleInput = screen.getByTestId('note-title-input');
    const bodyTextarea = screen.getByTestId('note-body-textarea');

    expect(titleInput).toHaveValue(mockNote.title);
    expect(bodyTextarea).toHaveValue(mockNote.body);
  });

  it('enables create button when title and body are filled', () => {
    render(<NoteEditor selectedNote={null} onClose={mockOnClose} isOpen={true} />);

    const titleInput = screen.getByTestId('note-title-input');
    const bodyTextarea = screen.getByTestId('note-body-textarea');
    const createButton = screen.getByTestId('create-note-button');

    // Fill in title and body
    fireEvent.change(titleInput, { target: { value: 'Test Note' } });
    fireEvent.change(bodyTextarea, { target: { value: 'Test content' } });

    expect(createButton).toBeEnabled();
  });

  it('shows mention suggestions when valid mention is typed', () => {
    render(<NoteEditor selectedNote={null} onClose={mockOnClose} isOpen={true} />);

    const titleInput = screen.getByTestId('note-title-input');
    const bodyTextarea = screen.getByTestId('note-body-textarea');

    // Fill in title to enable body textarea
    fireEvent.change(titleInput, { target: { value: 'Test Note' } });

    // Type a partial username to trigger suggestions
    fireEvent.change(bodyTextarea, { target: { value: '@john' } });

    // Wait for suggestions to appear
    return waitFor(() => {
      const mentionSuggestions = screen.getAllByTestId(/mention-suggestion-/);
      expect(mentionSuggestions.length).toBeGreaterThan(0);
    });
  });

  it('shows mention preview with RenderMentionedText', () => {
    render(<NoteEditor selectedNote={null} onClose={mockOnClose} isOpen={true} />);

    const titleInput = screen.getByTestId('note-title-input');
    const bodyTextarea = screen.getByTestId('note-body-textarea');
    const mentionPreview = screen.getByTestId('mention-preview');

    // Fill in title to enable body textarea
    fireEvent.change(titleInput, { target: { value: 'Test Note' } });

    // Type text with mention
    const testMentionText = 'Hello @johndoe';
    fireEvent.change(bodyTextarea, { target: { value: testMentionText } });

    // Verify RenderMentionedText was called with correct text
    expect(RenderMentionedText).toHaveBeenCalledWith(testMentionText, mockUsers);
    expect(mentionPreview).toBeTruthy();
  });
});
