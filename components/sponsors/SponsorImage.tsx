import Image from 'next/image';
import React from 'react';
import { twMerge } from 'tailwind-merge';

interface SponsorImageProps {
  src: string;
  alt?: string;
  className?: string;
  width?: number;
  height?: number;
  'data-testid'?: string;
}

/**
 * A component that displays sponsor logos with consistent dimensions
 */
export default function SponsorImage({
  src,
  alt = 'Sponsor logo',
  className,
  width = 200,
  height = 48,
  'data-testid': dataTestId
}: SponsorImageProps) {
  return (
    <div className='flex size-full items-center justify-center'>
      <Image
        src={src}
        alt={alt}
        width={width}
        height={height}
        data-testid={dataTestId}
        className={twMerge('max-h-9 sm:max-h-12 w-auto object-contain', className)}
      />
    </div>
  );
}
