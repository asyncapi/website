/**
 * Safely retrieves an item from localStorage with null checking
 * @param key - The storage key to retrieve
 * @param defaultValue - Optional default value to return if key doesn't exist or is null
 * @returns The stored value or default value
 */
export function getStorageItem(key: string, defaultValue: string = ''): string {
  if (typeof window === 'undefined') return defaultValue;

  try {
    const item = localStorage.getItem(key);

    return item ?? defaultValue;
  } catch (error) {
    console.warn(`Error retrieving storage key "${key}":`, error);

    return defaultValue;
  }
}

/**
 * Safely sets an item in localStorage
 * @param key - The storage key to set
 * @param value - The value to store
 */
export function setStorageItem(key: string, value: string): void {
  if (typeof window === 'undefined') return;

  try {
    localStorage.setItem(key, value);
  } catch (error) {
    console.warn(`Error setting storage key "${key}":`, error);
  }
}

/**
 * Cleans up storage by ensuring no null or undefined values exist
 * This prevents errors when third-party code tries to access .length on storage values
 */
export function initializeStorage(): void {
  if (typeof window === 'undefined') return;

  try {
    // Get all keys from localStorage
    const keys = Object.keys(localStorage);

    // Check each key and ensure the value is not null
    keys.forEach((key) => {
      const value = localStorage.getItem(key);

      // If value is null, remove the key to prevent errors
      if (value === null) {
        localStorage.removeItem(key);
      }
    });
  } catch (error) {
    console.warn('Error during storage initialization:', error);
  }
}
