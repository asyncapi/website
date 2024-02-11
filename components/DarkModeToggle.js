import { useTheme } from 'next-themes';
import Image from 'next/image';
import { useState, useEffect } from 'react';

const DarkModeToggle = () => {
  const { theme, setTheme } = useTheme();

  const toggleDarkMode = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark');
  };

  return (
    <button onClick={toggleDarkMode} className="dark-mode-toggle">
      {theme !== 'dark' ? (
        <Image src="/img/illustrations/moon.webp" alt="Light Mode" width={27} height={27} />
      ) : (
        <Image src="/img/illustrations/sun.webp" alt="Dark Mode" width={27} height={27} />
      )}
    </button>
  );
};

export default DarkModeToggle;