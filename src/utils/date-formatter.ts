/**
 * Date Formatter Utility
 *
 * A simple utility function that formats date strings into a consistent,
 * human-readable format (e.g., "Jan 15, 2023").
 *
 * @param dateString - ISO date string to format
 * @returns Formatted date string in US locale (Month Day, Year)
 */

export const DateFormatter = (dateString: string) => {
  return new Date(dateString).toLocaleDateString('en-US', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  });
};
