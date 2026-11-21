/**
 * Normalizes query parameters that represent a list of items (e.g. langs, techs, categories).
 * Handles single comma-separated strings, repeated array query parameters, and trims empty entries.
 */
export const normalizeArrayQuery = (param: string | string[] | undefined): string[] => {
  if (!param) return [];
  const rawList = Array.isArray(param) ? param : [param];

  return rawList
    .flatMap((item) => item.split(','))
    .map((item) => item.trim())
    .filter(Boolean);
};

/**
 * Normalizes query parameters that represent a single string value (e.g. pricing).
 * Returns the first valid string if an array is passed, or the default value.
 */
export const normalizeStringQuery = (param: string | string[] | undefined, defaultValue: string): string => {
  if (!param) return defaultValue;
  if (Array.isArray(param)) return param[0] || defaultValue;

  return param;
};

/**
 * Normalizes query parameters that represent a boolean flag (e.g. owned).
 * Checks if the value or first array entry is strictly 'true'.
 */
export const normalizeBooleanQuery = (param: string | string[] | undefined): boolean => {
  if (!param) return false;
  const value = Array.isArray(param) ? param[0] : param;

  return value === 'true';
};
