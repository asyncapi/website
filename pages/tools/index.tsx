import React from 'react';

import ToolsDashboard from '@/components/tools/ToolsDashboard';
import { HeadingLevel, HeadingTypeStyle } from '@/types/typography/Heading';

import GenericLayout from '../../components/layout/GenericLayout';
import Heading from '../../components/typography/Heading';
import Paragraph from '../../components/typography/Paragraph';
import TextLink from '../../components/typography/TextLink';
import ToolFilter from '../../context/ToolFilterContext';

/**
 * @description The Tools Index page component.
 */
export default function ToolsIndex() {
  const description = 'Tools Dashboard for AsyncAPI Initiative';
  const image = '/img/social/tools-dashboard-card.webp';

  return (
    <div>
      <GenericLayout title='Tools' description={description} image={image}>
        <div>
          <div className='mt-12 text-center'>
            <Heading level={HeadingLevel.h1} typeStyle={HeadingTypeStyle.lg}>
              AsyncAPI Tools Dashboard
            </Heading>
            <Paragraph className='mx-auto my-3 max-w-2xl sm:mt-4'>
              Discover various AsyncAPI tools to optimize your journey! These tools are made by the community, for the
              community. Have an AsyncAPI tool you want to be featured on this list? Then follow the procedure given in
              the
              <TextLink
                href='https://github.com/asyncapi/community/blob/master/new-tool-documentation.md'
                target='_blank'
              >
                Tool Documentation
              </TextLink>{' '}
              file, and show up your AsyncAPI Tool card in the website.
            </Paragraph>
          </div>
          <ToolFilter>
            <ToolsDashboard />
          </ToolFilter>
        </div>
      </GenericLayout>
    </div>
  );
}
