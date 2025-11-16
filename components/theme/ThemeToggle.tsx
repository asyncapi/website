import { useEffect, useState } from 'react';
import { FiMoon, FiSun } from 'react-icons/fi';

/**
 * @description A theme toggle component that allows users to switch between light and dark themes.
 */
export default function ThemeToggle() {
  const [darkMode, setDarkMode] = useState<boolean>(false);

  useEffect(() => {
    // Check for saved theme preference or use system preference
    const isDark = localStorage.theme === 'dark' || 
      (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches);
    
    setDarkMode(isDark);
    updateTheme(isDark);
    
    // Debug logging
    console.log('Theme initialized:', { isDark, theme: localStorage.theme });
  }, []);

  const updateTheme = (isDark: boolean) => {
    if (isDark) {
      document.documentElement.classList.add('dark');
      localStorage.theme = 'dark';
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.theme = 'light';
    }
  };

  const toggleTheme = () => {
    const newDarkMode = !darkMode;
    setDarkMode(newDarkMode);
    updateTheme(newDarkMode);
    
    // Debug logging
    console.log('Theme toggled:', { newDarkMode, classList: document.documentElement.classList.toString() });
  };

  return (
    <button
      onClick={toggleTheme}
      className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-slate-700 transition-colors duration-200 text-gray-600 dark:text-gray-300"
      aria-label={darkMode ? 'Switch to light mode' : 'Switch to dark mode'}
    >
      {darkMode ? (
        <FiSun className="w-5 h-5 text-yellow-400 hover:text-yellow-300" />
      ) : (
        <FiMoon className="w-5 h-5 text-gray-600 dark:text-gray-300 hover:text-gray-800 dark:hover:text-gray-100" />
      )}
    </button>
  );
}
