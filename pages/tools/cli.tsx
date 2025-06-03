import { BadgeCheckIcon, CodeIcon, DocumentAddIcon, GlobeIcon } from '@heroicons/react/outline';
import React from 'react';

import { HeadingLevel, HeadingTypeStyle } from '@/types/typography/Heading';
import { ParagraphTypeStyle } from '@/types/typography/Paragraph';

import Button from '../../components/buttons/Button';
import GithubButton from '../../components/buttons/GithubButton';
import CodeBlock from '../../components/editor/CodeBlock';
import GenericLayout from '../../components/layout/GenericLayout';
import Heading from '../../components/typography/Heading';
import Paragraph from '../../components/typography/Paragraph';

const features = [
  {
    name: 'New files',
    description: () =>
      'Use the CLI tool to quickly create new AsyncAPI files. Select from a range of templates (MQTT, WebSockets, Kafka, and more.)',
    icon: DocumentAddIcon
  },
  {
    name: 'Validate',
    description: () =>
      'Validate your AsyncAPI documents with the CLI. Quickly get feedback to verify your AsyncAPI document is within the correct format.',
    icon: BadgeCheckIcon
  },
  {
    name: 'Open Studio',
    // eslint-disable-next-line react/display-name
    description: () => (
      <>
        Got an AsyncAPI file locally? Run{' '}
        <code className=' rounded bg-gray-200 px-1 py-0.5 font-mono text-sm text-gray-900'>asyncapi start studio</code>{' '}
        to open our studio in seconds.
      </>
    ),
    icon: CodeIcon
  },
  {
    name: 'Open Source',
    description: () =>
      'All our tools are open source, feel free to contribute new commands or help evolve our existing ones.',
    icon: GlobeIcon
  }
];

/**
 * @description Render the buttons for the CLI page.
 */
function renderButtons(): React.JSX.Element {
  return (
    <div className='mt-8'>
      <GithubButton
        text='View on Github'
        className='mt-2 block w-full sm:w-auto md:mt-0 md:inline-block'
        href='https://www.github.com/asyncapi/cli'
      />
      <Button
        text='View Docs'
        href='/docs/tools/cli'
        className='mt-2 block w-full sm:w-auto md:ml-2 md:mt-0 md:inline-block'
      />
    </div>
  );
}

/**
 * @description The CLI page component.
 */
export default function CliPage() {
  const description = 'Create, validate, and explore your AsyncAPI files with our CLI tool.';
  const image = '/img/social/cli-card.jpg';

  const getPkgCode = () => {
    return '# Download latest PKG file\ncurl -OL https://github.com/asyncapi/cli/releases/latest/download/asyncapi.pkg\n# Install application on MacOS\nsudo installer -pkg asyncapi.pkg -target /';
  };

  const setUpWin = () => {
    return '# Download latest asyncapi.x64.exe for 64-bit Windows\n https://github.com/asyncapi/cli/releases/latest/download/asyncapi.x64.exe\n# Download asyncapi.x86.exe for 32-bit Windows\n https://github.com/asyncapi/cli/releases/latest/download/asyncapi.x86.exe';
  };

  const setUpLinux = () => {
    return '# For Debian based distros, you can install the AsycAPI CLI using the dpkg package manager for Debian\ncurl -OL https://github.com/asyncapi/cli/releases/latest/download/asyncapi.deb\n# To download a specific release of the CLI, run this command in your terminal\ncurl -OL https://github.com/asyncapi/cli/releases/download/<replace this with the specific CLI version e.g v0.13.0>/asyncapi.deb /';
  };

  return (
    <GenericLayout title='CLI' description={description} image={image} wide>
      <div className='overflow-hidden py-12'>
        <div className='relative mx-auto max-w-xl px-4 sm:px-6 lg:max-w-screen-xl lg:px-8'>
          <div className='relative'>
            <Heading level={HeadingLevel.h1} typeStyle={HeadingTypeStyle.lg} className='text-center'>
              <span className='hidden md:block'>Interact with AsyncAPI from the comfort of your CLI</span>
              <span className='md:hidden'>AsyncAPI CLI</span>
            </Heading>
            <Paragraph className='mx-auto mt-4 max-w-3xl text-center'>{description}</Paragraph>
          </div>

          <div className='relative mt-12 lg:mt-20 lg:grid lg:grid-cols-2 lg:items-center lg:gap-8'>
            <div className='relative lg:mt-8'>
              <Heading level={HeadingLevel.h2} typeStyle={HeadingTypeStyle.mdSemibold}>
                Installation & Usage
              </Heading>
              <Paragraph className='mt-3 lg:pr-4'>
                Start using AsyncAPI CLI within seconds by selecting one of our commands to get started.
              </Paragraph>
              {renderButtons()}
            </div>

            <div className='relative mx-auto mt-8 w-full space-y-10'>
              <div>
                <Heading
                  level={HeadingLevel.h3}
                  typeStyle={HeadingTypeStyle.mdSemibold}
                  className='mb-4 text-center md:text-left'
                >
                  Installing
                </Heading>
                <CodeBlock
                  language='generator-cli'
                  textSizeClassName='text-sm'
                  className='shadow-lg'
                  codeBlocks={[
                    {
                      language: 'npm',
                      code: 'npm install -g @asyncapi/cli'
                    },
                    {
                      language: 'brew',
                      code: 'brew install asyncapi'
                    },
                    {
                      language: '.pkg',
                      code: getPkgCode()
                    },
                    {
                      language: 'windows',
                      code: setUpWin()
                    },
                    {
                      language: 'linux',
                      code: setUpLinux()
                    }
                  ]}
                />
              </div>

              <div>
                <Heading
                  level={HeadingLevel.h3}
                  typeStyle={HeadingTypeStyle.mdSemibold}
                  className='mb-4 text-center md:text-left'
                >
                  Example
                </Heading>
                <div className='space-y-5'>
                  <div>
                    <Paragraph typeStyle={ParagraphTypeStyle.md} className='mb-4'>
                      Create a new AsyncAPI file
                    </Paragraph>
                    <CodeBlock
                      language='generator-cli'
                      textSizeClassName='text-sm'
                      className='shadow-lg'
                      codeBlocks={[
                        {
                          language: 'npm',
                          code: 'asyncapi new file'
                        }
                      ]}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className='mt-20 bg-white lg:py-12'>
            <div className='mx-auto max-w-7xl px-4 sm:px-6 lg:px-8'>
              <div className='mb-16 text-center'>
                <Heading level={HeadingLevel.h2} typeStyle={HeadingTypeStyle.mdSemibold}>
                  Features
                </Heading>
                <Paragraph className='mx-auto mt-3 max-w-lg text-center lg:pr-4'>
                  Use the AsyncAPI CLI tool to help you create, develop, and maintain your AsyncAPI files.
                </Paragraph>
              </div>

              <div className='mt-10'>
                <dl className=' md:grid lg:grid-cols-2 lg:space-y-0'>
                  {features.map(({ description: Description, ...feature }) => (
                    <div key={feature.name} className='relative mb-10'>
                      <dt>
                        <div className='absolute flex size-12 items-center justify-center rounded-md border border-gray-900 bg-secondary-100 text-gray-900'>
                          <feature.icon className='size-6' aria-hidden='true' />
                        </div>
                        <Heading level={HeadingLevel.h4} typeStyle={HeadingTypeStyle.smSemibold} className='ml-16'>
                          {feature.name}
                        </Heading>
                      </dt>
                      <dd className='ml-16 mt-2 pr-10'>
                        <Paragraph typeStyle={ParagraphTypeStyle.md}>
                          <Description />
                        </Paragraph>
                      </dd>
                    </div>
                  ))}
                </dl>
              </div>
            </div>
          </div>
          <div className='mt-16 text-center'>{renderButtons()}</div>
        </div>
      </div>
    </GenericLayout>
  );
}
