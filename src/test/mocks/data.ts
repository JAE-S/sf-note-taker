// Local - Type Imports
import { NoteProps } from '@/types/note_types';
import { UserProps } from '@/types/user_types';

// Mock users data
export const mockUsers: UserProps[] = [
  {
    id: 1,
    username: 'johndoe',
    first_name: 'John',
    last_name: 'Doe',
    name: 'John Doe',
    email: 'john.doe@example.com',
    birthdate: new Date('1990-01-01'),
    gender: 'male',
    location: {
      city: 'New York',
      postcode: 10001,
      state: 'NY',
      street: '123 Main St',
    },
    phone_number: '555-1234',
    title: 'Mr',
  },
  {
    id: 2,
    username: 'janedoe',
    first_name: 'Jane',
    last_name: 'Doe',
    name: 'Jane Doe',
    email: 'jane.doe@example.com',
    birthdate: new Date('1992-05-15'),
    gender: 'female',
    location: {
      city: 'Boston',
      postcode: 52108,
      state: 'MA',
      street: '456 Park Ave',
    },
    phone_number: '555-5678',
    title: 'Ms',
  },
];

// Mock notes data
export const mockNotes: NoteProps[] = [
  {
    id: 1,
    title: 'Test Note',
    body: 'This is a test note',
    createdAt: '2023-01-01T12:00:00.000Z',
    updatedAt: '2023-01-01T14:30:00.000Z',
  },
  {
    id: 2,
    title: 'Meeting Notes',
    body: 'Discussion about the new project with @johndoe',
    createdAt: '2023-01-02T09:00:00.000Z',
    updatedAt: '2023-01-02T10:15:00.000Z',
  },
  {
    id: 3,
    title: 'Ideas',
    body: 'New feature ideas for the app: \n1. Dark mode\n2. Export to PDF\n3. @janedoe suggested calendar integration',
    createdAt: '2023-01-03T15:45:00.000Z',
    updatedAt: '2023-01-04T11:20:00.000Z',
  },
];

// Session data
export const mockSessionId = 'test-session-id';
