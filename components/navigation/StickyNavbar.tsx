import debounce from 'lodash/debounce';
import type { ReactNode } from 'react';
import React, { useEffect, useState } from 'react';

interface StickyNavbarProps {
  children: ReactNode;
  className?: string;
}

/**
 * @description StickyNavbar component renders a sticky navigation bar.
 * @param {Object} props - Props object for StickyNavbar component.
 * @param {ReactNode} props.children - Child elements to be rendered inside the StickyNavbar.
 * @param {string} [props.className=''] - Additional CSS classes for styling.
 */
export default function StickyNavbar({ children, className = '' }: StickyNavbarProps) {
  const [isScrolled, setIsScrolled] = useState<boolean>(false); // Adding Scroll listener

  useEffect(() => {
    const handleScroll = debounce(() => {
      const scrollTop = window.scrollY;

      setIsScrolled(scrollTop > 50); // Trigger after scrolling 50px
    }, 10);

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll); // Clean up
      handleScroll.cancel();
    };
  }, []);

  return (
    <div
      className={`sticky ${isScrolled ? 'dark:bg-transparent' : 'dark:bg-dark-background'} top-0 z-50 lg:pt-2 ${className}`}
      style={{ transform: 'translateZ(0)', willChange: 'transform' }}
      data-testid='Sticky-div'
    >
      {children}
    </div>
  );
}
