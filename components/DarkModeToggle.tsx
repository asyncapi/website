'use client';

import { useEffect, useState } from 'react';

// SVG Icons as components
const SunIcon = ({ className = 'w-5 h-5' }) => (
  <svg
    className={className}
    fill='none'
    stroke='white'
    stroke-width='2'
    viewBox='0 0 24 24'
    xmlns='http://www.w3.org/2000/svg'
  >
    <circle cx='12' cy='12' r='5' />
    <path d='M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42' />
  </svg>
);

const MoonIcon = ({ className = 'w-5 h-5' }) => (
  <svg
    className={`stroke-current text-opacity-85 text-zinc-600 ${className}`}
    fill='none'
    strokeWidth='2'
    viewBox='0 0 24 24'
    xmlns='http://www.w3.org/2000/svg'
  >
    <path d='M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z' />
  </svg>
);

/**
 * A modern toggle button component that switches between light and dark mode.
 * Remembers the selected mode using localStorage with smooth animations.
 */
export default function DarkModeToggle() {
  const [isDark, setIsDark] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    // Load preference on mount
    const storedTheme = localStorage.getItem('theme');
    const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

    const shouldUseDark = storedTheme === 'dark' || (!storedTheme && systemPrefersDark);

    document.documentElement.classList.toggle('dark', shouldUseDark);
    setIsDark(shouldUseDark);
  }, []);

  const toggleDarkMode = () => {
    const newTheme = !isDark;

    document.documentElement.classList.toggle('dark', newTheme);
    localStorage.setItem('theme', newTheme ? 'dark' : 'light');
    setIsDark(newTheme);
  };

  // Prevent hydration mismatch
  if (!mounted) {
    return <div className='w-10 h-10 rounded-lg bg-gray-100 dark:bg-gray-800 animate-pulse' />;
  }

  return (
    <button
      onClick={toggleDarkMode}
      className='relative p-2 mx-2 text-zinc-800 dark:text-zinc-800 hover:text-black dark:hover:text-white hover:bg-gray-100 dark:hover:bg-primary-500 rounded-lg transition-all duration-300 group'
      aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
    >
      {/* Icon container with smooth rotation */}
      <div className='relative w-5 h-5 transition-transform duration-300 group-hover:scale-110'>
        {isDark ? (
          <SunIcon className='w-5 h-5 transition-all duration-300 rotate-0 group-hover:rotate-12' />
        ) : (
          <MoonIcon className='w-5 h-5 transition-all duration-300 rotate-0 group-hover:-rotate-12' />
        )}
      </div>

      {/* Tooltip */}
      <div className='absolute -bottom-10 left-1/2 transform -translate-x-1/2 px-2 py-1 bg-gray-900 dark:bg-gray-100 text-white dark:text-gray-900 text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none whitespace-nowrap'>
        {isDark ? 'Light mode' : 'Dark mode'}
      </div>
    </button>
  );
}
