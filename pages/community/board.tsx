import { sortBy } from 'lodash';

import type { Tsc } from '@/types/pages/community/Community';

import Button from '../../components/buttons/Button';
import TSCMemberCard from '../../components/community/TSCMemberCard';
import IconArrowRight from '../../components/icons/ArrowRight';
import IconDocument from '../../components/icons/Document';
import IconUsersGroup from '../../components/icons/UsersGroup';
import GenericLayout from '../../components/layout/GenericLayout';
import ambassadorsList from '../../config/AMBASSADORS_MEMBERS.json';
import tscBoardList from '../../config/TSC_BOARD_MEMBERS.json';

const GOVERNANCE_URL =
  'https://github.com/asyncapi/community/blob/master/docs/020-governance-and-policies/GOVERNANCE.md';
const CHARTER_URL = 'https://github.com/asyncapi/community/blob/master/docs/020-governance-and-policies/CHARTER.md';
const DUTIES_URL = `${GOVERNANCE_URL}#duties-and-responsibilities`;

const ambassadorGitHubHandles = new Set(
  ambassadorsList.map((ambassador: { github?: string }) => ambassador.github?.toLowerCase())
);
const infoCardClassName =
  'bg-white dark:bg-dark-card rounded-2xl p-8 border border-gray-200 dark:border-gray-700 shadow-md hover:shadow-xl transition-shadow';
const infoLinkClassName = 'text-blue-500 hover:text-blue-600 dark:text-blue-400 dark:hover:text-blue-300';

/**
 * @description Add a display name when the member record only has a GitHub handle.
 * @param {Tsc} user - The user object having board data.
 */
function addAdditionalUserInfo(user: Tsc): Tsc {
  return {
    ...user,
    name: user.name || user.github
  };
}

/**
 * @description Governance Board page, using the same member cards and theme as the TSC page.
 */
export default function Board() {
  const boardMembers = sortBy(
    tscBoardList.map((user) => addAdditionalUserInfo(user as Tsc)),
    ['name']
  ).filter((user) => user.isBoardMember || user.isBoardChair);

  return (
    <GenericLayout
      title='Governance Board'
      description='Meet the current AsyncAPI Governance Board members and learn how you can become one.'
      image='/img/social/community.webp'
      wide
    >
      <div className='bg-white dark:bg-dark-background py-12 sm:py-16 lg:py-20'>
        <div className='mx-auto max-w-7xl px-4 sm:px-6 lg:px-8'>
          <div className='text-center'>
            <h1 className='text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-gray-900 dark:text-white mb-6'>
              Governance Board
            </h1>
            <p className='mx-auto max-w-3xl text-lg text-gray-600 dark:text-gray-400 mb-10'>
              Meet the members who look after AsyncAPI&apos;s organizational health, finances, and community safety,
              alongside the Technical Steering Committee.
            </p>
            <div className='flex flex-col sm:flex-row gap-4 justify-center items-center'>
              <Button
                text='Learn How to Join'
                href={GOVERNANCE_URL}
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

      <div className='bg-white dark:bg-dark-background pt-8 pb-16 sm:pt-10 sm:pb-20'>
        <div className='mx-auto max-w-7xl px-4 sm:px-6 lg:px-8'>
          <div className='grid grid-cols-1 md:grid-cols-3 gap-8' data-testid='GB-content'>
            <div className={infoCardClassName}>
              <div className='flex items-center justify-center w-14 h-14 rounded-full bg-purple-100 dark:bg-purple-900/30 mb-6'>
                <IconUsersGroup className='w-8 h-8 text-purple-600 dark:text-purple-400' />
              </div>
              <h3 className='text-xl font-bold text-gray-900 dark:text-white mb-4'>What is the Governance Board?</h3>
              <p className='text-gray-600 dark:text-gray-400 leading-relaxed'>
                The Governance Board (GB) is responsible for ensuring organizational health, strategic continuity, and
                legal and financial oversight of the AsyncAPI Initiative. While the TSC oversees technical direction,
                the GB focuses on governance, community safety, sustainability, and stewardship in alignment with the{' '}
                <a href={CHARTER_URL} className={infoLinkClassName} target='_blank' rel='noopener noreferrer'>
                  Charter
                </a>
                .
              </p>
            </div>

            <div className={infoCardClassName}>
              <div className='flex items-center justify-center w-14 h-14 rounded-full bg-purple-100 dark:bg-purple-900/30 mb-6'>
                <IconArrowRight className='w-8 h-8 text-purple-600 dark:text-purple-400' />
              </div>
              <h3 className='text-xl font-bold text-gray-900 dark:text-white mb-4'>How can I become a Board Member?</h3>
              <p className='text-gray-600 dark:text-gray-400 leading-relaxed'>
                To become a member of the Governance Board, you must first be a part of the Technical Steering Committee
                (TSC), which requires being an Ambassador or Maintainer. Board members are elected through a
                community-driven voting process held every 12 months. Learn more about the eligibility and election
                cycle on our{' '}
                <a href={GOVERNANCE_URL} className={infoLinkClassName} target='_blank' rel='noopener noreferrer'>
                  governance file
                </a>
                .
              </p>
            </div>

            <div className={infoCardClassName}>
              <div className='flex items-center justify-center w-14 h-14 rounded-full bg-purple-100 dark:bg-purple-900/30 mb-6'>
                <IconDocument className='w-8 h-8 text-purple-600 dark:text-purple-400' />
              </div>
              <h3 className='text-xl font-bold text-gray-900 dark:text-white mb-4'>
                What are the responsibilities of a board member?
              </h3>
              <p className='text-gray-600 dark:text-gray-400 leading-relaxed'>
                GB members guide AsyncAPI&apos;s financial strategy, sponsorships, hiring, and service access
                management. They also help sustain an inclusive and safe environment. All major proposals require TSC
                approval, ensuring a balanced and collaborative governance model. See the{' '}
                <a href={DUTIES_URL} className={infoLinkClassName} target='_blank' rel='noopener noreferrer'>
                  governance document
                </a>{' '}
                for more details.
              </p>
            </div>
          </div>
        </div>
      </div>

      <div id='current-members' className='bg-white dark:bg-dark-background py-16 sm:py-20'>
        <div className='mx-auto max-w-7xl px-4 sm:px-6 lg:px-8'>
          <div className='text-center mb-12'>
            <h2 className='text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-4'>
              Current Governance Board members
            </h2>
            <p className='text-gray-600 dark:text-gray-400 text-lg'>In alphabetical order</p>
          </div>
          <div data-testid='board-members' className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6'>
            {boardMembers.map((member) => (
              <TSCMemberCard
                key={member.github}
                member={member}
                isAmbassador={ambassadorGitHubHandles.has(member.github?.toLowerCase())}
                isChair={Boolean(member.isBoardChair)}
              />
            ))}
          </div>
        </div>
      </div>
    </GenericLayout>
  );
}
