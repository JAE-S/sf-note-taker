/**
 * Mention Helper Utilities
 *
 * A collection of utility functions for handling @mentions in text content.
 * Features:
 * - Finding valid mentions by matching against user data
 * - Rendering styled mentions with different visual treatments for valid/invalid users
 * - Efficiently processing text to maintain the original formatting while enhancing mentions
 */

// React Core Imports
import React from 'react';

// Local - Type Imports
import { UserProps } from '@/types/user_types';

/**
 * Extracts valid @mentions from text by matching them against a list of users
 * @param body - Text content to search for mentions
 * @param users - Array of user objects to validate mentions against
 * @returns Array of valid mentioned usernames
 */
export function FindMentions(body: string, users: UserProps[]) {
  const mentionRegex = /@(\w+)/g;
  const mentions: string[] = [];
  const processedUsernames = new Set<string>();

  let match;
  while ((match = mentionRegex.exec(body)) !== null) {
    const mentionName = match[1].trim().toLowerCase();

    // Find exact username match first
    const usernameMatch = users.find((user) => user.username.toLowerCase() === mentionName);

    // If username match exists, add it
    if (usernameMatch && !processedUsernames.has(usernameMatch.username)) {
      mentions.push(usernameMatch.username);
      processedUsernames.add(usernameMatch.username);
    }
  }

  return mentions;
}

/**
 * Renders text with styled @mentions, highlighting valid mentions and showing invalid ones
 * @param body - Text content to process
 * @param users - Array of user objects to validate mentions against
 * @returns Array of strings and React elements for rendering
 */
export function RenderMentionedText(
  body: string,
  users: UserProps[]
): (string | React.ReactElement)[] {
  const mentionRegex = /@(\w+)/g;
  const parts: (string | React.ReactElement)[] = [];
  let lastIndex = 0;

  const findUser = (name: string) => {
    const mentionName = name.trim().toLowerCase();

    // Prioritize exact username match
    return users.find((user) => user.username.toLowerCase() === mentionName);
  };

  let match;
  while ((match = mentionRegex.exec(body)) !== null) {
    // Add text before mention
    if (match.index > lastIndex) {
      parts.push(body.slice(lastIndex, match.index));
    }

    const mentionName = match[1].trim();
    const matchedUser = findUser(mentionName);

    // Render mention
    parts.push(
      React.createElement(
        'span',
        {
          key: `mention-${match.index}`,
          className: matchedUser
            ? 'rounded px-1 bg-sky-100 text-sky-700'
            : 'rounded px-1 bg-red-100 text-red-700 line-through',
        },
        match[0]
      )
    );

    // Update last index
    lastIndex = match.index + match[0].length;
  }

  // Add remaining text after all mentions are processed
  if (lastIndex < body.length) {
    parts.push(body.slice(lastIndex));
  }

  return parts;
}
