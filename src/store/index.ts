/**
 * Redux Store Configuration
 *
 * Central Redux store setup for the application.
 * Features:
 * - Configures the global Redux store
 * - Combines session and API reducers
 * - Sets up RTK Query middleware and listeners
 * - Exports TypeScript types for state and dispatch
 */

// Redux Core Imports
import { configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query';
// Redux Api Imports
import { api } from './apis';
// Redux Slices Imports
import sessionReducer from './slices/session_slice';

export const store = configureStore({
  reducer: {
    session: sessionReducer,
    [api.reducerPath]: api.reducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(api.middleware),
});

// Enable refetchOnFocus/refetchOnReconnect behaviors
setupListeners(store.dispatch);

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
