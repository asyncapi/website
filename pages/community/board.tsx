import CommunityLayout, { Membership } from '@/components/layout/CommunityLayout';
import TextLink from '@/components/typography/TextLink';

/**
 * @description This function returns the Board component.
 */
export default function Board() {
  return (
    <CommunityLayout membership={Membership.BOARD}>
      <div className='mx-auto my-0 grid max-w-xl lg:max-w-screen-xl lg:grid-cols-3 lg:gap-8' data-testid='GB-content'>
        <div>
          <h3 className='text-primary-800 mb-2 font-semibold lg:text-center lg:text-2xl'>
            What is the Governance Board?
          </h3>
          <p className='my-4 text-base text-gray-500 lg:text-center'>
            The Governance Board (GB) is responsible for ensuring organizational health, strategic continuity, and legal
            and financial oversight of the AsyncAPI Initiative. While the TSC oversees technical direction, the GB
            focuses on governance, community safety, sustainability, and stewardship in alignment with the{' '}
            <a
              href='https://github.com/asyncapi/community/blob/master/docs/020-governance-and-policies/CHARTER.md'
              className='text-blue-500 hover:text-blue-400'
              target='_blank'
              rel='noopener noreferrer'
            >
              Charter
            </a>
            .
          </p>
        </div>
        <div>
          <h3 className='text-primary-800 mb-2 font-semibold lg:text-center lg:text-2xl'>
            How can I become a Board Member?
          </h3>
          <p className='my-4 text-base text-gray-500 lg:text-center'>
            To become a member of the Governance Board, you must first be a part of the Technical Steering Committee
            (TSC), which requires being an Ambassador or Maintainer. Board members are elected through a
            community-driven voting process held every 12 months. Learn more about the eligibility and election cycle on
            our{' '}
            <TextLink
              href='https://github.com/asyncapi/community/blob/master/GOVERNANCE.md'
              target='_blank'
              className='font-normal text-base text-blue-500 no-underline hover:text-sky-400'
            >
              governance file
            </TextLink>
            .
          </p>
        </div>
        <div>
          <h3 className='text-primary-800 mb-2 font-semibold lg:text-center lg:text-2xl'>
            What are the responsibilities of a board member?
          </h3>
          <p className='my-4 text-base text-gray-500 lg:text-center'>
            GB members guide AsyncAPI’s financial strategy, sponsorships, hiring, and service access management. They
            also help sustain an inclusive and safe environment. All major proposals require TSC approval, ensuring a
            balanced and collaborative governance model. See the{' '}
            <a
              href='https://github.com/asyncapi/community/blob/master/GOVERNANCE.md#duties-and-responsibilities'
              className='text-blue-500 hover:text-blue-400'
              target='_blank'
              rel='noopener noreferrer'
            >
              governance document
            </a>{' '}
            for more details.
          </p>
        </div>
      </div>
    </CommunityLayout>
  );
}
