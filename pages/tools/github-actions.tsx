import React from 'react';

import { HeadingLevel, HeadingTypeStyle } from '@/types/typography/Heading';

import GithubButton from '../../components/buttons/GithubButton';
import CodeBlock from '../../components/editor/CodeBlock';
import GenericLayout from '../../components/layout/GenericLayout';
import Heading from '../../components/typography/Heading';
import Paragraph from '../../components/typography/Paragraph';

/**
 * @description Render the buttons for the Github Actions page.
 */
function renderButtons(): React.JSX.Element {
  return (
    <div className='mt-8'>
      {/* <Button
        text="Learn more"
        href="/docs/tools/github-actions"
        iconPosition="left"
        icon={<IconRocket className="inline-block w-6 h-6 -mt-1" />}
        className="w-full mb-2 sm:w-auto sm:mb-0 sm:mr-2"
      /> */}
      <GithubButton
        text='View on Github'
        className='w-full sm:w-auto'
        href='https://www.github.com/asyncapi/github-action-for-generator'
      />
    </div>
  );
}

/**
 * @description Get the code for the Github Actions page.
 */
function getCode() {
  return `name: AsyncAPI documents processing

on:
  push:
    branches: [ master ]

jobs:
  generate:
    runs-on: ubuntu-latest
    steps:
      - name: Checkout repo
        uses: actions/checkout@v2

      - name: Generating HTML from my AsyncAPI document
        uses: asyncapi/github-action-for-generator

      - name: Deploy GH page
        uses: JamesIves/github-pages-deploy-action
        with:
          ACCESS_TOKEN: \${{ secrets.GITHUB_TOKEN }}
          BRANCH: gh-pages
          FOLDER: generated-html`;
}

/**
 * @description The Github Actions page component.
 */
export default function GithubActionsPage() {
  const description = 'Generate docs and code on your GitHub Actions pipeline.';
  const image = '/img/social/githubactions-card.jpg';

  return (
    <GenericLayout title='GitHub Actions' description={description} image={image} wide>
      <div className='overflow-hidden py-12'>
        <div className='relative mx-auto max-w-xl px-4 sm:px-6 lg:max-w-screen-xl lg:px-8'>
          <div className='relative'>
            <Heading level={HeadingLevel.h1} typeStyle={HeadingTypeStyle.lg} className='text-center'>
              Automate using GitHub Actions
            </Heading>
            <Paragraph className='mx-auto mt-4 max-w-3xl text-center'>{description}</Paragraph>
          </div>

          <div className='relative mt-12 lg:mt-20 lg:grid lg:grid-cols-2 lg:items-center lg:gap-8'>
            <div className='relative mb-8 lg:mt-8'>
              <Heading level={HeadingLevel.h2} typeStyle={HeadingTypeStyle.mdSemibold}>
                Generate docs
              </Heading>
              <Paragraph className='mt-3 lg:pr-4'>
                Seamlessly integrate the docs generation process with your GitHub pipeline. Make sure your documentation
                is always up to date. It will be a gift to your team and your future self.
              </Paragraph>
              {renderButtons()}
            </div>

            <CodeBlock hasWindow textSizeClassName='text-sm'>
              {getCode()}
            </CodeBlock>
          </div>
        </div>
      </div>
    </GenericLayout>
  );
}
