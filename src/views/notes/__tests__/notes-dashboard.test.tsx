/**
 * NotesView Component Unit Tests
 *
 * Tests cover:
 * - Rendering in different states (loading, error, empty, with notes)
 * - Accessibility features
 * - Modal interaction
 * - Create note button functionality
 */

// <reference types="vitest" />
// React Core Imports
import React from 'react';
// Testing Imports
import { render, screen, within } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
// Store Imports
import * as hooksModule from '@/store/hooks';
import * as apiModule from '@/store/apis';
// Relative Import
import NotesView from '../notes-dashboard_view';
// Local - Test Helper Imports
import { mockNotes, mockUsers } from '@/test/mocks/data';

// Mock the hooks
vi.mock('@/store/hooks', () => ({
  useAppSelector: vi.fn(),
  useAppDispatch: vi.fn(() => vi.fn()),
}));

vi.mock('@/store/apis', () => ({
  useGetNotesQuery: vi.fn(),
  useGetUsersQuery: vi.fn(),
}));

// Mock components
vi.mock('@/components/loader', () => ({
  default: vi.fn(({ message }) => <div data-testid="loader">{message}</div>),
}));

// Use the actual mocking approach from the NoteCard component
vi.mock('./components/note_card', () => ({
  default: vi.fn(({ note, _users, _handleClick }) => (
    <div data-testid={`note-card-${note.id}`}>Mocked Note Card for {note.title}</div>
  )),
}));

describe('NotesView Component', () => {
  beforeEach(() => {
    // Reset mocks
    vi.clearAllMocks();

    // Type-safe mock implementations
    (hooksModule.useAppSelector as ReturnType<typeof vi.fn>).mockReturnValue('test-session-id');

    (apiModule.useGetUsersQuery as ReturnType<typeof vi.fn>).mockReturnValue({
      data: mockUsers,
      isLoading: false,
      isError: false,
    });

    (apiModule.useGetNotesQuery as ReturnType<typeof vi.fn>).mockReturnValue({
      data: mockNotes,
      isLoading: false,
      isError: false,
      refetch: vi.fn(),
    });
  });

  it('renders loading state', () => {
    // Mock loading state
    (apiModule.useGetNotesQuery as ReturnType<typeof vi.fn>).mockReturnValue({
      data: [],
      isLoading: true,
      isError: false,
    });

    render(<NotesView />);

    // Check for loader
    const loader = screen.getByTestId('loader');
    expect(loader).toBeTruthy();
    expect(loader).toHaveTextContent('Loading notes...');
  });

  it('renders error state', () => {
    // Mock error state
    (apiModule.useGetNotesQuery as ReturnType<typeof vi.fn>).mockReturnValue({
      data: [],
      isLoading: false,
      isError: true,
    });

    render(<NotesView />);

    // Check for error message
    const errorMessage = screen.getByTestId('notes-error');
    expect(errorMessage).toBeTruthy();
    expect(errorMessage).toHaveTextContent('Failed to load notes');
  });

  it('renders empty state when no notes', () => {
    // Mock empty notes
    (apiModule.useGetNotesQuery as ReturnType<typeof vi.fn>).mockReturnValue({
      data: [],
      isLoading: false,
      isError: false,
    });

    render(<NotesView />);

    // Check for empty state
    const emptyState = screen.getByTestId('empty-notes-state');
    expect(emptyState).toBeTruthy();
    expect(emptyState).toHaveTextContent('No notes found');
  });

  it('renders notes grid when notes exist', () => {
    render(<NotesView />);

    // Check notes grid
    const notesGrid = screen.getByTestId('notes-grid');
    expect(notesGrid).toBeTruthy();

    // Check note item containers
    const noteItemContainers = screen.getAllByTestId(/note-item-/);

    // Verify the number of note item containers
    expect(noteItemContainers.length).toBe(mockNotes.length);

    // Check each note item container
    noteItemContainers.forEach((container, index) => {
      // Verify the test id of the note item container
      expect(container).toHaveAttribute('data-testid', `note-item-${mockNotes[index].id}`);

      // Find the note card within the container
      const noteCard = within(container).getByTestId(`note-card-${mockNotes[index].id}`);
      expect(noteCard).toBeTruthy();
    });
  });

  it('create note button is enabled', () => {
    render(<NotesView />);

    // Find create note button
    const createButton = screen.getByTestId('create-note-button');
    expect(createButton).not.toBeDisabled();
  });

  it('page title is rendered correctly', () => {
    render(<NotesView />);

    const pageTitle = screen.getByTestId('notes-title');
    expect(pageTitle).toHaveTextContent('Note Taker');
  });
});
