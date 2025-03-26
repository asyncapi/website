import { MoonIcon, SunIcon } from '@heroicons/react/outline';
import { useTheme } from 'next-themes';
import React from 'react';

const ToggleTheme = () => {
  const { theme, setTheme } = useTheme();

  return (
    <div className='block rounded-md text-gray-600 '>
      <button
        onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}
        type='button'
        className='flex flex-col items-center justify-center rounded-lg p-1 hover:bg-gray-200 hover:text-black'
      >
        {theme === 'light' ? (
          <>
            <MoonIcon className='h-6 ' />
          </>
        ) : (
          <>
            <SunIcon className='h-6 ' />
          </>
        )}
      </button>
    </div>
  );
};

export default ToggleTheme;
