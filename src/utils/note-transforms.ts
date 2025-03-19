// Local - Type Imports
import { ApiNoteProps, NoteProps } from '@/types/note_types';

/**
 * Transforms API response format to the internal note format
 * Handles various data shapes that might come from the API
 */
export const TransformNoteForResponse = (note: ApiNoteProps): NoteProps => {
  // Check if note exists
  if (!note) {
    throw new Error('Note data is missing or invalid');
  }

  // Check if note has a valid body
  if (!(note.body && typeof note.body === 'string')) {
    throw new Error('Note body is missing or not a string');
  }

  // If the response has a string body that contains JSON
  try {
    // Try to parse it as JSON
    const parsedBody = JSON.parse(note.body);

    // If successful, return in legacy format
    return {
      id: note.id || 0,
      title: parsedBody.title || '',
      body: parsedBody.content || '',
      createdAt: parsedBody.createdAt || new Date().toISOString(),
      updatedAt: parsedBody.updatedAt || new Date().toISOString(),
    };
  } catch (error) {
    throw new Error('Note data is missing or invalid');
  }
};

/**
 * Transforms internal note format to the API expected format
 */
export const TransformNoteForRequest = (note: NoteProps): ApiNoteProps => {
  // Create a body object with the proper structure
  let bodyObject;

  // Check if we have a new format note
  if (note.body && typeof note.body === 'string') {
    // Already in new format, use directly
    //     bodyObject = {
    //       title: note.body.title || '',
    //       content: note.body.content || '',
    //       createdAt: note.body.createdAt || new Date().toISOString(),
    //       updatedAt: new Date().toISOString(),
    //     };
    //   } else {
    // Convert from legacy format
    bodyObject = {
      title: note.title || '',
      content: note.body || '',
      createdAt: note.createdAt || new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
  }

  // Return in the format the API expects
  return {
    id: note.id || 0,
    body: JSON.stringify(bodyObject),
  };
};
