import React from 'react';

import { goldSponsors } from './GoldSponsorsList';
import SponsorImage from './SponsorImage';

interface GoldSponsorsProps {
  className?: string;
  showSupportBanner?: boolean;
}

/**
 * @description This component displays Gold Sponsors with a professional layout.
 * @param {GoldSponsorsProps} props - The props for GoldSponsors component.
 * @param {string} props.className - Additional CSS classes for styling.
 * @param {boolean} props.showSupportBanner - Indicates whether support banner should be displayed.
 */
export default function GoldSponsors({ className = '' }: GoldSponsorsProps): React.ReactNode {
  return (
    <div className={`text-center ${className}`}>
      <div className='mx-auto max-w-3xl px-4 py-4'>
        <div className='flex flex-wrap items-center justify-center gap-4 md:gap-6'>
          {goldSponsors.map((sponsor, index) => (
            <a
              key={index}
              href={sponsor.website}
              target='_blank'
              rel='noopener noreferrer'
              className='group flex items-center justify-center rounded-lg border border-gray-100 bg-white px-6 py-3 shadow-sm transition-all duration-300 hover:border-gray-200 hover:shadow-md'
              data-testid='GoldSponsors-link'
            >
              <SponsorImage
                src={sponsor.imageSrc}
                alt={sponsor.altText}
                className={sponsor.imageClass}
                data-testid='GoldSponsors-img'
              />
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}
