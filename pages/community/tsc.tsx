import { sortBy } from 'lodash';
import { useEffect, useState } from 'react';

import type { Tsc } from '@/types/pages/community/Community';

import Button from '../../components/buttons/Button';
import TSCMemberCard from '../../components/community/TSCMemberCard';
import { COMMUNITY_URLS } from '../../components/footer/FooterList';
import IconArrowRight from '../../components/icons/ArrowRight';
import IconDocument from '../../components/icons/Document';
import IconUsersGroup from '../../components/icons/UsersGroup';
import GenericLayout from '../../components/layout/GenericLayout';
import NewsletterSubscribe from '../../components/NewsletterSubscribe';
import PaginationComponent from '../../components/Pagination';
import tscBoardList from '../../config/TSC_BOARD_MEMBERS.json';

/**
 * @description Add additional user information to the user object having TSC data
 * @param {any} user - The user object having TSC data
 */
function addAdditionalUserInfo(user: any): Tsc {
  const userData: any = {
    ...user
  };

  if (!userData.name) {
    userData.name = userData.github;
  }

  return userData;
}

/**
 * @description This function returns the TSC component.
 */
export default function TSC() {
  const image = '/img/social/community-tsc.webp';
  const tscMembers = sortBy(
    tscBoardList.map((user) => addAdditionalUserInfo(user)),
    ['name']
  ).filter((user) => user.isTscMember);

  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState<'all' | 'maintainer' | 'available' | 'company'>('all');
  const membersPerPage = 9;

  const filteredMembers = tscMembers.filter((member) => {
    const matchesSearch =
      member.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (member.github && member.github.toLowerCase().includes(searchTerm.toLowerCase()));

    const matchesFilter =
      filterType === 'all' ||
      (filterType === 'maintainer' && member.repos && member.repos.length > 0) ||
      (filterType === 'available' && member.availableForHire) ||
      (filterType === 'company' && member.company);

    return matchesSearch && matchesFilter;
  });

  const totalPages = Math.ceil(filteredMembers.length / membersPerPage);
  const indexOfLastMember = currentPage * membersPerPage;
  const indexOfFirstMember = indexOfLastMember - membersPerPage;
  const currentMembers = filteredMembers.slice(indexOfFirstMember, indexOfLastMember);

  useEffect(() => {
    if (totalPages === 0 || currentPage > totalPages) {
      setCurrentPage(1);
    }
  }, [searchTerm, filterType, filteredMembers.length, totalPages, currentPage]);

  return (
    <GenericLayout
      title='Technical Steering Committee'
      description='Meet the current AsyncAPI TSC members and learn how you can become one.'
      image={image}
      wide
    >
      {/* Hero Section */}
      <div className='bg-white dark:bg-dark-background py-12 sm:py-16 lg:py-20'>
        <div className='mx-auto max-w-7xl px-4 sm:px-6 lg:px-8'>
          <div className='text-center'>
            <h1 className='text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-gray-900 dark:text-white mb-6'>
              Technical Steering Committee
            </h1>
            <p className='mx-auto max-w-3xl text-lg text-gray-600 dark:text-gray-400 mb-10'>
              Meet the dedicated maintainers and contributors who guide the AsyncAPI Initiative forward, making
              strategic decisions that shape the future of event-driven architecture.
            </p>
            <div className='flex flex-col sm:flex-row gap-4 justify-center items-center'>
              <Button
                text='Learn How to Join'
                href={COMMUNITY_URLS.GITHUB.TSC_MEMBERSHIP}
                target='_blank'
                className='hover:bg-primary-600 focus:outline-none'
                icon={<IconArrowRight className='-mb-1 size-5' />}
              />
              <Button
                text='View Members'
                bgClassName='bg-white hover:bg-gray-100 dark:bg-dark-card dark:hover:bg-gray-800'
                textClassName='text-secondary-500 dark:text-secondary-400'
                className='border border-secondary-500 dark:border-secondary-400'
                href='#current-members'
                icon={<span className='text-secondary-500 dark:text-secondary-400 text-xl'>+</span>}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Stats Section */}
      <div className='bg-white dark:bg-dark-background py-12'>
        <div className='mx-auto max-w-7xl px-4 sm:px-6 lg:px-8'>
          <div className='rounded-3xl py-20 px-8 bg-secondary-200 dark:bg-dark-card'>
            <div className='grid grid-cols-1 md:grid-cols-2 gap-12 text-center text-gray-900 dark:text-white'>
              <div className='flex flex-col items-center'>
                <div className='bg-white/40 dark:bg-white/10 rounded-full p-4 mb-4'>
                  <IconUsersGroup className='w-12 h-12 text-gray-900 dark:text-white' />
                </div>
                <div className='text-5xl font-bold mb-2'>10+</div>
                <div className='text-xl font-medium opacity-90'>Active members</div>
              </div>
              <div className='flex flex-col items-center'>
                <div className='bg-white/40 dark:bg-white/10 rounded-full p-4 mb-4'>
                  <IconUsersGroup className='w-12 h-12 text-gray-900 dark:text-white' />
                </div>
                <div className='text-5xl font-bold mb-2'>100%</div>
                <div className='text-xl font-medium opacity-90'>Open Source</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Info Cards Section */}
      <div className='bg-white dark:bg-dark-background py-16 sm:py-20'>
        <div className='mx-auto max-w-7xl px-4 sm:px-6 lg:px-8'>
          <div className='grid grid-cols-1 md:grid-cols-3 gap-8'>
            {/* What is TSC Card */}
            <div className='bg-white dark:bg-dark-card rounded-2xl p-8 border border-gray-200 dark:border-gray-700 shadow-md hover:shadow-xl transition-shadow'>
              <div className='flex items-center justify-center w-14 h-14 rounded-full bg-purple-100 dark:bg-purple-900/30 mb-6'>
                <IconUsersGroup className='w-8 h-8 text-purple-600 dark:text-purple-400' />
              </div>
              <h3 className='text-xl font-bold text-gray-900 dark:text-white mb-4'>What is TSC?</h3>
              <p className='text-gray-600 dark:text-gray-400 leading-relaxed'>
                The Technical Steering Committee (TSC) is responsible for the oversight of the AsyncAPI Initiative.
                Maintainers take committee seats decisions on the direction of the project, including releases,
                contribution policies, and other strategic matters.
              </p>
            </div>

            {/* How to Become a Member Card */}
            <div className='bg-white dark:bg-dark-card rounded-2xl p-8 border border-gray-200 dark:border-gray-700 shadow-md hover:shadow-xl transition-shadow'>
              <div className='flex items-center justify-center w-14 h-14 rounded-full bg-purple-100 dark:bg-purple-900/30 mb-6'>
                <IconArrowRight className='w-8 h-8 text-purple-600 dark:text-purple-400' />
              </div>
              <h3 className='text-xl font-bold text-gray-900 dark:text-white mb-4'>How to become a member?</h3>
              <p className='text-gray-600 dark:text-gray-400 leading-relaxed'>
                Anybody can become a maintainer of the TSC. All you have to do is become a maintainer of one of the
                AsyncAPI projects. To become a maintainer, you need to be nominated by a TSC member and then other
                maintainers will make a vote.
              </p>
            </div>

            {/* Our Governance Model Card */}
            <div className='bg-white dark:bg-dark-card rounded-2xl p-8 border border-gray-200 dark:border-gray-700 shadow-md hover:shadow-xl transition-shadow'>
              <div className='flex items-center justify-center w-14 h-14 rounded-full bg-pink-100 dark:bg-pink-900/30 mb-6'>
                <IconDocument className='w-8 h-8 text-pink-600 dark:text-pink-400' />
              </div>
              <h3 className='text-xl font-bold text-gray-900 dark:text-white mb-4'>Our governance model</h3>
              <p className='text-gray-600 dark:text-gray-400 leading-relaxed'>
                AsyncAPI Initiative runs under an Open Governance Model with its technical project and community assets
                under a neutral home, with an independent board of directors representing a cross-section.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Newsletter Subscription Section */}
      <div className='bg-white dark:bg-dark-background py-12'>
        <div className='mx-auto max-w-7xl px-4 sm:px-6 lg:px-8'>
          <div
            className='rounded-3xl p-8 sm:p-12 shadow-xl'
            style={{ background: 'linear-gradient(90deg, #5B4EFF 0%, #06b6d4 100%)' }}
          >
            <NewsletterSubscribe
              type='TSC Voting'
              title='Get notified when TSC is voting'
              subtitle="You'll receive an email whenever someone requests the TSC to vote"
              className='text-white'
            />
          </div>
        </div>
      </div>

      {/* Current TSC Members Section */}
      <div id='current-members' className='bg-white dark:bg-dark-background py-16 sm:py-20'>
        <div className='mx-auto max-w-7xl px-4 sm:px-6 lg:px-8'>
          <div className='text-center mb-12'>
            <h2 className='text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-4'>Current TSC Members</h2>
            <p className='text-gray-600 dark:text-gray-400 text-lg'>Meet our dedicated technical steering committee</p>
          </div>

          {/* Search and Filters */}
          <div className='mb-8 flex flex-col sm:flex-row gap-2 items-center justify-between'>
            <div className='w-full sm:w-auto sm:flex-1 max-w-md'>
              <input
                type='text'
                placeholder='Search members by name or GitHub handle...'
                value={searchTerm}
                onChange={(e) => {
                  setSearchTerm(e.target.value);
                  setCurrentPage(1);
                }}
                className='w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-dark-card text-gray-900 dark:text-white focus:ring-2 focus:ring-primary-500 focus:border-transparent'
              />
            </div>
            <div className='flex gap-2 flex-wrap'>
              <button
                onClick={() => {
                  setFilterType('all');
                  setCurrentPage(1);
                }}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                  filterType === 'all'
                    ? 'bg-primary-500 text-white'
                    : 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700'
                }`}
              >
                All
              </button>
              <button
                onClick={() => {
                  setFilterType('maintainer');
                  setCurrentPage(1);
                }}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                  filterType === 'maintainer'
                    ? 'bg-primary-500 text-white'
                    : 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700'
                }`}
              >
                Maintainer
              </button>
              <button
                onClick={() => {
                  setFilterType('available');
                  setCurrentPage(1);
                }}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                  filterType === 'available'
                    ? 'bg-primary-500 text-white'
                    : 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700'
                }`}
              >
                Available to hire
              </button>
              <button
                onClick={() => {
                  setFilterType('company');
                  setCurrentPage(1);
                }}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                  filterType === 'company'
                    ? 'bg-primary-500 text-white'
                    : 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700'
                }`}
              >
                Company
              </button>
            </div>
          </div>

          <p className='text-center text-gray-600 dark:text-gray-400 mb-8'>
            Showing {filteredMembers.length} of {tscMembers.length} members
          </p>

          {/* Members Grid */}
          {filteredMembers.length === 0 ? (
            <div className='text-center py-12'>
              <p className='text-gray-600 dark:text-gray-400 text-lg'>No members found for this filter</p>
            </div>
          ) : (
            <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-12'>
              {currentMembers.map((member) => (
                <TSCMemberCard key={member.github} member={member} />
              ))}
            </div>
          )}

          {/* Pagination */}
          <PaginationComponent
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={setCurrentPage}
            variant='compact'
          />
        </div>
      </div>

      {/* Want to Join TSC CTA */}
      <div className='bg-white dark:bg-dark-background py-12'>
        <div className='mx-auto max-w-7xl px-4 sm:px-6 lg:px-8'>
          <div
            className='rounded-3xl p-8 sm:p-12 shadow-xl text-center'
            style={{ background: 'linear-gradient(90deg, #8B5CF6 0%, #7C3AED 50%, #22D3EE 100%)' }}
          >
            <h2 className='text-3xl sm:text-4xl font-bold text-white mb-4'>Want to join TSC?</h2>
            <p className='text-lg text-white/90 mb-8'>Join our community and help shape the future of AsyncAPI</p>
            <Button
              text='Get Started'
              href={COMMUNITY_URLS.GITHUB.CONTRIBUTING}
              target='_blank'
              className='text-center bg-white text-primary-600 hover:bg-gray-100 focus:outline-none'
            />
          </div>
        </div>
      </div>
    </GenericLayout>
  );
}
