import React from 'react';

import { platinumSponsors } from './PlatinumSponsorsList';
import SponsorImage from './SponsorImage';

interface SponsorsProps {
  className: string;
  showSupportBanner: boolean;
}

/**
 * This component displays Silver Sponsors.
 * @param {SponsorsProps} props - The props for Sponsors component.
 * @param {string} props.className - Additional CSS classes for styling.
 * @param {boolean} props.showSupportBanner - Indicates whether support banner should be displayed.
 */
export default function PlatinumSponsors({ className = '', showSupportBanner = true }: SponsorsProps): React.ReactNode {
  return (
    <div className={`text-center ${className}`}>
      <ul className='mb-4 flex flex-wrap items-center justify-center gap-x-8 gap-y-8 px-4 sm:gap-x-12 sm:gap-y-10'>
        {platinumSponsors.map((sponsor, index) => (
          <li key={index} data-testid='Sponsors-list'>
            <a
              href={sponsor.website}
              target='_blank'
              className='group relative flex min-h-24 items-center justify-center rounded-lg p-4 transition-all duration-300 ease-in-out hover:bg-white hover:shadow-lg'
              rel='noopener noreferrer'
              data-testid='Sponsors-link'
            >
              <SponsorImage
                className={sponsor?.imageClass}
                src={sponsor.imageSrc}
                alt={sponsor.altText}
                data-testid='Sponsors-img'
              />
            </a>
          </li>
        ))}
      </ul>
      {showSupportBanner && (
        <div className='md:px-4'>
          <span className='text-gray-500'>Want to become a sponsor?</span>{' '}
          <a
            href='https://opencollective.com/asyncapi'
            target='_blank'
            rel='noopener noreferrer'
            className='text-primary-600'
          >
            Support us!
          </a>
        </div>
      )}
    </div>
  );
}
