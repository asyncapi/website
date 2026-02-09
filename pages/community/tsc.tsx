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
        <div>
          <h3 className='text-primary-800  mb-2 font-semibold lg:text-center lg:text-2xl'>
            How can I become a TSC member?
          </h3>
          <p className='my-4 text-base text-gray-500 lg:text-center'>
            Anybody can become a member of the TSC. All you have to do is become a maintainer of one of the AsyncAPI
            projects! To become a maintainer, you just need to regularly contribute to one of the projects and then
            other maintainers will invite you to join. You can also build a great AsyncAPI-based project that we
            don&apos;t have yet in our GitHub organization and donate it (we&apos;ll ask you to stay as a maintainer).
            Follow this
            <TextLink
              href='https://github.com/asyncapi/community/blob/master/docs/020-governance-and-policies/TSC_MEMBERSHIP.md'
              target='_blank'
              className='font-normal text-base text-blue-500 no-underline hover:text-sky-400'
            >
              Link
            </TextLink>
            &nbsp;to know more!
          </p>
        </div>
        <div>
          <h3 className='text-primary-800  mb-2 font-semibold lg:text-center lg:text-2xl'>Our governance model</h3>
          <p className='my-4 text-base text-gray-500 lg:text-center'>
            AsyncAPI Initiative runs under an{' '}
            <a
              data-testid='TSC-Governance-Link'
              href='https://github.com/asyncapi/community/blob/master/docs/020-governance-and-policies/CHARTER.md'
              className='text-blue-500 hover:text-blue-400'
            >
              Open Governance Model
            </a>{' '}
            that gives power to the people actively involved and working on the project. No matter if you are an
            individual contributor or backed by a company, you have equal rights. Read{' '}
            <a
              data-testid='TSC-Article-Link'
              href='https://www.asyncapi.com/blog/governance-motivation'
              className='text-blue-500 hover:text-blue-400'
            >
              this
            </a>{' '}
            article to learn more.
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
