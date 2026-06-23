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

  return (
    <Link
      href={url}
      target={isExternalHttp ? '_blank' : '_self'}
      rel='noopener noreferrer'
      className='group flex min-h-[90px] items-center space-x-5 rounded-2xl border border-gray-200 bg-white px-6 py-4 shadow-sm transition-all duration-300 hover:border-primary-300 hover:shadow-md dark:border-border dark:bg-dark-card dark:hover:border-primary-500'
      data-testid={`ConnectCard-${label}`}
    >
      <div className='flex size-12 shrink-0 items-center justify-center text-gray-800 transition-transform duration-300 group-hover:scale-110 dark:text-white'>
        <Icon className='size-10' />
      </div>
      <h3 className='font-heading text-heading-md font-bold tracking-heading text-gray-900 dark:text-white'>{label}</h3>
    </Link>
  );
}
