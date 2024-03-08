import React from 'react';

interface CaptionProps {
  children: React.ReactNode;
}

const Caption: React.FC<CaptionProps> = ({ children }) => {
  return (
    <p className='mt-2 text-center text-xs text-gray-500' data-testid='Caption-paragraph'>
      {children}
    </p>
  );
};

export default Caption;
