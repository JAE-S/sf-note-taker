/**
 * Header Component
 *
 * Application header that displays the company logo and session management controls.
 * Features:
 * - Displays the Surfe logo with a link to the homepage
 * - Provides a "Reset Session" button that clears the current user session
 * - Shows loading state during session reset
 * - Handles Redux state updates and API cache clearing during reset
 */

// React Core Imports
import React from 'react';
// Local - Store Imports
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import {
  resetSession,
  resetSessionComplete,
  resetSessionStart,
  selectIsResettingSession,
} from '@/store/slices/session_slice';
import { api } from '@/store/apis/';
// Local - Assets Imports
import SurfeLogo from '../../assets/images/surfe-logo-dark.svg';

const Header: React.FC = () => {
  const dispatch = useAppDispatch();
  const isResetting = useAppSelector(selectIsResettingSession);

  const handleResetSession = () => {
    dispatch(resetSessionStart());
    const newSessionId = resetSession();

    // Reset RTK Query cache
    dispatch(api.util.resetApiState());

    // Update session state
    dispatch(resetSessionComplete(newSessionId));
  };

  return (
    <header
      className="shadow-sm"
      data-testid="app-header"
      tabIndex={0} // Make header focusable
      role="banner"
    >
      <div className="container mx-auto flex items-center justify-between px-4 py-4">
        {/* Logo */}
        <figure className="m-0 p-0">
          <a
            href="/"
            rel="home"
            title="SURFE"
            data-testid="header-logo-link"
            className="
              block
              w-full
              rounded
              p-1
              text-current
              no-underline
              transition-all
              hover:bg-gray-100
              focus:outline-none
              focus:ring-2
              focus:ring-blue-500
            "
          >
            <img
              src={SurfeLogo}
              alt="Surfe Logo"
              className="h-6 w-auto"
              data-testid="header-logo-image"
            />
          </a>
        </figure>

        {/* Reset Session Button */}
        <nav aria-label="Session controls">
          <button
            type="button"
            onClick={handleResetSession}
            disabled={isResetting}
            className={`
              rounded
              px-3
              py-1.5
              text-sm
              transition-all
              focus:outline-none
              focus:ring-2
              focus:ring-red-500
              ${
                isResetting
                  ? 'cursor-not-allowed text-red-300 opacity-50'
                  : 'text-red-700 hover:bg-red-100 hover:text-red-900 active:bg-red-200'
              }`}
            aria-live="polite"
            aria-busy={isResetting}
            aria-label="Reset current session"
            data-testid="reset-session-button"
          >
            {isResetting ? 'Resetting...' : 'Reset Session'}
          </button>
        </nav>
      </div>
    </header>
  );
};

export default Header;
