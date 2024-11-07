import React from 'react';
import { twMerge } from 'tailwind-merge';

import AsyncAPIColorIcon from './icons/AsyncAPIColorIcon';

interface LoaderProps {
  // eslint-disable-next-line prettier/prettier

  /** The text to be displayed along with the loading animation. */
  loaderText?: string;

  /** The icon to be displayed along with the loading animation. */
  loaderIcon?: React.ReactElement | null;

  /** Additional classes for the loader. */
  className?: string;

  /** Whether the loader should be in dark mode. */
  dark?: boolean;

  /** Whether the loader should be pulsating. */
  pulsating?: boolean;
}

/**
 * This component displays a loader.
 */
export default function Loader({
  loaderText = '',
  loaderIcon = <AsyncAPIColorIcon alt='Loading...' />,
  className = '',
  dark = false,
  pulsating = false
}: LoaderProps) {
  return (
    <div className={twMerge(`w-fit flex gap-4 m-auto items-center ${pulsating ? 'animate-pulse ' : ''} ${className}`)}>
      {loaderIcon}
      <div className={`my-2 ${dark ? 'text-white' : 'text-black'}`}>{loaderText}</div>
    </div>
  );
}
