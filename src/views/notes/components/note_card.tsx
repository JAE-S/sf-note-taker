/**
 * NoteCard Component
 *
 * Displays a preview card for a note with the following features:
 * - Shows title, truncated body content, and last updated timestamp
 * - Renders @mentions properly in the preview
 * - Provides visual feedback for interaction (hover states)
 * - Handles edit icon to open the full note
 * - Supports custom styling through className prop
 */

// React Core Imports
import React from 'react';
// Local - Type Imports
import { NoteProps } from '@/types/note_types';
import { UserProps } from '@/types/user_types';
// Local - Utility Function Imports
import { DateFormatter } from '@/utils/date-formatter';
import { RenderMentionedText } from '@/utils/mention-helper';
// Import Lucide Icons
import { Eye, Pencil, Trash2 } from 'lucide-react';

interface NoteCardProps {
  note: NoteProps;
  users: UserProps[];
  handleClick?: () => void;
  className?: string;
}

const NoteCard: React.FC<NoteCardProps> = ({ note, users, handleClick, className = '' }) => {
  // Get a truncated preview of the note body
  const getNotePreview = (text: string, maxLength: number = 100) => {
    if (!text || text.length <= maxLength) return text || '';
    return text.substring(0, maxLength) + '...';
  };

  return (
    <div
      className={`flex cursor-pointer flex-col rounded-lg bg-white p-4 shadow-sm transition-all hover:shadow-md ${className}`}
      data-testid={`note-card-${note.id}`}
    >
      {/* Card Header */}
      <div
        className="mb-2 border-b border-gray-200 pb-2"
        data-testid={`note-card-${note.id}-header`}
      >
        <h3
          className="mb-2 text-lg font-semibold text-primary"
          data-testid={`note-card-${note.id}-title`}
        >
          {note.title}
        </h3>
        <div className="text-xs text-gray-500">
          <span data-testid={`note-card-${note.id}-timestamp`}>
            Last Updated: {DateFormatter(note?.updatedAt)}
          </span>
        </div>
      </div>

      {/* Card Body */}
      <div className="mb-2 flex-grow text-gray-600" data-testid={`note-card-${note.id}-body`}>
        <p className="line-clamp-3">{RenderMentionedText(getNotePreview(note.body), users)}</p>
      </div>

      {/* Card Footer */}
      <div
        className="mt-3 flex items-center justify-between border-t border-gray-200 pt-3"
        onClick={(e) => e.stopPropagation()}
        aria-label="Note actions"
        data-testid={`note-card-${note.id}-actions`}
      >
        <div className="flex items-center gap-2">
          {/* TODO: View icon - disabled for future development */}
          <button
            className="cursor-not-allowed text-gray-400"
            disabled
            aria-label="View note (disabled for future development)"
            title="View note (disabled for future development)"
            data-testid={`note-card-${note.id}-view-button`}
          >
            <Eye size={16} />
          </button>

          {/* Edit icon */}
          <button
            className="text-blue-500 hover:text-blue-600"
            onClick={handleClick}
            aria-label="Edit note"
            title="Edit note"
            data-testid={`note-card-${note.id}-edit-button`}
          >
            <Pencil size={16} />
          </button>
        </div>

        {/* TODO: Delete icon - disabled for future development */}
        <button
          className="cursor-not-allowed text-gray-400"
          disabled
          aria-label="Delete note (disabled for future development)"
          title="Delete note (disabled for future development)"
          data-testid={`note-card-${note.id}-delete-button`}
        >
          <Trash2 size={16} />
        </button>
      </div>
    </div>
  );
};

export default NoteCard;
