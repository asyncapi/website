import React from 'react';
import { useSpecVersion } from '@/context/SpecVersionContext';

/**
 * SpecVersionSwitcher component allows users to toggle between AsyncAPI spec versions
 * Renders a button group for switching between 2.x and 3.x versions
 */
export default function SpecVersionSwitcher() {
  const { version, setVersion } = useSpecVersion();
  
  // Debugging: Log to console to see current version
  console.log(`SpecVersionSwitcher - current version: ${version}`);

  return (
    <div className="flex items-center rounded-lg border border-gray-200 p-1 dark:border-gray-700">
      <button
        onClick={() => {
          console.log('Setting version to 2.x');
          setVersion('2.x');
        }}
        className={`px-3 py-1 text-sm font-medium rounded-md transition-colors ${
          version === '2.x'
            ? 'bg-blue-500 text-white shadow-sm'
            : 'text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-700'
        }`}
        aria-pressed={version === '2.x'}
      >
        2.x
      </button>
      <button
        onClick={() => {
          console.log('Setting version to 3.x');
          setVersion('3.x');
        }}
        className={`px-3 py-1 text-sm font-medium rounded-md transition-colors ${
          version === '3.x'
            ? 'bg-blue-500 text-white shadow-sm'
            : 'text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-700'
        }`}
        aria-pressed={version === '3.x'}
      >
        3.x
      </button>
    </div>
  );
}