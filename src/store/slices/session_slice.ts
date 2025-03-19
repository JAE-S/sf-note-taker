/**
 * Session Slice
 *
 * Manages the application session state using Redux Toolkit.
 * Features:
 * - Persistent session ID storage in localStorage
 * - Session generation and reset functionality
 * - Tracking of session reset operations
 * - Selectors for accessing session state
 */

// Redux Core Imports
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

// Constants
const SESSION_STORAGE_KEY = 'surfe_session_id';

// Helper functions
const sessionStorage = {
  get: (): string | null => localStorage.getItem(SESSION_STORAGE_KEY),
  set: (id: string): void => localStorage.setItem(SESSION_STORAGE_KEY, id),
  generate: (): string => `session_${Math.random().toString(36).substring(2, 9)}`,
};

// Types
interface SessionState {
  sessionId: string;
  isResetting: boolean;
}

// Initial state setup
const getInitialSessionId = (): string => {
  const stored = sessionStorage.get();
  if (stored) return stored;

  const newId = sessionStorage.generate();
  sessionStorage.set(newId);
  return newId;
};

const initialState: SessionState = {
  sessionId: getInitialSessionId(),
  isResetting: false,
};

// Slice
export const sessionSlice = createSlice({
  name: 'session',
  initialState,
  reducers: {
    setSessionId: (state, action: PayloadAction<string>) => {
      const id = action.payload;
      state.sessionId = id;
      sessionStorage.set(id);
    },
    resetSessionStart: (state) => {
      state.isResetting = true;
    },
    resetSessionComplete: (state, action: PayloadAction<string>) => {
      const id = action.payload;
      state.sessionId = id;
      state.isResetting = false;
      sessionStorage.set(id);
    },
  },
});

// Exports
export const { setSessionId, resetSessionStart, resetSessionComplete } = sessionSlice.actions;

export const selectSessionId = (state: { session: SessionState }) => state.session.sessionId;
export const selectIsResettingSession = (state: { session: SessionState }) =>
  state.session.isResetting;

export const getSessionId = getInitialSessionId;
export const resetSession = (): string => {
  const newId = sessionStorage.generate();
  sessionStorage.set(newId);
  return newId;
};

export default sessionSlice.reducer;
