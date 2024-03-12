import type { ReactNode } from 'react';
import React from 'react';

interface StickyNavbarProps {
  children: ReactNode;
  className?: string;
}

export default function StickyNavbar({ children, className = '' }: StickyNavbarProps) {
  return (
    <div className={`sticky top-0 z-50 w-full border-b border-gray-300 bg-white ${className}`} data-testid='Sticky-div'>
      {children}
    </div>
  );
};
