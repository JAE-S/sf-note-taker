/**
 * API Service
 *
 * This module provides a centralized Redux RTK Query API service for the application.
 * It handles data fetching, caching, and transformations between the frontend data model
 * and the API's expected format.
 *
 * Features:
 * - CRUD operations for Notes (minus the delete api - it was not provided)
 * - User data fetching
 * - Cache invalidation using RTK Query tags
 * - Error and success notifications for development purposes
 * - Note: For more complex notification flows, consider migrating to
 *   Redux Thunks which would allow for more centralized error/success handling
 *   and integration with notification systems
 */

// Redux Imports
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
// Local - Type Imports
import { ApiNoteProps, NoteProps } from '@/types/note_types';
import { UserProps } from '@/types/user_types';
// Local - Utility Function Imports
import { TransformNoteForRequest, TransformNoteForResponse } from '@/utils/note-transforms';
import { HandleError, HandleSuccess } from '@/utils/api-helper';

// Create a custom base query with error handling
const customFetchBaseQuery = fetchBaseQuery({
  baseUrl: 'https://challenge.surfe.com/',
  prepareHeaders: (headers) => {
    // Add any auth tokens or other headers here
    return headers;
  },
});

// Wrap the base query to add global error handling
const baseQueryWithErrorHandling = async (args: any, api: any, extraOptions: any) => {
  try {
    const result = await customFetchBaseQuery(args, api, extraOptions);

    // If there's an error in the response, handle it
    if (result.error) {
      HandleError(result.error, api.endpoint, `Error in ${api.endpoint}`);
    }

    return result;
  } catch (error) {
    // Handle any unexpected errors
    HandleError(error, 'API Request', 'Unexpected error during API request');
    throw error;
  }
};

// Create the API slice
export const api = createApi({
  reducerPath: 'api',
  baseQuery: baseQueryWithErrorHandling,
  tagTypes: ['Note', 'Users'],
  endpoints: (builder) => ({
    // Notes endpoints
    // Get all notes
    getNotes: builder.query<NoteProps[], string>({
      query: (sessionId) => `${sessionId}/notes`,
      transformResponse: (response: unknown): NoteProps[] => {
        try {
          // Handle empty response
          if (!response || !Array.isArray(response)) {
            HandleSuccess([], 'getNotes', 'No notes found');
            return [];
          }

          const transformedNotes = (response as ApiNoteProps[]).map((note) =>
            TransformNoteForResponse(note)
          );

          HandleSuccess(transformedNotes, 'getNotes', 'Successfully retrieved all notes');

          return transformedNotes;
        } catch (error) {
          HandleError(error, 'getNotes:transform', 'Error transforming notes data');
          return [];
        }
      },
      providesTags: (result) =>
        result
          ? [
              ...result.map(({ id }) => ({ type: 'Note' as const, id })),
              { type: 'Note', id: 'LIST' },
            ]
          : [{ type: 'Note', id: 'LIST' }],
    }),

    // Get notes by Id
    getNoteById: builder.query<NoteProps, { sessionId: string; noteId: number }>({
      query: ({ sessionId, noteId }) => `${sessionId}/notes/${noteId}`,
      transformResponse: (response: unknown): NoteProps => {
        try {
          const transformedNote = TransformNoteForResponse(response as ApiNoteProps);

          HandleSuccess(
            transformedNote,
            'getNoteById',
            `Successfully retrieved note #${transformedNote.id}`
          );

          return transformedNote;
        } catch (error) {
          HandleError(error, 'getNoteById:transform', 'Error transforming note data');
          throw error; // Re-throw to let RTK Query handle it
        }
      },
      providesTags: (_, __, { noteId }) => [{ type: 'Note', id: noteId }],
    }),

    // Create a single note
    createNote: builder.mutation<NoteProps, { sessionId: string; note: ApiNoteProps }>({
      query: ({ sessionId, note }) => {
        try {
          const transformedNote: ApiNoteProps = TransformNoteForRequest(note as NoteProps);
          return {
            url: `${sessionId}/notes`,
            method: 'POST',
            body: transformedNote,
          };
        } catch (error) {
          HandleError(error, 'createNote:request', 'Error preparing note data for creation');
          throw error;
        }
      },
      transformResponse: (response: unknown): NoteProps => {
        try {
          const transformedNote = TransformNoteForResponse(response as ApiNoteProps);
          HandleSuccess(
            transformedNote,
            'createNote',
            `Successfully created note #${transformedNote.id}`
          );
          return transformedNote;
        } catch (error) {
          HandleError(error, 'createNote:transform', 'Error transforming created note data');
          throw error;
        }
      },
      invalidatesTags: [{ type: 'Note', id: 'LIST' }],
    }),

    // Update a single note
    updateNote: builder.mutation<ApiNoteProps, { sessionId: string; note: ApiNoteProps }>({
      query: ({ sessionId, note }) => {
        try {
          const transformedNote = TransformNoteForRequest(note as NoteProps);
          return {
            url: `${sessionId}/notes/${note.id}`,
            method: 'PUT',
            body: transformedNote,
          };
        } catch (error) {
          HandleError(
            error,
            'updateNote:request',
            `Error preparing note #${note.id} data for update`
          );
          throw error;
        }
      },
      transformResponse: (response: unknown): NoteProps => {
        try {
          const transformedNote = TransformNoteForResponse(response as ApiNoteProps);
          HandleSuccess(
            transformedNote,
            'updateNote',
            `Successfully updated note #${transformedNote.id}`
          );
          return transformedNote;
        } catch (error) {
          HandleError(error, 'updateNote:transform', 'Error transforming updated note data');
          throw error;
        }
      },
      invalidatesTags: (_, __, { note }) => [{ type: 'Note', id: note.id }],
    }),

    // Users endpoints
    getUsers: builder.query<UserProps[], void>({
      query: () => 'users',
      transformResponse: (response: unknown): UserProps[] => {
        try {
          const users = response as UserProps[];
          HandleSuccess(users, 'getUsers', `Successfully retrieved ${users.length} users`);
          return users;
        } catch (error) {
          HandleError(error, 'getUsers:transform', 'Error transforming users data');
          throw error;
        }
      },
      providesTags: ['Users'],
    }),
  }),
});

// Export hooks for usage in components
export const {
  useGetUsersQuery,
  useGetNotesQuery,
  useGetNoteByIdQuery,
  useUpdateNoteMutation,
  useCreateNoteMutation,
} = api;
