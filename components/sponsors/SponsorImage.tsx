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
      <img src={src} alt={alt} className={twMerge('max-h-9 sm:max-h-12 w-auto object-contain group-hover:scale-110 group-hover:brightness-110 transition-all duration-300', className)} />
    </div>
  );
}
