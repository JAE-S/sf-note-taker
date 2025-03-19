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
    <header className="shadow-sm">
      <div className="container mx-auto flex items-center justify-between px-4 py-4">
        {/* Logo */}
        <figure className="m-0 p-0" role="banner">
          <a className="block w-full text-current no-underline" href="/" rel="home" title="SURFE">
            <img src={SurfeLogo} alt="Surfe Logo" className="h-6 w-auto" />
          </a>
        </figure>

        {/* Reset Session Button */}
        <button
          onClick={handleResetSession}
          disabled={isResetting}
          className={`rounded px-3 py-1.5 text-sm text-red-600 transition-colors hover:bg-red-400/20 ${
            isResetting ? 'cursor-not-allowed opacity-50' : ''
          }`}
          aria-label="Reset current session"
        >
          {isResetting ? 'Resetting...' : 'Reset Session'}
        </button>
      </div>
    </header>
  );
};

export default Header;
