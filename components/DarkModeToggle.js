import { useTheme } from 'next-themes';
import { useState } from 'react';

const DarkModeToggle = () => {
  const { theme, setTheme } = useTheme();
  const [isDarkMode, setIsDarkMode] = useState(theme === 'dark');
  const [isClickable, setIsClickable] = useState(true);

  const toggleDarkMode = () => {
    if (!isClickable) return;
    
    setIsClickable(false); 
    const newTheme = isDarkMode ? 'light' : 'dark';
    setTheme(newTheme);
    setIsDarkMode(!isDarkMode);

    setTimeout(() => {
      setIsClickable(true);
    }, 500); 
  };

  return (
    <button onClick={toggleDarkMode} className="dark-mode-toggle" disabled={!isClickable}>
      {isDarkMode ? (
        <img src="/img/illustrations/sun.webp" alt="Dark Mode" width={27} height={27} />
      ) : (
        <img src="/img/illustrations/moon.webp" alt="Light Mode" width={27} height={27} />
      )}
    </button>
  );
};

export default DarkModeToggle;
