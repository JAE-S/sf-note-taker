/**
 * Reusable error handler function
 * @param {unknown} error - The error object
 * @param {string} apiCall - The name of the API call that triggered the error
 * @param {string} [customMessage] - Optional custom message to display
 */
export const HandleError = (error: unknown, apiCall: string, customMessage?: string): void => {
  const displayMessage = customMessage || `Error occurred while ${apiCall}`;
  console.error(`API Error in ${apiCall}:`, displayMessage, error);
  // This can be expanded in future iterations to include toast notifications,
  // error reporting services, or other error handling mechanisms
};

/**
 * Reusable success handler function
 * @template T The type of data returned by the API call
 * @param {T} data - The success response data
 * @param {string} apiCall - The name of the API call that was successful
 * @param {string} [customMessage] - Optional custom message to display
 */
export const HandleSuccess = <T>(data: T, apiCall: string, customMessage?: string): void => {
  const displayMessage = customMessage || `Successfully completed ${apiCall}`;
  console.log(`API Success in ${apiCall}:`, displayMessage, data);
  // This can be expanded in future iterations to include toast notifications
  // or other success handling mechanisms
};
