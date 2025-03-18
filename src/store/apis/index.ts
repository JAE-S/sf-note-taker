// Redux Imports
import { UserProps } from '@/types/user_types';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

// Create the API slice
export const api = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://challenge.surfe.com/',
  }),
  tagTypes: ['Note', 'Users'],
  endpoints: (builder) => ({
    // Users endpoints
    getUsers: builder.query<UserProps[], void>({
      query: () => 'users',
      providesTags: ['Users'],
    }),
  }),
});

// Export hooks for usage in components
export const { useGetUsersQuery } = api;
