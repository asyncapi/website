import dynamic from 'next/dynamic';
import React from 'react';

import { HeadingLevel, HeadingTypeStyle } from '@/types/typography/Heading';
import { ParagraphTypeStyle } from '@/types/typography/Paragraph';

import Button from '../../components/buttons/Button';
import GithubButton from '../../components/buttons/GithubButton';
import GeneratorInstallation from '../../components/GeneratorInstallation';
import IconCode from '../../components/icons/Code';
import IconDocuments from '../../components/icons/Documents';
import IconPowerPlug from '../../components/icons/PowerPlug';
import GenericLayout from '../../components/layout/GenericLayout';
import GeneratorDocsPreview from '../../components/tools/GeneratorDocsPreview';
import Heading from '../../components/typography/Heading';
import Paragraph from '../../components/typography/Paragraph';

const MermaidDiagram = dynamic(() => import('../../components/MDX/MermaidDiagram'), {
  ssr: false,
  loading: () => <div className='min-h-[280px]' />
});

const GENERATOR_DIAGRAM = `flowchart LR
  accTitle: Generator workflow
  accDescr: An AsyncAPI file is passed into the Generator, which produces HTML, Markdown, Node.js, and Java SpringBoot.
  spec@{ shape: doc, label: "AsyncAPI.yml" }
  gen{Generator}
  html[HTML]
  md[Markdown]
  nodejs["Node.js"]
  java["Java SpringBoot"]
  spec --> gen
  gen --> html
  gen --> md
  gen --> nodejs
  gen --> java`;

const featureIconClassName =
  'flex size-12 items-center justify-center rounded-md border border-gray-900 bg-secondary-100 text-gray-900 dark:border-dark-text dark:bg-dark-card dark:text-dark-heading';

/**
 * @description Render the buttons for the Generator page.
 * @param {boolean} centered - Whether to center the buttons (default: false)
 */
function renderButtons(centered: boolean = false): React.JSX.Element {
  const justifyClass = centered ? 'md:justify-center' : 'lg:justify-start';
  const buttonTextAlign = centered ? 'text-center md:w-auto' : 'text-center md:w-auto md:text-left';

  return (
    <div className={`mt-8 flex flex-col gap-4 md:flex-row md:flex-wrap ${justifyClass}`}>
      <GithubButton
        text='View on Github'
        className={`w-full ${buttonTextAlign}`}
        href='https://www.github.com/asyncapi/generator'
      />
      <Button text='View Docs' href='/docs/tools/generator' className={`w-full ${buttonTextAlign}`} />
    </div>
  );
}

/**
 * @description The Generator page component.
 */
export default function GeneratorPage() {
  const description = 'Generate documentation, code, and more out of your AsyncAPI files with the Generator.';
  const image = '/img/social/generator-card.jpg';

  return (
    <GenericLayout title='Generator' description={description} image={image} wide>
      <div className='overflow-hidden py-12'>
        <div className='relative mx-auto max-w-xl px-4 sm:px-6 lg:max-w-screen-xl lg:px-8'>
          <div className='relative text-center'>
            <Heading level={HeadingLevel.h1} typeStyle={HeadingTypeStyle.lg}>
              Docs, Code, Anything!
            </Heading>
            <Paragraph className='mt-4'>{description}</Paragraph>
            <div
              className='mx-auto mt-8 max-w-4xl [&_svg]:mx-auto [&_svg]:h-auto [&_svg]:max-w-full'
              aria-label='generator diagram'
            >
              <MermaidDiagram graph={GENERATOR_DIAGRAM} />
            </div>
          </div>

          <div className='relative mt-12 lg:mt-20 lg:grid lg:grid-cols-2 lg:items-center lg:gap-8'>
            <div className='relative lg:mt-8'>
              <Heading level={HeadingLevel.h2} typeStyle={HeadingTypeStyle.mdSemibold}>
                Installation & Usage
              </Heading>
              <Paragraph className='mt-3 lg:pr-4'>
                Start using Generator really quickly. Select one of the multiple templates we offer and start generating
                documentation and code in a few seconds.
              </Paragraph>
              {renderButtons()}
            </div>

            <GeneratorInstallation />

            <div className='relative mt-20'>
              <Heading level={HeadingLevel.h2} typeStyle={HeadingTypeStyle.mdSemibold}>
                Ready to use
              </Heading>
              <Paragraph className='mt-3 lg:pr-4'>
                The Generator is our solution to automatically generate documentation and code from your AsyncAPI files.
                It comes packed with lots of cool features you can&apos;t miss. Have a look!
              </Paragraph>

              <ul className='mt-10 lg:pr-4'>
                <li>
                  <div className='flex'>
                    <div className='shrink-0'>
                      <div className={featureIconClassName}>
                        <IconDocuments className='size-6' />
                      </div>
                    </div>
                    <div className='ml-4'>
                      {/* <Heading level="h4" typeStyle="heading-sm-semibold"> */}
                      <Heading level={HeadingLevel.h4} typeStyle={HeadingTypeStyle.smSemibold}>
                        HTML &amp; Markdown
                      </Heading>
                      <Paragraph typeStyle={ParagraphTypeStyle.md} className='mt-2'>
                        Generate beautiful HTML documentation that&apos;s easy to share with your team and customers.
                        Markdown docs that will seat along with your code? Perfect!
                      </Paragraph>
                    </div>
                  </div>
                </li>
                <li className='mt-10'>
                  <div className='flex'>
                    <div className='shrink-0'>
                      <div className={featureIconClassName}>
                        <IconCode className='size-6' />
                      </div>
                    </div>
                    <div className='ml-4'>
                      <Heading level={HeadingLevel.h4} typeStyle={HeadingTypeStyle.smSemibold}>
                        Node.js, Java, Python, and more...
                      </Heading>
                      <Paragraph typeStyle={ParagraphTypeStyle.md} className='mt-2'>
                        Generate code out of your AsyncAPI files in your favourite programming language. Speed up the
                        time-to-first-prototype. Keep using it even after you wrote your custom business logic.
                      </Paragraph>
                    </div>
                  </div>
                </li>
                <li className='mt-10'>
                  <div className='flex'>
                    <div className='shrink-0'>
                      <div className={featureIconClassName}>
                        <IconPowerPlug className='size-6' />
                      </div>
                    </div>
                    <div className='ml-4'>
                      <Heading level={HeadingLevel.h4} typeStyle={HeadingTypeStyle.smSemibold}>
                        Highly extensible
                      </Heading>
                      <Paragraph typeStyle={ParagraphTypeStyle.md} className='mt-2'>
                        Don&apos;t see your programming language of choice? Want to generate docs that meet your brand
                        look and feel? Create your custom templates or extend existing ones.
                      </Paragraph>
                    </div>
                  </div>
                </li>
              </ul>
            </div>
            <div className='relative mt-10 lg:mt-0'>
              <GeneratorDocsPreview />
            </div>
          </div>
          <div className='mt-16 text-center'>{renderButtons(true)}</div>
        </div>
      </div>
    </GenericLayout>
  );
}
