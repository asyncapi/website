import Link from 'next/link';
import type { MDXRemoteSerializeResult } from 'next-mdx-remote';
import { MDXRemote } from 'next-mdx-remote';
import { serialize } from 'next-mdx-remote/serialize';
import React from 'react';

import { readYamlFile } from '@/components/helpers/read-yaml-file';
import type { ICaseStudy } from '@/types/post';
import { HeadingTypeStyle } from '@/types/typography/Heading';

import CaseTOC from '../../components/CaseTOC';
import GenericLayout from '../../components/layout/GenericLayout';
import { mdxComponents } from '../../components/MDX/MDX';
import Heading from '../../components/typography/Heading';
import CaseStudiesList from '../../config/case-studies.json';
import { generateCaseStudyContent } from '../../utils/staticHelpers';

interface IndexProps {
  casestudy: ICaseStudy;
  challenges: MDXRemoteSerializeResult;
  solution: MDXRemoteSerializeResult;
  usecase: MDXRemoteSerializeResult;
  architecture: MDXRemoteSerializeResult;
  testing: MDXRemoteSerializeResult;
  codegen: MDXRemoteSerializeResult;
  schemaStorage: MDXRemoteSerializeResult;
  registry: MDXRemoteSerializeResult;
  versioning: MDXRemoteSerializeResult;
  validation: MDXRemoteSerializeResult;
  asyncapiStorage: MDXRemoteSerializeResult;
  asyncapiEditing: MDXRemoteSerializeResult;
  asyncapiExtensions: MDXRemoteSerializeResult;
  asyncapiDocumentation: MDXRemoteSerializeResult;
  asyncapiBindings: MDXRemoteSerializeResult;
  asyncapiTools: MDXRemoteSerializeResult;
  additionalResources: MDXRemoteSerializeResult;
  fullExample: MDXRemoteSerializeResult;
}

const renderContent = (
  content: any[],
  allComponents: Record<string, React.ComponentType<any>>,
  level: number
): React.JSX.Element[] => {
  let typeStyle;

  if (level === 0) {
    typeStyle = HeadingTypeStyle.lg;
  } else if (level === 1) {
    typeStyle = HeadingTypeStyle.md;
  } else {
    typeStyle = HeadingTypeStyle.sm;
  }

  return content.map((item) => {
    return (
      <div className='mt-10' key={item.title}>
        <Heading
          typeStyle={typeStyle}
          className='mt-8'
          id={item.title
            .replace(/<|>|"|\\|\/|=/gi, '')
            .replace(/\s/gi, '-')
            .toLowerCase()}
        >
          {item.title}
        </Heading>
        {item.content && (
          <div className='my-4'>
            <MDXRemote {...item.content} components={allComponents} />
          </div>
        )}
        {item.items && (
          <div className='mt-4 items-center'>
            <div className='flex flex-wrap gap-2'>
              {item.items.map((subItem: string) => (
                <span
                  key={subItem}
                  className='rounded-md border border-green-600 bg-green-100 p-1 text-center text-xs text-green-600 '
                >
                  {subItem}
                </span>
              ))}
            </div>
            {item.children && renderContent(item.children, allComponents, level + 1)}
          </div>
        )}
      </div>
    );
  });
};

/**
 * @description Fetches static props for the page.
 * @param {object} params - Parameters object containing the id.
 * @param {string} params.id - The id of the case study..
 */
export async function getStaticProps({ params }: { params: { id: string } }) {
  const data = CaseStudiesList.filter((p: { id: string }) => p.id === params.id);
  const asyncApiDoc = await readYamlFile(data[0].asyncapi.fullExample);

  return {
    props: {
      casestudy: data[0],
      challenges: await serialize(data[0].challenges),
      solution: await serialize(data[0].solution),
      usecase: await serialize(data[0].asyncapi.usecase),
      architecture: await serialize(data[0].technical.architecture),
      testing: await serialize(data[0].technical.testing),
      codegen: await serialize(data[0].technical.codegen),
      schemaStorage: await serialize(data[0].schemas.storage),
      registry: await serialize(data[0].schemas.registry),
      versioning: await serialize(data[0].schemas.versioning),
      validation: await serialize(data[0].schemas.validation),
      asyncapiStorage: await serialize(data[0].asyncapi.storage),
      asyncapiEditing: await serialize(data[0].asyncapi.editing),
      asyncapiExtensions: await serialize(data[0].asyncapi.extensions),
      asyncapiDocumentation: await serialize(data[0].asyncapi.documentation),
      asyncapiBindings: await serialize(data[0].asyncapi.bindings),
      asyncapiTools: await serialize(data[0].asyncapi.tools),
      fullExample: await serialize(asyncApiDoc),
      additionalResources: await serialize(data[0].additionalResources)
    }
  };
}

/**
 * @description Retrieves the static paths for the page.
 */
export async function getStaticPaths() {
  const paths = CaseStudiesList.map((study: { id: string }) => ({
    params: { id: study.id }
  }));

  return {
    paths,
    fallback: false
  };
}

const Index: React.FC<IndexProps> = ({
  casestudy,
  challenges,
  solution,
  architecture,
  testing,
  codegen,
  usecase,
  schemaStorage,
  registry,
  versioning,
  validation,
  asyncapiStorage,
  asyncapiEditing,
  asyncapiExtensions,
  asyncapiDocumentation,
  asyncapiBindings,
  asyncapiTools,
  fullExample,
  additionalResources
}) => {
  const image = '/img/social/website-card.jpg';
  const allComponents = mdxComponents;
  const contacts = casestudy.company.contact;

  const content = generateCaseStudyContent({
    challenges,
    solution,
    usecase,
    architecture,
    testing,
    codegen,
    schemaStorage,
    registry,
    versioning,
    validation,
    asyncapiStorage,
    asyncapiEditing,
    asyncapiExtensions,
    asyncapiDocumentation,
    asyncapiBindings,
    asyncapiTools,
    additionalResources,
    fullExample,
    casestudy
  });

  return (
    <GenericLayout
      title='AsyncAPI Case Studies'
      description='The home for all case studies related to AsyncAPI.'
      image={image}
      hideBanner={false}
      wide
    >
      <div className='max-w-screen lg:flex lg:flex-row-reverse lg:justify-between'>
        <CaseTOC
          toc={content}
          cssBreakingPoint='lg'
          className='sticky top-20 mt-4 max-h-screen overflow-y-auto bg-blue-100 p-4 lg:top-24 lg:-mr-14 lg:mt-2 lg:max-h-(screen-16) lg:min-w-[265px] lg:max-w-72 lg:flex-1 lg:border-l lg:border-gray-200 lg:bg-transparent lg:pb-8 lg:pt-0'
        />
        <div className='case-study px-4 sm:px-6 lg:max-w-[812px] lg:flex-1 xl:max-w-5xl xl:px-0'>
          <div className='mt-10 flex flex-col items-center justify-between md:mt-20 md:flex-row'>
            <div className='w-full md:w-[65%]'>
              <Heading typeStyle={HeadingTypeStyle.xl} className='countdown-text-gradient'>
                {casestudy.company.name}
              </Heading>
              <div className='flex flex-wrap gap-1' id='Contacts'>
                {contacts.map((item, index) => (
                  <div key={index}>
                    <Heading typeStyle={HeadingTypeStyle.bodyLg}>
                      <Link
                        href={item.link}
                        className='text-md font-medium leading-5 text-gray-900 hover:underline'
                        target='_blank'
                      >
                        <span>
                          {item.name}
                          {index !== contacts.length - 1 && ', '}
                        </span>
                      </Link>
                    </Heading>
                  </div>
                ))}
              </div>
              <div className='mt-4 flex flex-wrap gap-2'>
                <span className='rounded-md border border-green-600 bg-green-100 p-1 text-center text-xs text-green-600 '>
                  Industry: {casestudy.company.industry}
                </span>
                <span className='rounded-md border border-green-600 bg-green-100 p-1 text-center text-xs text-green-600 '>
                  Customers: {casestudy.company.customers}
                </span>
                <span className='rounded-md border border-green-600 bg-green-100 p-1 text-center text-xs text-green-600 '>
                  Revenue: {casestudy.company.revenue}
                </span>
              </div>
              <div className='mt-10'>
                <Heading typeStyle={HeadingTypeStyle.bodyLg}>{casestudy.company.description}</Heading>
                <Heading className='mt-10' typeStyle={HeadingTypeStyle.bodyLg}>
                  tl;dr just go and have a look at
                  <Link
                    href={`/${casestudy.asyncapi.fullExample}`}
                    className='ml-2 font-medium text-secondary-500 underline transition duration-300 ease-in-out hover:text-gray-800'
                    target='_blank'
                  >
                    full production-used AsyncAPI document
                  </Link>
                </Heading>
              </div>
            </div>
            <img
              src={casestudy.company.logo}
              alt={casestudy.company.name}
              className='mx-auto mt-5 w-[250px] rounded-lg md:mt-0'
            />
          </div>
          {renderContent(content, allComponents, 0)}
        </div>
      </div>
    </GenericLayout>
  );
};

export default Index;
