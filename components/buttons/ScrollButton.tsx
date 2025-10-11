/// <reference types="node" />

import React, { useEffect, useState } from 'react';

/**
 * ScrollButton component shows a "Back to Top" button at the bottom of the page.
 * The button is visible only when the user scrolls to the bottom of the page.
 */
const ScrollButton: React.FC = () => {
  const [isBottom, setIsBottom] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.innerHeight + window.pageYOffset;
      const pageHeight = document.documentElement.scrollHeight;

      setIsBottom(scrollPosition >= pageHeight);
    };

    // Initialize the button visibility on mount
    handleScroll();

    let throttleTimeout: NodeJS.Timeout | null = null;

    const throttledHandleScroll = () => {
      if (throttleTimeout === null) {
        throttleTimeout = setTimeout(() => {
          handleScroll();
          throttleTimeout = null;
        }, 100);
      }
    };

    window.addEventListener('scroll', throttledHandleScroll);

    return () => {
      window.removeEventListener('scroll', throttledHandleScroll);

      if (throttleTimeout) {
        clearTimeout(throttleTimeout);
      }
    };
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  if (!isBottom) return null;

  return (
    <button
      onClick={scrollToTop}
      className='fixed bottom-6 right-6 z-50 h-12 w-12 rounded-full bg-purple-600
                 text-white shadow-md hover:bg-purple-700 transition duration-300
                 flex items-center justify-center text-lg'
      aria-label='Scroll to top'
      type='button'
    >
      ↑
    </button>
  );
};

export default ScrollButton;
