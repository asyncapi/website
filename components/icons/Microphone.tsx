import React from 'react';

/**
 * @description Icon component for Microphone
 */
interface IconMicrophoneProps {
  className?: string;
}

/**
 * @param {IconMicrophoneProps} props - The props for the Microphone icon
 * @returns {React.JSX.Element} The Microphone icon component
 */
export default function IconMicrophone({ className = '' }: IconMicrophoneProps): React.JSX.Element {
  return (
    <svg
      className={className}
      fill='currentColor'
      viewBox='0 0 20 20'
      xmlns='http://www.w3.org/2000/svg'
      aria-hidden='true'
      focusable='false'
    >
      <path
        fillRule='evenodd'
        d='M7 4a3 3 0 016 0v4a3 3 0 11-6 0V4zm4 10.93A7.001 7.001 0 0017 8a1 1 0 10-2 0A5 5 0 015 8a1 1 0 00-2 0 7.001 7.001 0 006 6.93V17H6a1 1 0 100 2h8a1 1 0 100-2h-3v-2.07z'
        clipRule='evenodd'
      />
    </svg>
  );
}
