import React from 'react';

interface CaptionProps {
  children: string;
}

/**
 * @description This component displays textual captions.
 *
 * @param {CaptionProps} props - The props for the Caption component.
 * @param {string} props.children - The content to be displayed as the caption.
 */
export default function Caption({ children }: CaptionProps) {
  return (
    <p className='mt-2 text-center text-xs text-gray-500' data-testid='Caption-paragraph'>
      {children}
    </p>
  );
}
