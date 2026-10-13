import React, { useState } from 'react';

import type { Tsc } from '@/types/pages/community/Community';

import IconChevronDown from '../icons/ChevronDown';
import IconChevronUp from '../icons/ChevronUp';
import IconGithub from '../icons/Github';
import IconLinkedIn from '../icons/LinkedIn';
import IconStar from '../icons/Star';
import IconTwitter from '../icons/Twitter';

type TSCMemberCardProps = Readonly<{
  member: Tsc;
  isAmbassador?: boolean;
}>;

/**
 * @description Component for displaying a TSC member card
 * @param {TSCMemberCardProps} props - The props for TSC member card
 * @param {Tsc} props.member - The TSC member data
 * @param {boolean} [props.isAmbassador] - Whether the member is also an AsyncAPI Ambassador
 */
export default function TSCMemberCard({ member, isAmbassador = false }: TSCMemberCardProps) {
  const [showAllRepos, setShowAllRepos] = useState(false);

  const visibleRepos = showAllRepos ? member.repos : member.repos?.slice(0, 2);
  const hiddenCount = member.repos ? member.repos.length - 2 : 0;

  return (
    <div className='bg-white dark:bg-dark-card rounded-xl border border-gray-200 dark:border-gray-700 p-6 hover:shadow-lg transition-shadow'>
      <div className='flex items-center sm:items-start gap-4 mb-4'>
        <img
          src={member.github ? `https://www.github.com/${member.github}.png` : ''}
          alt={member.name || 'TSC Member'}
          className='w-16 h-16 rounded-full shrink-0'
        />
        <div className='flex-1 min-w-0'>
          <h3 className='text-lg font-bold text-gray-900 dark:text-white truncate'>{member.name}</h3>
          <p className='text-sm text-gray-600 dark:text-gray-400 mb-1 sm:mb-0'>
            {member.availableForHire ? 'Available for hire' : member.company || 'Individual Member'}
          </p>
          {member.availableForHire && (
            <span className='inline-flex sm:hidden items-center px-1.5 py-0.5 rounded-full text-[11px] font-medium bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-300 w-fit mt-1'>
              Available
            </span>
          )}
        </div>
        {member.availableForHire && (
          <span className='hidden sm:inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-300 shrink-0'>
            Available
          </span>
        )}
      </div>

      {isAmbassador && (
        <div className='mb-3'>
          <a
            href={`/community/ambassadors/${member.github}`}
            data-testid='ambassador-badge'
            className='inline-flex items-center gap-1 w-fit px-3 py-1 rounded-full text-xs font-medium bg-secondary-100 dark:bg-secondary-500/20 text-secondary-600 dark:text-secondary-200 border border-secondary-300 dark:border-secondary-400 hover:bg-secondary-200 dark:hover:bg-secondary-500/35 transition-colors'
          >
            <IconStar className='w-3 h-3' />
            Ambassador
          </a>
        </div>
      )}

      {member.repos && Array.isArray(member.repos) && member.repos.length > 0 && (
        <div className='mb-4'>
          <p className='text-xs text-gray-500 dark:text-gray-300 mb-2'>Maintainer of:</p>
          <div className='flex flex-wrap gap-2'>
            {visibleRepos.map((repoName: string) => (
              <a
                key={repoName}
                href={`https://github.com/asyncapi/${repoName}`}
                target='_blank'
                rel='noreferrer'
                data-testid='repo-pill'
                className='inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-purple-100 dark:bg-purple-900/30 text-purple-800 dark:text-purple-300 hover:bg-primary-100 dark:hover:bg-primary-500/30 hover:text-primary-600 dark:hover:text-primary-400 transition-colors'
              >
                {repoName}
              </a>
            ))}
            {!showAllRepos && hiddenCount > 0 && (
              <button
                onClick={() => setShowAllRepos(true)}
                data-testid='repo-expand-button'
                aria-expanded={false}
                className='inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 hover:bg-primary-100 dark:hover:bg-primary-500/20 hover:text-primary-600 dark:hover:text-primary-400 cursor-pointer transition-colors'
              >
                +{hiddenCount}
                <IconChevronDown className='w-3 h-3' />
              </button>
            )}
            {showAllRepos && member.repos.length > 2 && (
              <button
                onClick={() => setShowAllRepos(false)}
                data-testid='repo-collapse-button'
                aria-expanded={true}
                className='inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium bg-gray-100 dark:bg-gray-800 text-gray-500 dark:text-gray-400 hover:bg-primary-100 dark:hover:bg-primary-500/20 hover:text-primary-600 dark:hover:text-primary-400 cursor-pointer transition-colors'
              >
                Show less
                <IconChevronUp className='w-3 h-3' />
              </button>
            )}
          </div>
        </div>
      )}

      <div className='flex gap-3 pt-4 border-t border-gray-200 dark:border-gray-700'>
        {member.github && (
          <a
            href={`https://www.github.com/${member.github}`}
            target='_blank'
            rel='noreferrer'
            aria-label={`${member.name || 'Member'} on GitHub`}
            className='text-gray-600 dark:text-gray-400 hover:!text-primary-500 dark:hover:!text-primary-500 transition-colors'
          >
            <IconGithub className='h-5 w-5' />
          </a>
        )}
        {member.twitter && (
          <a
            href={`https://www.twitter.com/${member.twitter}`}
            target='_blank'
            rel='noreferrer'
            aria-label={`${member.name || 'Member'} on Twitter`}
            className='text-gray-600 dark:text-gray-400 hover:!text-primary-500 dark:hover:!text-primary-500 transition-colors'
          >
            <IconTwitter className='h-5 w-5' />
          </a>
        )}
        {member.linkedin && (
          <a
            href={`https://www.linkedin.com/in/${member.linkedin}`}
            target='_blank'
            rel='noreferrer'
            aria-label={`${member.name || 'Member'} on LinkedIn`}
            className='text-gray-600 dark:text-gray-400 hover:!text-primary-500 dark:hover:!text-primary-500 transition-colors'
          >
            <IconLinkedIn className='h-5 w-5' />
          </a>
        )}
      </div>
    </div>
  );
}
