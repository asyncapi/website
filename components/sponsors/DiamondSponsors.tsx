import React from 'react';

import { HeadingLevel, HeadingTypeStyle } from '@/types/typography/Heading';

import Container from '../layout/Container';
import Heading from '../typography/Heading';
import PlatinumSponsors from './PlatinumSponsors';

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
export default function DiamondSponsors({ className }: SponsorsProps): React.ReactNode {
  return (
    <div
      className={`w-screen left-1/2 right-1/2 -ml-[50vw] -mr-[50vw] bg-sky-100 dark:bg-dark-card dark:text-gray-100 ${className}`}
    >
      <Heading
        level={HeadingLevel.h3}
        typeStyle={HeadingTypeStyle.lg}
        className='mt-10 py-10 font-heading  font-semibold'
      >
        Diamond Sponsors
        <section role='contentinfo' aria-label='Our Sponsors'>
          <Container className='pb-6 text-center' wide as='section'>
            <PlatinumSponsors className='mt-4' showSupportBanner={false} />
          </Container>
        </section>
      </Heading>
    </div>
  );
}
