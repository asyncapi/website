import React from 'react';
import { twMerge } from 'tailwind-merge';

interface SponsorImageProps {
  src: string;
  alt?: string;
  className?: string;
}

/**
 * A component that displays sponsor logos with consistent dimensions
 * Uses a larger base size to ensure quality across different screen sizes
 */
export default function SponsorImage({ src, alt = 'Sponsor logo', className }: SponsorImageProps) {
  return (
    <div className='flex size-full items-center justify-center'>
      <img 
        src={src}
        alt={alt}
        className={twMerge('max-h-9 sm:max-h-12 w-auto object-contain', className)}
        loading="lazy"
      />
    </div>
  );
}
