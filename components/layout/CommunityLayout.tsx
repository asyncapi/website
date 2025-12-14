import { UserGroupIcon } from '@heroicons/react/outline';
import { sortBy } from 'lodash';
import React, { useMemo, useState } from 'react';

import type { Ambassador, Tsc } from '@/types/pages/community/Community';

import tscBoardList from '../../config/TSC_BOARD_MEMBERS.json';
import IconGithub from '../icons/Github';
import IconLinkedIn from '../icons/LinkedIn';
import IconTwitter from '../icons/Twitter';
import NewsletterSubscribe from '../NewsletterSubscribe';
import TextLink from '../typography/TextLink';
import GenericLayout from './GenericLayout';

interface SocialLinkProps {
  href: string;
  social: string;
}

export enum Membership {
  TSC = 'TSC',
  BOARD = 'Board'
}

interface TSCUser {
  user: Tsc | Ambassador;
  membership?: Membership;
}

/**
 * @description This function adds additional information to the user object having Board (TSC or Ambassador) data.
 *
 * @param user The user object having Board (TSC or Ambassador) data.
 * @returns The user object with additional information.
 */
function addAdditionalUserInfo(user: Tsc | Ambassador) {
  const userData: Tsc | Ambassador = {
    ...user
  };

  // if username is not present, use the github username
  if (!userData.name) {
    userData.name = userData.github;
  }

  // add social links
  if (userData.github) {
    userData.github = `https://www.github.com/${userData.github}`;
    // add avatar url only when github is available
    // github redirects to avatar url using `https://www.github.com/<username>.png`
    userData.avatarUrl = `${userData.github}.png`;
  }
  if (userData.linkedin) {
    userData.linkedin = `https://www.linkedin.com/in/${userData.linkedin}`;
  }
  if (userData.twitter) {
    userData.twitter = `https://www.twitter.com/${userData.twitter}`;
  }

  // (avatarUrl was set above when github exists)

  // make repo links
  if ('repos' in userData) {
    userData.repos = userData.repos.map((repoName: string) => ({
      name: repoName,
      url: `https://www.github.com/asyncapi/${repoName}`
    }));
  }

  return userData;
}

/**
 * @description This function returns the SVG component for Twitter.
 *
 * @returns The Twitter SVG component.
 */
function TwitterSVG() {
  return (
    <div className='size-5'>
      <IconTwitter className='hover:fill-black' />
    </div>
  );
}

/**
 * @description This function returns the SVG component for GitHub.
 *
 * @returns The GitHub SVG component.
 */
function GitHubSVG() {
  return (
    <div className='size-5'>
      <IconGithub className='hover:fill-black' />
    </div>
  );
}

/**
 * @description This function returns the SVG component for LinkedIn.
 *
 * @returns The LinkedIn SVG component.
 */
function LinkedInSVG() {
  return (
    <div className='size-5'>
      <IconLinkedIn className='hover:fill-linkedin' />
    </div>
  );
}

const socials: { [key: string]: React.JSX.Element } = {
  GitHub: <GitHubSVG />,
  Twitter: <TwitterSVG />,
  Linkedin: <LinkedInSVG />
};

/**
 * @description This function returns the social link component.
 *
 * @param {SocialLinkProps} props - The props for the social link component.
 * @param {string} props.href - The URL for the social link.
 * @param {string} props.social - The social media platform.
 */
function SocialLink({ href, social }: SocialLinkProps) {
  return (
    <li>
      <a
        data-testid='Social-Links'
        href={href}
        className='text-gray-600 hover:text-gray-500'
        target='_blank'
        rel='noreferrer noopener'
      >
        <span className='sr-only'>{social}</span>
        {socials[social]}
      </a>
    </li>
  );
}

/**
 * @description This function returns the user work status component.
 *
 * @param {TSCUser} props - The props for the user work status component.
 * @param {Tsc | Ambassador} props.user - The user object having Board (TSC or Ambassador) data.
 */
function UserWorkStatus({ user }: TSCUser) {
  if ('availableForHire' in user && user.availableForHire) {
    return (
      <div
        data-testid='status-element'
        className='text-md inline-flex items-center rounded-full bg-green-100 px-3 py-1 font-medium leading-5 text-green-800'
      >
        Available for hire
      </div>
    );
  }
  if (user.company) {
    return (
      <div
        data-testid='status-element'
        className='text-md inline-flex items-center rounded-full bg-orange-100 px-3 py-1 font-medium leading-5 text-orange-800'
      >
        {user.company}
      </div>
    );
  }

  return (
    <div
      data-testid='status-element'
      className='text-md inline-flex items-center rounded-full bg-blue-100 px-3 py-1 font-medium leading-5 text-blue-800'
    >
      Individual Member
    </div>
  );
}

/**
 * @description This function returns the user info component.
 *
 * @param {TSCUser} props - The props for the user info component.
 * @param {Tsc} props.user - The user object having Board (TSC or Ambassador) data.
 * @param {Membership} props.membership - determines the community members belong to board or TSC (ambassadors & maintainers).
 */
function UserInfo({ user, membership }: TSCUser) {
  const githubUsername = (user.github ?? '').split('/').filter(Boolean).pop() || '';

  return (
    <li
      data-testid='UserInfo-list'
      className='rounded-md border border-gray-200 p-4 text-center shadow-md'
      key={user.github}
    >
      <div className='flex flex-row'>
        <img
          data-testid='UserInfo-avatar'
          src={user.avatarUrl}
          alt={user.name}
          className='mx-auto size-20 rounded-full xl:size-28'
        />
        <div className='flex-1'>
          <div className='my-3 text-lg font-bold' data-testid='UserInfo-name'>
            {user.name}
          </div>
          <UserWorkStatus user={user} />
          <ul role='list' className='my-5 flex justify-center space-x-5'>
            <SocialLink href={user.github} social='GitHub' />
            {user.twitter ? <SocialLink href={user.twitter} social='Twitter' /> : null}
            {user.linkedin ? <SocialLink href={user.linkedin} social='Linkedin' /> : null}
          </ul>
        </div>
      </div>
      {(() => {
        if ('repos' in user) {
          return (
            <div className='flex flex-wrap items-center gap-1'>
              Maintainer of:
              {user.repos.map((repo: { name: string; url: string }) => (
                <a
                  data-testid='Repo-Links'
                  key={repo.name}
                  className='inline-flex items-center rounded-full bg-cyan-100 px-3 py-0.5 text-xs font-medium leading-5 text-cyan-800 hover:bg-cyan-300'
                  href={repo.url}
                >
                  {repo.name}
                </a>
              ))}
            </div>
          );
        }

        if (githubUsername) {
          return (
            <TextLink
              href={`/community/ambassadors/${githubUsername}`}
              className='flex font-normal text-base text-blue-500 no-underline hover:text-sky-400'
            >
              AsyncAPI Ambassador
            </TextLink>
          );
        }

        return null;
      })()}

      <div className='flex justify-end mt-4'>
        {membership === Membership.BOARD && user.isBoardChair && (
          <a
            data-testid='Chairperson'
            className='inline-flex items-center rounded-full bg-amber-600 px-3 py-0.5 text-xs font-medium leading-5 text-amber-100'
          >
            <UserGroupIcon className='w-[20px] pr-1' />
            Chairperson
          </a>
        )}
      </div>
    </li>
  );
}

/**
 * @description This function returns the question card component.
 */
function QuestionCard() {
  return (
    <li className='rounded-md border border-gray-200 p-4 px-6 py-10 text-center shadow-md' data-testid='Question-card'>
      <img
        data-testid='Question-card-img'
        src='/img/avatars/questionmark.webp'
        alt='Question Mark'
        className='mx-auto size-20 rounded-full xl:size-28'
      />
      <div className='my-4'>
        Want to become a member? Follow this
        <TextLink
          href='https://github.com/asyncapi/community/blob/master/TSC_MEMBERSHIP.md'
          target='_blank'
          className='font-normal text-base text-sky-600 no-underline hover:text-sky-400'
        >
          Link
        </TextLink>
        &nbsp;to know more!
      </div>
    </li>
  );
}

interface ICommunityLayout {
  membership: Membership;
  children: React.ReactNode;
}

/**
 * @description This function returns the TSC or Board component.
 * @param {Membership} props.membership - determines the community members belong to board or TSC (ambassadors & maintainers).
 */
export default function CommunityLayout({ children, membership }: ICommunityLayout) {
  const description = `Meet the current AsyncAPI ${membership} members and learn how you can become one.`;
  const image = `/img/social/community-${membership.toLowerCase()}.webp`;

  const isTSCMembership = membership === Membership.TSC;

  // State for search and filtering
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedRepo, setSelectedRepo] = useState('all');
  const [repoSearchQuery, setRepoSearchQuery] = useState('');
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const tscBoardMembers = useMemo(() => {
    return sortBy(
      tscBoardList.map((user) => addAdditionalUserInfo(user)),
      ['name']
    ).filter((user) => (isTSCMembership ? user.isTscMember : user.isBoardMember || user.isBoardChair));
  }, [isTSCMembership]);

  // Extract unique repositories for TSC members
  const repositories = useMemo(() => {
    if (!isTSCMembership) return [];

    const repoSet = new Set<string>();

    tscBoardMembers.forEach((member) => {
      if ('repos' in member && member.repos) {
        member.repos.forEach((repo: { name: string }) => {
          repoSet.add(repo.name);
        });
      }
    });

    return Array.from(repoSet).sort();
  }, [tscBoardMembers, isTSCMembership]);

  // Filter repositories based on search query
  const filteredRepositories = useMemo(() => {
    if (!repoSearchQuery) return repositories;

    return repositories.filter((repo) => repo.toLowerCase().includes(repoSearchQuery.toLowerCase()));
  }, [repositories, repoSearchQuery]);

  // Filter members based on search query and selected repository
  const filteredMembers = useMemo(() => {
    return tscBoardMembers.filter((member) => {
      const searchLower = searchQuery.toLowerCase();

      // Search filter
      const matchesSearch =
        !searchQuery ||
        member.name.toLowerCase().includes(searchLower) ||
        (member.company && member.company.toLowerCase().includes(searchLower)) ||
        ('repos' in member &&
          member.repos &&
          member.repos.some((repo: { name: string }) => repo.name.toLowerCase().includes(searchLower)));

      // Repository filter
      const matchesRepo =
        selectedRepo === 'all' ||
        ('repos' in member &&
          member.repos &&
          member.repos.some((repo: { name: string }) => repo.name === selectedRepo));

      return matchesSearch && matchesRepo;
    });
  }, [tscBoardMembers, searchQuery, selectedRepo]);

  return (
    <GenericLayout
      title={isTSCMembership ? 'Technical Steering Committee' : 'Board Committee'}
      description={description}
      image={image}
      wide
    >
      <div className='relative mx-auto px-4 py-12 sm:px-6 lg:px-8'>
        {children}
        {isTSCMembership && (
          <div className='mt-8'>
            <NewsletterSubscribe
              type='TSC Voting'
              title='Get notified when TSC is voting'
              subtitle="You'll receive an email whenever someone requests the TSC to vote."
            />
          </div>
        )}
        <div className='mt-10'>
          <div className='text-primary-800 mb-5 text-center'>
            <h3 className='text-2xl font-semibold'>Current {membership} members</h3>
            <span className='font-thin text-sm'>(in alphabetical order)</span>
          </div>

          {/* Search and Filter Section */}
          {isTSCMembership && (
            <div className='mb-8 rounded-lg border border-gray-200 bg-white p-6'>
              <div className='grid gap-6 md:grid-cols-2'>
                {/* Search Input */}
                <div>
                  <label htmlFor='search-members' className='mb-2 block text-sm font-medium text-gray-700'>
                    Search members
                  </label>
                  <input
                    id='search-members'
                    type='text'
                    placeholder='Search by name, company, or repo'
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className='w-full rounded-md border border-gray-300 px-4 py-2.5 text-sm text-gray-900 placeholder-gray-400 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500'
                  />
                </div>

                {/* Repository Dropdown */}
                <div>
                  <label htmlFor='maintainer-repo' className='mb-2 block text-sm font-medium text-gray-700'>
                    Maintainer repo
                  </label>
                  <div className='relative'>
                    <button
                      type='button'
                      onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                      className='w-full rounded-md border border-gray-300 bg-white px-4 py-2.5 text-left text-sm text-gray-900 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500'
                    >
                      <span className='block truncate'>
                        {selectedRepo === 'all' ? 'All repositories' : selectedRepo}
                      </span>
                      <span className='pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2'>
                        <svg
                          className={`h-5 w-5 text-gray-400 transition-transform ${isDropdownOpen ? 'rotate-180' : ''}`}
                          viewBox='0 0 20 20'
                          fill='currentColor'
                        >
                          <path
                            fillRule='evenodd'
                            d='M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z'
                            clipRule='evenodd'
                          />
                        </svg>
                      </span>
                    </button>

                    {isDropdownOpen && (
                      <div className='absolute z-10 mt-1 w-full rounded-md border border-gray-200 bg-white shadow-lg'>
                        <div className='p-2'>
                          <input
                            type='text'
                            placeholder='Search repositories...'
                            value={repoSearchQuery}
                            onChange={(e) => setRepoSearchQuery(e.target.value)}
                            className='w-full rounded border border-gray-300 px-3 py-1.5 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500'
                            onClick={(e) => e.stopPropagation()}
                          />
                        </div>
                        <ul className='max-h-60 overflow-auto py-1'>
                          <li
                            onClick={() => {
                              setSelectedRepo('all');
                              setIsDropdownOpen(false);
                              setRepoSearchQuery('');
                            }}
                            className='cursor-pointer px-4 py-2 text-sm text-gray-900 hover:bg-gray-100'
                          >
                            <span className='flex items-center'>
                              {selectedRepo === 'all' && (
                                <svg className='mr-2 h-4 w-4 text-blue-600' fill='currentColor' viewBox='0 0 20 20'>
                                  <path
                                    fillRule='evenodd'
                                    d='M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z'
                                    clipRule='evenodd'
                                  />
                                </svg>
                              )}
                              All repositories
                            </span>
                          </li>
                          {filteredRepositories.map((repo) => (
                            <li
                              key={repo}
                              onClick={() => {
                                setSelectedRepo(repo);
                                setIsDropdownOpen(false);
                                setRepoSearchQuery('');
                              }}
                              className='cursor-pointer px-4 py-2 text-sm text-gray-900 hover:bg-gray-100'
                            >
                              <span className='flex items-center'>
                                {selectedRepo === repo && (
                                  <svg className='mr-2 h-4 w-4 text-blue-600' fill='currentColor' viewBox='0 0 20 20'>
                                    <path
                                      fillRule='evenodd'
                                      d='M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z'
                                      clipRule='evenodd'
                                    />
                                  </svg>
                                )}
                                {repo}
                              </span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          )}

          <ul role='list' className='space-y-4 sm:grid sm:grid-cols-2 sm:gap-6 sm:space-y-0 lg:grid-cols-3 lg:gap-8'>
            {filteredMembers.map((user) => (
              <UserInfo key={user.github} user={user} membership={membership} />
            ))}
            <QuestionCard />
          </ul>

          {/* No results message */}
          {filteredMembers.length === 0 && (
            <div className='mt-8 text-center'>
              <p className='text-gray-500'>No members found matching your search criteria.</p>
            </div>
          )}
        </div>
      </div>
    </GenericLayout>
  );
}
