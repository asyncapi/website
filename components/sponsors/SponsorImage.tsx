import React from 'react';
import { twMerge } from 'tailwind-merge';

interface SponsorImageProps {
  src: string;
  alt?: string;
  className?: string;
}

/**
 * A component that displays sponsor logos with consistent dimensions
 */
export default function SponsorImage({ src, alt = 'Sponsor logo', className }: SponsorImageProps) {
  return (
    <div className='flex size-full items-center justify-center'>
      <img
        src={src}
        alt={alt}
        className={twMerge(
          'max-h-16 w-auto object-contain transition-transform duration-300 ease-in-out group-hover:scale-110',
          className
        )}
      />
    </div>
  );
}
