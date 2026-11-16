import Link from 'next/link';
import React from 'react';

export type ConnectCardProps = Readonly<{
  label: string;
  url: string;
  Icon: React.ComponentType<{ className?: string }>;
}>;

/**
 * @description ConnectCard renders a single social link card used on the /connect page.
 */
export default function ConnectCard({ label, url, Icon }: ConnectCardProps) {
  const isExternalHttp = /^https?:\/\//.test(url);
  const ariaLabel = isExternalHttp ? `${label} (opens in new tab)` : label;

  return (
    <Link
      href={url}
      target={isExternalHttp ? '_blank' : '_self'}
      rel='noopener noreferrer'
      aria-label={ariaLabel}
      className='group flex min-h-[120px] items-center space-x-6 rounded-2xl border border-gray-200 bg-white px-8 py-6 shadow-sm transition-all duration-300 hover:border-primary-300 hover:shadow-md dark:border-border dark:bg-dark-card dark:hover:border-primary-500'
      data-testid={`ConnectCard-${label}`}
    >
      <div className='flex size-16 shrink-0 items-center justify-center text-gray-800 transition-transform duration-300 group-hover:scale-110 dark:text-white'>
        <Icon className='size-14' />
      </div>
      <h3 className='font-heading text-heading-lg font-semibold tracking-heading text-gray-900 dark:text-white'>
        {label}
      </h3>
    </Link>
  );
}
