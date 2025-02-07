import React from 'react';

interface CircularLoaderProps {
  // eslint-disable-next-line prettier/prettier

  /** Whether the loader should be in dark mode. */
  dark?: boolean;
}

/**
 * CircularLoader Icon
 */
export default function IconCircularLoader({ dark = false }: CircularLoaderProps) {
  return (
    <svg
      className={`mx-auto animate-spin border-4 border-t-transparent ${dark ? 'border-white' : 'border-black'} size-10 rounded-full`}
      viewBox='0 0 24 24'
    />
  );
}
