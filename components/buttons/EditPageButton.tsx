import React, { useCallback, useMemo } from 'react';
import { twMerge } from 'tailwind-merge';

import type { EditPageButtonProps } from '@/types/components/EditPageButton';

import { mapUrlToGitHubEdit, openGitHubUrl, shouldShowEditButton } from '../../utils/editPageUtils';
import EditIcon from '../icons/Edit';
import IconGithub from '../icons/Github';

export default function EditPageButton({ slug, contentType, className = '', variant = 'inline' }: EditPageButtonProps) {
  const shouldShow = shouldShowEditButton(slug);
  const urlResult = useMemo(() => mapUrlToGitHubEdit(slug, contentType), [slug, contentType]);

  const handleClick = useCallback(
    (e: React.MouseEvent<HTMLAnchorElement>) => {
      e.preventDefault();
      if (!urlResult.editUrl) return;

      const success = openGitHubUrl(urlResult.editUrl);

      if (!success) {
        window.location.href = urlResult.editUrl;
      }
    },
    [urlResult.editUrl]
  );

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent<HTMLAnchorElement>) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        handleClick(e as unknown as React.MouseEvent<HTMLAnchorElement>);
      }
    },
    [handleClick]
  );

  if (!shouldShow) {
    return null;
  }

  if (!urlResult.success || !urlResult.editUrl) {
    return null;
  }

  const baseClasses = twMerge(
    'inline-flex items-center gap-2 font-medium transition-all duration-500 ease-in-out',
    'text-gray-700 hover:text-gray-900 focus:text-gray-900',
    'focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2',
    'rounded-md',
    'cursor-pointer',
    className
  );

  const floatingClasses = twMerge(
    baseClasses,
    'fixed bottom-4 right-4 z-60',
    'text-sm xs:text-body-sm sm:text-body-md',
    'px-3 py-2 xs:px-4 xs:py-3',
    'bg-white border border-gray-300 shadow-lg',
    'hover:bg-gray-50 hover:border-gray-400 hover:shadow-xl',
    'focus:bg-gray-50 focus:border-primary-500 focus:shadow-xl',
    'active:bg-gray-100 active:scale-95',
    'sm:bottom-6 sm:right-6'
  );

  const inlineClasses = twMerge(
    baseClasses,
    'text-sm xs:text-body-sm sm:text-body-md',
    'underline hover:no-underline focus:no-underline',
    'hover:text-primary-600 focus:text-primary-600',
    'px-1 py-1 xs:px-2 xs:py-1'
  );

  const finalClasses = variant === 'floating' ? floatingClasses : inlineClasses;
  const ariaLabel = `Edit this ${contentType} page on GitHub (opens in new tab)`;

  return (
    <a
      href={urlResult.editUrl}
      target='_blank'
      rel='noopener noreferrer nofollow'
      className={finalClasses}
      aria-label={ariaLabel}
      role='link'
      tabIndex={0}
      onKeyDown={handleKeyDown}
      onClick={handleClick}
      data-testid='edit-page-button'
      title={`Edit this ${contentType} page on GitHub`}
      referrerPolicy='no-referrer'
    >
      {variant === 'floating' ? (
        <>
          <IconGithub className='size-4 xs:size-5 shrink-0' aria-hidden='true' />
          <span className='hidden xs:inline'>Edit</span>
          <span className='sr-only xs:hidden'>Edit page</span>
        </>
      ) : (
        <>
          <EditIcon className='size-4 xs:size-5 shrink-0' aria-hidden='true' />
          <span className='hidden sm:inline'>Edit this page on GitHub</span>
          <span className='sm:hidden'>Edit page</span>
        </>
      )}
    </a>
  );
}
