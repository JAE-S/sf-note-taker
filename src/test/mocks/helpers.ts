// Test ID helper function - matches the format used in the component
export const GetTestId = (baseId: string, id: number | string, subElement = ''): string => {
  return subElement ? `${baseId}-${id}-${subElement}` : `${baseId}-${id}`;
};
