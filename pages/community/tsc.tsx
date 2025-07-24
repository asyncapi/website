import CommunityLayout, { Membership } from '@/components/layout/CommunityLayout';
import TextLink from '@/components/typography/TextLink';

/**
 * @description This function returns the TSC component.
 */
export default function TSC() {
  return (
    <CommunityLayout membership={Membership.TSC}>
      <div className='mx-auto my-0 grid max-w-xl lg:max-w-screen-xl lg:grid-cols-3 lg:gap-8' data-testid='TSC-content'>
        <div>
          <h3 className='text-primary-800  mb-2 font-semibold lg:text-center lg:text-2xl'>What is a TSC?</h3>
          <p className='my-4 text-base text-gray-500 lg:text-center'>
            The Technical Steering Committee (TSC) is responsible for the oversight of the AsyncAPI Initiative.
            Maintainers (aka committers) make decisions at the given repository/project level. The TSC helps to make
            decisions on a higher level, or when maintainers cannot find a consensus.
          </p>
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
              href='https://github.com/asyncapi/community/blob/master/TSC_MEMBERSHIP.md'
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
              href='https://github.com/asyncapi/community/blob/master/CHARTER.md'
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
        </div>
      </div>
    </CommunityLayout>
  );
}
