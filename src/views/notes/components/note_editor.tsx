/**
 * NoteEditor Component
 *
 * A multi-purpose editor for creating and editing notes with the following features:
 * - Handles both create and edit modes automatically
 * - Auto-saves notes while editing with debounce (1.5s delay)
 * - Displays real-time save status indicators
 * - Supports @mentions with user suggestions
 * - Provides live preview of rendered mentions
 * - Auto-resizes textarea as content grows
 *
 * Technical Implementation:
 * - Uses React hooks for state management
 * - Integrates with Redux store via RTK Query for data operations
 * - Uses debounced autosave with proper timeout management
 * - Implements precise cursor positioning for mentions
 * - Guards against edge cases like ID = 0 with nullish coalescing
 * - Optimized to avoid stale closures in event handlers
 */

// React Core Imports
import React, { useState, useEffect, useRef, useCallback } from 'react';
// Lucide-React Imports
import { CheckCircle, AlertCircle, Plus } from 'lucide-react';
// Local - Store Imports
import { useGetUsersQuery, useUpdateNoteMutation, useCreateNoteMutation } from '@/store/apis';
import { useAppSelector } from '@/store/hooks';
import { selectSessionId } from '@/store/slices/session_slice';
// Local - Utility Function Imports
import { RenderMentionedText } from '@/utils/mention-helper';
// Local - Type Imports
import { NoteProps } from '@/types/note_types';
import { UserProps } from '@/types/user_types';

interface NoteEditorProps {
  selectedNote?: NoteProps | null;
  onClose: () => void;
  isOpen: boolean;
}

// Save status type
type SaveStatus = 'idle' | 'saving' | 'saved' | 'error';

const NoteEditor: React.FC<NoteEditorProps> = ({ selectedNote, onClose, isOpen }) => {
  // State management
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');
  const [mentionSuggestions, setMentionSuggestions] = useState<UserProps[]>([]);
  const [currentMentionQuery, setCurrentMentionQuery] = useState<string | null>(null);
  const [saveStatus, setSaveStatus] = useState<SaveStatus>('idle');
  const [errorMessage, setErrorMessage] = useState('');
  const [draftNoteId, setDraftNoteId] = useState<number | null>(null);

  // Refs
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const saveTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Redux state and API hooks
  const sessionId = useAppSelector(selectSessionId);
  const { data: users = [] } = useGetUsersQuery();
  const [updateNote] = useUpdateNoteMutation();
  const [createNote] = useCreateNoteMutation();

  // Derived state
  const isCreateMode = !selectedNote;
  const isFormValid = Boolean(title.trim() && body.trim());
  const isSaving = saveStatus === 'saving';

  // Reset form status
  const resetFormStatus = useCallback(() => {
    setSaveStatus('idle');
    setErrorMessage('');
  }, []);

  // Clear any pending save timeout
  const clearSaveTimeout = useCallback(() => {
    if (saveTimeoutRef.current) {
      clearTimeout(saveTimeoutRef.current);
      saveTimeoutRef.current = null;
    }
  }, []);

  // Clean up timeout on unmount
  useEffect(() => {
    return clearSaveTimeout;
  }, [clearSaveTimeout]);

  // Reset form when note changes or modal opens
  useEffect(() => {
    if (!isOpen) {
      setDraftNoteId(null);
      return;
    }

    if (selectedNote) {
      setTitle(selectedNote.title || '');
      setBody(selectedNote.body || '');
      setDraftNoteId(selectedNote.id);
    } else {
      setTitle('');
      setBody('');
      setDraftNoteId(Date.now());
    }

    setSaveStatus('idle');
  }, [isOpen, selectedNote]);

  // Auto-resize textarea
  useEffect(() => {
    const textarea = textareaRef.current;
    if (textarea) {
      textarea.style.height = 'auto';
      textarea.style.height = `${textarea.scrollHeight}px`;
    }
  }, [body]);

  // Create a note object from current state
  const createNoteObject = (noteTitle = title, noteBody = body): NoteProps => {
    // Using nullish coalescing so that 0 is a valid ID
    return {
      id: draftNoteId ?? Date.now(),
      title: noteTitle,
      body: noteBody,
      createdAt: selectedNote?.createdAt || new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
  };

  // Save note implementation
  const saveNote = async (noteData: NoteProps) => {
    if (!noteData.title?.trim() || !noteData.body?.trim()) {
      setErrorMessage('Title and note content are required');
      setSaveStatus('error');
      return;
    }

    setSaveStatus('saving');

    try {
      const completeNoteData: NoteProps = {
        ...noteData,
        // Using nullish coalescing to allow 0 as valid ID
        id: noteData.id ?? draftNoteId ?? Date.now(),
        updatedAt: new Date().toISOString(),
      };

      if (isCreateMode) {
        await createNote({
          sessionId,
          note: completeNoteData,
        }).unwrap();

        setSaveStatus('saved');
        setTimeout(onClose, 1000);
      } else {
        await updateNote({
          sessionId,
          note: completeNoteData,
        }).unwrap();

        setSaveStatus('saved');
        setTimeout(() => setSaveStatus('idle'), 2000);
      }
    } catch (error) {
      setSaveStatus('error');
      setErrorMessage('Failed to save note. Please try again.');
      setTimeout(() => resetFormStatus(), 3000);
    }
  };

  // Trigger autosave if conditions are met
  const triggerAutosave = (currentTitle: string, currentBody: string) => {
    // Only autosave in edit mode with valid content
    // Using draftNoteId !== undefined check to allow 0 as valid ID
    if (isCreateMode || !currentTitle.trim() || !currentBody.trim() || draftNoteId === undefined) {
      return;
    }

    clearSaveTimeout();

    const noteToSave = createNoteObject(currentTitle, currentBody);
    saveTimeoutRef.current = setTimeout(() => saveNote(noteToSave), 1500);
  };

  // Find mention suggestions based on query
  const findMentionSuggestions = (mentionQuery: string) => {
    if (!mentionQuery) {
      setMentionSuggestions([]);
      setCurrentMentionQuery(null);
      return;
    }

    const query = mentionQuery.toLowerCase();
    const suggestions = users
      .filter(
        (user) =>
          user.first_name.toLowerCase().includes(query) ||
          user.last_name.toLowerCase().includes(query) ||
          user.username.toLowerCase().includes(query)
      )
      .slice(0, 5);

    setMentionSuggestions(suggestions);
    setCurrentMentionQuery(mentionQuery);
  };

  // Handle title changes
  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setTitle(value);
    resetFormStatus();
    triggerAutosave(value, body);
  };

  // Handle body text changes
  const handleBodyChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const value = e.target.value;
    setBody(value);
    resetFormStatus();

    // Check for @mentions
    const mentionMatches = value.match(/@(\w+)$/);
    if (mentionMatches) {
      findMentionSuggestions(mentionMatches[1]);
    } else {
      setMentionSuggestions([]);
      setCurrentMentionQuery(null);
    }

    triggerAutosave(title, value);
  };

  // Handle mention selection
  const handleMentionSelect = (user: UserProps) => {
    if (!textareaRef.current) return;

    const textarea = textareaRef.current;
    const cursorPos = textarea.selectionStart;

    // Find the last @ mention to replace
    const textBeforeCursor = body.slice(0, cursorPos);
    const mentionMatches = textBeforeCursor.match(/@\w*$/);

    let textBeforeMention = textBeforeCursor;
    if (mentionMatches?.[0]) {
      textBeforeMention = textBeforeCursor.slice(0, -mentionMatches[0].length);
    }

    const mentionReplacement = `@${user.username} `;
    const textAfterMention = body.slice(cursorPos);
    const newText = `${textBeforeMention}${mentionReplacement}${textAfterMention}`;

    setBody(newText);
    resetFormStatus();

    // Move cursor to end of inserted mention
    setTimeout(() => {
      const newPosition = textBeforeMention.length + mentionReplacement.length;
      textarea.selectionStart = textarea.selectionEnd = newPosition;
      textarea.focus();
    }, 0);

    triggerAutosave(title, newText);
  };

  // Handle save button click
  const handleSave = () => {
    clearSaveTimeout();
    saveNote(createNoteObject());
  };

  // Render status indicator
  const renderSaveStatus = () => {
    switch (saveStatus) {
      case 'saving':
        return <span className="text-gray-500">Saving...</span>;
      case 'saved':
        return (
          <div className="flex items-center text-green-600">
            <CheckCircle className="mr-1 h-4 w-4" />
            <span>Saved</span>
          </div>
        );
      case 'error':
        return (
          <div className="flex items-center text-red-600">
            <AlertCircle className="mr-1 h-4 w-4" />
            <span>{errorMessage || 'Error saving'}</span>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="flex h-full flex-col">
      <div className="mb-4">
        <label htmlFor="note-title" className="mb-2 block text-sm font-medium text-gray-700">
          Title <span className="text-red-500">*</span>
        </label>
        <input
          id="note-title"
          type="text"
          value={title}
          onChange={handleTitleChange}
          className="w-full rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Enter note title"
          required
        />
      </div>

      <div className="relative mb-4 flex-grow">
        <label htmlFor="note-body" className="mb-2 block text-sm font-medium text-gray-700">
          Note <span className="text-red-500">*</span>
        </label>
        <textarea
          ref={textareaRef}
          id="note-body"
          value={body}
          onChange={handleBodyChange}
          className={`min-h-[150px] w-full resize-y rounded-md border px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 ${
            !title.trim() ? 'border-gray-200 bg-gray-100' : 'border-gray-300'
          }`}
          placeholder="Write your note here. Use @ to mention users."
          disabled={!title.trim()}
          required
        />

        {/* Save Status Indicator */}
        <div className="absolute right-2 top-8 flex items-center space-x-1 text-sm">
          {renderSaveStatus()}
        </div>

        {/* Mention Preview */}
        <div className="mt-2 text-sm text-gray-700">
          Preview:
          <div className="mt-1 rounded border bg-gray-50 p-2">
            {RenderMentionedText(body, users)}
          </div>
        </div>

        {/* Mention Suggestions */}
        {currentMentionQuery && mentionSuggestions.length > 0 && (
          <div className="absolute z-10 mt-1 w-full rounded-md border bg-white shadow-lg">
            {mentionSuggestions.map((user) => (
              <div
                key={user.username}
                onClick={() => handleMentionSelect(user)}
                className="cursor-pointer px-4 py-2 hover:bg-gray-100"
              >
                <div className="font-medium">{user.username}</div>
                <div className="text-xs text-gray-500">
                  {user.first_name} {user.last_name}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="flex justify-end space-x-2">
        {isCreateMode ? (
          <button
            onClick={handleSave}
            disabled={isSaving || !isFormValid}
            className={`flex items-center rounded-md px-4 py-2 text-white ${
              isSaving || !isFormValid
                ? 'cursor-not-allowed bg-blue-400'
                : 'bg-blue-600 hover:bg-blue-700'
            }`}
          >
            <Plus className="mr-1 h-4 w-4" />
            Create Note
          </button>
        ) : (
          <button
            onClick={onClose}
            className={`flex items-center rounded-md px-4 py-2 text-white ${
              isSaving ? 'cursor-not-allowed bg-blue-400' : 'bg-blue-600 hover:bg-blue-700'
            }`}
          >
            Close
          </button>
        )}
      </div>
    </div>
  );
};

export default NoteEditor;
