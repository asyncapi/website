import React from 'react';

import { HeadingLevel, HeadingTypeStyle } from '@/types/typography/Heading';

import GithubButton from '../../components/buttons/GithubButton';
import CodeBlock from '../../components/editor/CodeBlock';
import GenericLayout from '../../components/layout/GenericLayout';
import Heading from '../../components/typography/Heading';
import Paragraph from '../../components/typography/Paragraph';

/**
 * @description The initial code for the Parsers page.
 */
function getCode() {
  return `import { parse } from '@asyncapi/parser'

const doc = await parse(\`
asyncapi: '3.0.0'
info:
  title: Example
  version: '1.0.0'
channels:
  example:
    address: example-channel
    messages:
      example:
        payload:
          type: object
          properties:
            exampleField:
              type: string
            exampleNumber:
              type: number
            exampleDate:
              type: string
              format: date-time
operations:
  example:
    action: send
    channel:
      $ref: '#/channels/example'
\`)

console.log(doc.info().title())
// => Example`;
}

/**
 * @description Render the buttons for the Parsers page.
 */
function renderButtons(): React.JSX.Element {
  return (
    <div className='mt-8'>
      {/* <Button
        text="Learn more"
        href="/docs/tools/parser-js"
        iconPosition="left"
        icon={<IconRocket className="inline-block w-6 h-6 -mt-1" />}
        className="w-full mb-2 sm:w-auto sm:mb-0 sm:mr-2"
      /> */}
      <GithubButton
        text='View on Github'
        className='w-full sm:w-auto'
        href='https://www.github.com/asyncapi/parser-js'
      />
    </div>
  );
}

/**
 * @description The Parsers page component.
 */
export default function ParsersPage() {
  const description = 'Use our parsers to build your own tools or add AsyncAPI support to your product.';
  const image = '/img/social/parsers-card.jpg';

  return (
    <GenericLayout title='Parsers' description={description} image={image} wide>
      <div className='overflow-hidden py-12'>
        <div className='relative mx-auto max-w-xl px-4 sm:px-6 lg:max-w-screen-xl lg:px-8'>
          <div className='relative'>
            <Heading level={HeadingLevel.h1} typeStyle={HeadingTypeStyle.lg} className='text-center'>
              Build your own tools
            </Heading>
            <Paragraph className='mx-auto mt-4 max-w-3xl text-center'>{description}</Paragraph>
          </div>

          <div className='relative mt-12 lg:mt-20 lg:grid lg:grid-cols-2 lg:items-center lg:gap-8'>
            <div className='relative mb-8 lg:mt-8'>
              <Heading level={HeadingLevel.h2} typeStyle={HeadingTypeStyle.mdSemibold}>
                JavaScript parser
              </Heading>
              <Paragraph className='mt-3 lg:pr-4'>
                Parse AsyncAPI documents in your JavaScript tooling and products. It works on <strong>Node.js</strong>{' '}
                and <strong>browsers</strong>.
              </Paragraph>
              <CodeBlock language='bash' showLineNumbers={false} className='mt-8' textSizeClassName='text-sm'>
                npm install @asyncapi/parser
              </CodeBlock>
              {renderButtons()}
            </div>

            <CodeBlock language='javascript' hasWindow textSizeClassName='text-sm'>
              {getCode()}
            </CodeBlock>
          </div>
        </div>
      </div>
    </GenericLayout>
  );
}
