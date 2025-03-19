/**
 * NoteCard Component
 *
 * Displays a preview card for a note with the following features:
 * - Shows title, truncated body content, and last updated timestamp
 * - Renders @mentions properly in the preview
 * - Provides visual feedback for interaction (hover states)
 * - Handles click events to open the full note
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
      onClick={handleClick}
      className={`flex cursor-pointer flex-col rounded-lg bg-white p-4 shadow-sm transition-all hover:shadow-md ${className}`}
    >
      <h3 className="mb-2 text-lg font-semibold text-primary">{note.title}</h3>
      <div className="text-xs text-gray-500">
        <span>Last Updated: {DateFormatter(note?.updatedAt)}</span>
      </div>

      <div className="mb-2 flex-grow text-gray-600">
        <p className="line-clamp-3">{RenderMentionedText(getNotePreview(note.body), users)}</p>
      </div>

      <div className="mt-3 border-t border-gray-100 pt-3 text-sm text-blue-500">Click to edit</div>
    </div>
  );
};

export default NoteCard;
