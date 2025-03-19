/**
 * Notes View Component
 *
 * Main page for the notes application that displays a list of notes and allows users to create/edit them.
 * Features:
 * - Displays notes in a responsive grid layout
 * - Provides create and edit functionality via modal
 * - Shows loading and error states
 * - Supports user mentions within notes
 * - Auto-refreshes note list after changes
 */

// React Core Imports
import React, { useState } from 'react';
// Lucide React Imports
import { FileEdit, X, File } from 'lucide-react';
// Local - Store Imports
import { useAppSelector } from '@/store/hooks';
import { selectSessionId } from '@/store/slices/session_slice';
import { useGetNotesQuery, useGetUsersQuery } from '@/store/apis';
// Local - Layout Imports
import MainLayout from '@/layouts/main_layout';
// Local - Component Imports
import NoteEditor from './components/note_editor';
import NoteCard from './components/note_card';
// Local - Type Imports
import { NoteProps } from '@/types/note_types';

const NotesView: React.FC = () => {
  const sessionId = useAppSelector(selectSessionId);
  const { data: users = [], isLoading: isLoadingUsers, isError: isUsersError } = useGetUsersQuery();
  const {
    data: displayNotes = [],
    isLoading: isLoadingNotes,
    isError: isNotesError,
    refetch: refetchNotes,
  } = useGetNotesQuery(sessionId, {
    skip: !sessionId,
  });

  const [noteModal, setNoteModal] = useState<{
    isOpen: boolean;
    note: NoteProps | null;
  }>({
    isOpen: false,
    note: null,
  });

  const handleNoteAction = (note?: NoteProps) => {
    setNoteModal({
      isOpen: true,
      note: note || null,
    });
  };

  const handleCloseModal = () => {
    setNoteModal({
      isOpen: false,
      note: null,
    });

    // Refresh notes list when closing the modal
    refetchNotes();
  };

  if (isLoadingNotes || isLoadingUsers) {
    return (
      <div className="flex justify-center py-8">
        <div className="animate-pulse text-gray-500">Loading notes...</div>
      </div>
    );
  }

  if (isNotesError || isUsersError) {
    return (
      <div className="py-8 text-center text-red-500">
        <p>Failed to load notes. Please try again later.</p>
      </div>
    );
  }

  return (
    <MainLayout>
      {/* Header with Create Note button */}
      <div className="mb-8 flex flex-col items-center justify-between py-4 md:flex-row">
        <div className="mb-4 flex items-center md:mb-0">
          <FileEdit className="mr-3 h-8 w-8 text-blue-500" strokeWidth={2} />
          <h1 className="text-2xl font-semibold text-primary">Note Taker</h1>
        </div>
        <button
          onClick={() => handleNoteAction()}
          className="rounded-lg bg-gradient-to-r from-blue-500 to-indigo-600 px-4 py-2
                     font-medium text-white shadow-md transition-all hover:from-blue-600
                     hover:to-indigo-700 hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-blue-300"
          aria-label="Create a new note"
        >
          Create a Note
        </button>
      </div>

      {/* Notes Grid or Empty State */}
      {displayNotes.length === 0 ? (
        <div className="rounded-lg bg-white p-10 text-center shadow-sm">
          <File className="mx-auto mb-4 h-16 w-16 text-gray-300" strokeWidth={2} />
          <p className="text-lg text-gray-500">No notes found. Create a note to get started!</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
          {displayNotes.map((note) => (
            <NoteCard
              key={note.id}
              note={note}
              users={users}
              handleClick={() => handleNoteAction(note)}
            />
          ))}
        </div>
      )}

      {/* Note Editor Modal */}
      {noteModal.isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 p-4">
          <div className="flex h-full max-h-full w-full max-w-full flex-col rounded-lg bg-white shadow-lg">
            <div className="flex items-center justify-between border-b border-gray-200 p-4">
              <h2 className="color-primary text-lg font-medium">
                {noteModal.note ? 'Edit Note' : 'Create Note'}
              </h2>
              <button
                onClick={handleCloseModal}
                className="text-gray-500 hover:text-gray-700"
                aria-label="Close editor"
              >
                <X className="h-6 w-6" strokeWidth={2} />
              </button>
            </div>
            <div className="flex-grow overflow-auto p-4">
              <NoteEditor
                selectedNote={noteModal.note}
                onClose={handleCloseModal}
                isOpen={noteModal.isOpen}
              />
            </div>
          </div>
        </div>
      )}
    </MainLayout>
  );
};

export default NotesView;
