import React, { ReactNode } from 'react';

interface StickyNavbarProps {
  children: ReactNode;
  className?: string;
}

export default function StickyNavbar ({ children, className = '' }: StickyNavbarProps) {
  return (
    <div className={`sticky top-0 w-full bg-white border-b border-gray-300 z-50 ${className}`} data-testid="Sticky-div">
      {children}
    </div>
  );
};
