import GenericLayout from '../../components/layout/GenericLayout';
import GithubButton from '../../components/buttons/GithubButton';

import {
  DocumentAddIcon,
  BadgeCheckIcon,
  GlobeIcon,
  CodeIcon,
} from '@heroicons/react/outline';

import CodeBlock from '../../components/editor/CodeBlock';
import Heading from '../../components/typography/Heading';
import Paragraph from '../../components/typography/Paragraph';

const features = [
  {
    name: 'New files',
    description: () =>
      'Use the CLI tool to quickly create new AsyncAPI files. Select from a range of templates (MQTT, WebSockets, Kafka, and more.)',
    icon: DocumentAddIcon,
  },
  {
    name: 'Validate',
    description: () =>
      'Validate your AsyncAPI documents with the CLI. Quickly get feedback to verify your AsyncAPI document is within the correct format.',
    icon: BadgeCheckIcon,
  },
  {
    name: 'Open Studio',
    // eslint-disable-next-line react/display-name
    description: () => (
      <>
        Got an AsyncAPI file locally? Run{' '}
        <code className=" px-1 py-0.5 bg-gray-200 text-gray-900 rounded font-mono text-sm">
          asyncapi start studio
        </code>{' '}
        to open our studio in seconds.
      </>
    ),
    icon: CodeIcon,
  },
  {
    name: 'Open Source',
    description: () =>
      'All our tools are open source, feel free to contribute new commands or help evolve our existing ones.',
    icon: GlobeIcon,
  },
];

export default function CliPage() {
  function renderButtons() {
    return (
      <div className="mt-8">
        <GithubButton
          className="block mt-2 md:mt-0 md:inline-block w-full sm:w-auto"
          href="https://www.github.com/asyncapi/cli"
        />
      </div>
    );
  }

  const description =
    'Create, validate, and explore your AsyncAPI files with our CLI tool.';
  const image = '/img/social/generator.png';

  return (
    <GenericLayout title="CLI" description={description} image={image} wide>
      <div className="py-12 overflow-hidden">
        <div className="relative max-w-xl mx-auto px-4 sm:px-6 lg:px-8 lg:max-w-screen-xl">
          <div className="relative">
            <Heading level="h1" typeStyle="heading-lg" className="text-center">
              <span className="hidden md:block">
                Interact with AsyncAPI from the comfort of your CLI
              </span>
              <span className="md:hidden">AsyncAPI CLI</span>
            </Heading>
            <Paragraph className="mt-4 max-w-3xl mx-auto text-center">
              {description}
            </Paragraph>
          </div>

          <div className="relative mt-12 lg:mt-20 lg:grid lg:grid-cols-2 lg:gap-8 lg:items-center">
            <div className="relative lg:mt-8">
              <Heading level="h4" typeStyle="heading-md-semibold">
                Installation & Usage
              </Heading>
              <Paragraph className="mt-3 lg:pr-4">
                Start using AsyncAPI CLI within seconds by selecting one of our
                commands to get started.
              </Paragraph>
              {renderButtons()}
            </div>

            <div className="relative max-w-full mt-8 mx-auto space-y-10">
              <div>
                <Heading level="h3" typeStyle="heading-sm-semibold" className="mb-4 text-center md:text-left">
                  Installing
                </Heading>
                <CodeBlock
                  language="generator-cli"
                  textSizeClassName="text-sm"
                  className="shadow-lg"
                  codeBlocks={[
                    {
                      language: 'npm',
                      code: `npm install -g @asyncapi/cli`,
                    },
                  ]}
                />
              </div>

              <div>
                <Heading level="h3" typeStyle="heading-sm-semibold" className="text-center md:text-left">
                  Example
                </Heading>
                <div className="space-y-5">
                  <div>
                    <Paragraph typeStyle="body-md" className="mb-4">
                      Create a new AsyncAPI file
                    </Paragraph>
                    <CodeBlock
                      language="generator-cli"
                      textSizeClassName="text-sm"
                      className="shadow-lg"
                      codeBlocks={[
                        {
                          language: 'npm',
                          code: `asyncapi new`,
                        },
                      ]}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="lg:py-12 bg-white mt-20">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="text-center mb-16">
                <Heading level="h2" typeStyle="heading-md-semibold">
                  Features
                </Heading>
                <Paragraph className="mt-3 text-center lg:pr-4 max-w-lg mx-auto">
                  Use the AsyncAPI CLI tool to help you create, develop, and
                  maintain your AsyncAPI files.
                </Paragraph>
              </div>

              <div className="mt-10">
                <dl className=" md:grid lg:grid-cols-2 lg:space-y-0">
                  {features.map(({ description: Description, ...feature }) => (
                    <div key={feature.name} className="relative mb-10">
                      <dt>
                        <div className="absolute flex items-center justify-center h-12 w-12 rounded-md bg-secondary-100 text-gray-900 border border-gray-900">
                          <feature.icon
                            className="h-6 w-6"
                            aria-hidden="true"
                          />
                        </div>
                        <Heading level="h4" typeStyle="heading-sm-semibold" className="ml-16">
                          {feature.name} 
                        </Heading>
                      </dt>
                      <dd className="mt-2 ml-16 pr-10">
                        <Paragraph typeStyle="body-md">
                          <Description />
                        </Paragraph>
                      </dd>
                    </div>
                  ))}
                </dl>
              </div>
            </div>
          </div>
          <div className="mt-16 text-center">{renderButtons()}</div>
        </div>
      </div>
    </GenericLayout>
  );
}
