import GenericLayout from '../../components/layout/GenericLayout';
import GithubButton from '../../components/buttons/GithubButton';

import {
  DocumentAddIcon,
  BadgeCheckIcon,
  GlobeIcon,
  CodeIcon,
} from '@heroicons/react/outline';

import CodeBlock from '../../components/editor/CodeBlock';

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
        <code className=" px-1 py-0.5 bg-primary-700 text-white rounded font-mono text-sm">
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
            <h3 className="text-center text-3xl leading-8 font-normal tracking-tight text-gray-900 sm:text-4xl sm:leading-10">
              <span className="hidden md:block">
                Interact with AsyncAPI from the comfort of your CLI
              </span>
              <span className="md:hidden">AsyncAPI CLI</span>
            </h3>
            <p className="mt-4 max-w-3xl mx-auto text-center text-lg md:text-xl leading-7 text-gray-500">
              {description}
            </p>
          </div>

          <div className="relative mt-12 lg:mt-20 lg:grid lg:grid-cols-2 lg:gap-8 lg:items-center">
            <div className="relative lg:mt-8">
              <h4 className="text-xl md:text-2xl leading-8 font-normal text-gray-900 tracking-tight sm:text-3xl sm:leading-9">
                Installation & Usage
              </h4>
              <p className="mt-3 text-lg leading-7 text-gray-500 lg:pr-4">
                Start using AsyncAPI CLI within seconds by selecting one of our
                commands to get started.
              </p>
              {renderButtons()}
            </div>

            <div className="relative max-w-full mt-8 mx-auto space-y-10">
              <div>
                <h3 className="mb-4 text-sm font-semibold text-center md:text-left">
                  Installing
                </h3>
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
                <h3 className="mb-4 text-sm font-semibold text-center md:text-left">
                  Example
                </h3>
                <div className="space-y-5">
                  <div>
                    <h4 className="text-xs">Create a new AsyncAPI file</h4>
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
                <h4 className="text-2xl leading-8 font-normal text-gray-900 tracking-tight sm:text-3xl sm:leading-9 ">
                  Features
                </h4>
                <p className="mt-3 text-lg leading-7 text-gray-500 lg:pr-4 text-center">
                  Use the AsyncAPI CLI tool to help you create, develop, and
                  maintain your AsyncAPI files.
                </p>
              </div>

              <div className="mt-10">
                <dl className=" md:grid lg:grid-cols-2 lg:space-y-0">
                  {features.map(({ description: Description, ...feature }) => (
                    <div key={feature.name} className="relative mb-10">
                      <dt>
                        <div className="absolute flex items-center justify-center h-12 w-12 rounded-md bg-primary-500 text-white">
                          <feature.icon
                            className="h-6 w-6"
                            aria-hidden="true"
                          />
                        </div>
                        <p className="ml-16 text-lg leading-6 font-medium text-gray-900">
                          {feature.name}
                        </p>
                      </dt>
                      <dd className="mt-2 ml-16 text-base text-gray-500 pr-10">
                        <Description />
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
