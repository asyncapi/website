import type { ReactNode } from 'react';
import React, { useState } from 'react';

interface FullscreenProps {
  children: ReactNode;
  className?: string;
}

const FullscreenToggle: React.FC<FullscreenProps> = ({ children, className = '' }) => {
  const [isFullscreen, setIsFullscreen] = useState(false);

  const toggleFullscreen = () => {
    if (document.fullscreenElement) {
      document
        .exitFullscreen()
        .then(() => setIsFullscreen(false))
        .catch((err) => console.error('Error attempting to exit fullscreen:', err));
    } else {
      document.documentElement
        .requestFullscreen()
        .then(() => setIsFullscreen(true))
        .catch((err) => console.error('Error attempting to enable fullscreen:', err));
    }
  };

  return (
    <div className={`relative ${className}`}>
      <button
        onClick={toggleFullscreen}
        className='fixed right-4 top-4 z-50 rounded-lg border border-gray-200 bg-white
                  p-2 shadow-sm transition-colors duration-200 hover:bg-gray-50'
        aria-label={isFullscreen ? 'Exit fullscreen' : 'Enter fullscreen'}
      >
        {isFullscreen ? (
          <svg className='size-5 text-gray-700' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
            <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M6 18L18 6M6 6l12 12' />
          </svg>
        ) : (
          <svg className='size-5 text-gray-700' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
            <path
              strokeLinecap='round'
              strokeLinejoin='round'
              strokeWidth={2}
              d='M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5v-4m0 4h-4m4 0l-5-5'
            />
          </svg>
        )}
      </button>
      {children}
    </div>
  );
};

export default FullscreenToggle;
