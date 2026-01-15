import React from 'react';

import { Silversponsors } from './SilverSponsorsList';
import SponsorImage from './SponsorImage';

interface SilverSponsorsProps {
  className?: string;
  showSupportBanner?: boolean;
}

/**
 * This component displays Silver Sponsors with a clean, organized layout.
 * @param {SilverSponsorsProps} props - The props for SilverSponsors component.
 * @param {string} props.className - Additional CSS classes for styling.
 * @param {boolean} props.showSupportBanner - Indicates whether support banner should be displayed.
 */
export default function SilverSponsors({ className = '' }: SilverSponsorsProps): React.ReactNode {
  return (
    <div className={`text-center ${className}`}>
      <div className='mx-auto max-w-5xl px-4 py-2'>
        <div className='flex flex-wrap items-center justify-center gap-3 md:gap-4'>
          {Silversponsors.map((sponsor, index) => (
            <a
              key={index}
              href={sponsor.website}
              target='_blank'
              rel='noopener noreferrer'
              className='group flex items-center justify-center rounded-lg border border-gray-50 bg-white px-4 py-3 shadow-sm transition-all duration-300 hover:border-gray-100 hover:shadow-md'
              data-testid='SilverSponsors-link'
            >
              <SponsorImage
                src={sponsor.imageSrc}
                alt={sponsor.altText}
                className={sponsor.imageClass}
                data-testid='SilverSponsors-img'
              />
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}
