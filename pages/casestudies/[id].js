import React from 'react';
import Link from 'next/link';
import Paragraph from '../../components/typography/Paragraph';
import GenericLayout from '../../components/layout/GenericLayout';
import Heading from '../../components/typography/Heading';
import CaseStudiesList from '../../config/case-studies.json';
import { MDXRemote } from 'next-mdx-remote';
import { getMDXComponents } from '../../components/MDX.js';
import { serialize } from 'next-mdx-remote/serialize'

export async function getStaticProps({ params }) {
  const data = CaseStudiesList.filter((p) => p.id === params.id);

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
      additionalResources: await serialize(data[0].additionalResources),
    },
  };
}

export async function getStaticPaths() {
  const paths = CaseStudiesList.map((study) => ({
    params: { id: study.id },
  }));
  return {
    paths,
    fallback: false,
  };
}


function Index({ 
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
  additionalResources
}) {
  const image = '/img/social/website-card.png';
  const allComponents = getMDXComponents();
  var contacts = casestudy.company.contact
  var languages= casestudy.technical.languages
  var frameworks=casestudy.technical.frameworks
  var protocols=casestudy.technical.protocols
  var versions=casestudy.asyncapi.versions 
  return (
    <GenericLayout
      title="AsyncAPI Case Studies"
      description="The home for all case studies related to AsyncAPI."
      image={image}
      hideBanner={true}
      wide
    >
    <div className="px-4 sm:px-6 xl:px-8 xl:flex-1 xl:max-w-5xl">
      <div className="mt-10 md:mt-20 flex flex-col md:flex-row justify-between items-center">
        <div className="w-full md:w-[65%]">
          <Heading typeStyle="heading-xl" className="countdown-text-gradient">
            {casestudy.company.name}
          </Heading>
          <div className='flex flex-wrap gap-1'>
              {contacts.map((item, index) => (
                <div key={index}>
                  <Heading typeStyle="body-lg">
                    <Link href={item.link}>
                      <a className="text-md leading-5 font-medium text-gray-900 
                      hover:underline" target="_blank">
                        {item.name}{index != contacts.length - 1 ? ', ' : ' '}
                      </a>
                    </Link>
                  </Heading>
                </div>)
              )}
            </div>
          <div className="mt-4 flex flex-wrap gap-2">
            <span className="bg-green-100 border border-green-600 text-green-600 p-1 text-center text-xs rounded-md ">
                Industry: {casestudy.company.industry}
            </span>
            <span className="bg-green-100 border border-green-600 text-green-600 p-1 text-center text-xs rounded-md ">
                Customers: {casestudy.company.customers}
            </span>
            <span className="bg-green-100 border border-green-600 text-green-600 p-1 text-center text-xs rounded-md ">
                Revenue: {casestudy.company.revenue}
            </span>
          </div>
          <div className="mt-10">
            <Heading typeStyle="body-lg">
                    {casestudy.company.description}
            </Heading>
            <Heading className="mt-10" typeStyle="body-lg">
                    tl;dr just go and have a look at
                    <Link href={'/'+casestudy.asyncapi.fullExample}>
                      <a className="ml-2 text-secondary-500 underline hover:text-gray-800 font-medium transition ease-in-out duration-300" target="_blank">
                        full production-used AsyncAPI document
                      </a>
                    </Link>
            </Heading>
          </div>
        </div>
        <div className="mt-10 md:mt-0">
          <img
            src={casestudy.company.logo}
            alt={casestudy.company.name}
            className="w-[350px] rounded-lg"
          />
        </div>
      </div>
      <div className="mt-10">
        <Heading typeStyle="heading-lg" className="mt-8">
            Challenges
        </Heading>
        <Paragraph typeStyle="body-md" className="my-4">
          <MDXRemote {...challenges} components={allComponents} />
        </Paragraph>
      </div>
      <div className="mt-10">
        <Heading typeStyle="heading-lg" className="mt-8">
            Solution
        </Heading>
        <Paragraph typeStyle="body-md" className="my-4">
          <MDXRemote {...solution} components={allComponents} />
        </Paragraph>
      </div>
      <div className="mt-10">
        <Heading typeStyle="heading-lg" className="mt-8">
            Use case
        </Heading>
        <Paragraph typeStyle="body-md" className="my-4">
          <MDXRemote {...usecase} components={allComponents} />
        </Paragraph>
      </div>
      <div className="mt-10">
        <Heading typeStyle="heading-lg" className="mt-8">
            More details
        </Heading>
        <div className="mt-4 items-center">
          <div className='flex flex-wrap gap-2'>
              <span className="flex flex-wrap gap-1  bg-green-100 border border-green-600 text-green-600 p-1 text-center text-xs rounded-md ">
            Languages:
            {languages.map((item, index) => (
                <div key={index}>
                        {item}{index != languages.length - 1 ? ', ' : ' '} 
                </div>)
              )}
          </span>
          <span className="flex flex-wrap gap-1 bg-green-100 border border-green-600 text-green-600 p-1 text-center text-xs rounded-md ">
            Frameworks: {frameworks.map((item, index) => (
                <div key={index}>
                        {item}{index != frameworks.length - 1 ? ', ' : ' '} 
                </div>)
              )}
          </span>
          <span className="flex flex-wrap gap-1 bg-green-100 border border-green-600 text-green-600 p-1 text-center text-xs rounded-md ">
            Protocols:  {protocols.map((item, index) => (
                <div key={index}>
                        {item}{index != protocols.length - 1 ? ', ' : ' '} 
                </div>)
              )}
          </span>
          </div>
          <div className="mt-10">
            <Heading typeStyle="heading-md" className="mt-8">
                Testing strategy
            </Heading>
            <Paragraph typeStyle="body-md" className="my-4">
              <MDXRemote {...testing} components={allComponents} />
            </Paragraph>
          </div>
          <div className="mt-10">
            <Heading typeStyle="heading-md" className="mt-8">
                Approach to code generation
            </Heading>
            <Paragraph typeStyle="body-md" className="my-4">
              <MDXRemote {...codegen} components={allComponents} />
            </Paragraph>
          </div>
          <div className="mt-10">
            <Heading typeStyle="heading-md" className="mt-8">
              Architecture
            </Heading>
            <Paragraph typeStyle="body-md" className="my-4">
              <MDXRemote {...architecture} components={allComponents} />
            </Paragraph>
          </div>
          <div className="mt-10">
            <Heading typeStyle="heading-md" className="mt-8">
              More details about AsyncAPI
            </Heading>
            <div className="mt-4  flex flex-wrap gap-2">
              <span className="flex flex-wrap gap-1 bg-green-100 border border-green-600 text-green-600 p-1 text-center text-xs rounded-md ">
                Versions:  {versions.map((item, index) => (
                <div key={index}>
                        {item}{index != versions.length - 1 ? ', ' : ' '} 
                </div>)
              )}
              </span>
              <span className=" bg-green-100 border border-green-600 text-green-600 p-1 text-center text-xs rounded-md ">
                Who maintains documents: {casestudy.asyncapi.maintainers}
              </span>
              <span className=" bg-green-100 border border-green-600 text-green-600 p-1 text-center text-xs rounded-md ">
                Internal users: {casestudy.asyncapi.audience.internal.toString()}
              </span>
              <span className=" bg-green-100 border border-green-600 text-green-600 p-1 text-center text-xs rounded-md ">
                External users: {casestudy.asyncapi.audience.external.toString()}
              </span>
            </div>
            <Heading typeStyle="heading-sm" className="mt-8">
              How AsyncAPI documents are stored
            </Heading>
            <Paragraph typeStyle="body-md" className="my-4">
              <MDXRemote {...asyncapiStorage} components={allComponents} />
            </Paragraph>
            <Heading typeStyle="heading-sm" className="mt-8">
              Where maintainers edit AsyncAPI documents
            </Heading>
            <Paragraph typeStyle="body-md" className="my-4">
              <MDXRemote {...asyncapiEditing} components={allComponents} />
            </Paragraph>
            <Heading typeStyle="heading-sm" className="mt-8">
              What extensions are used
            </Heading>
            <Paragraph typeStyle="body-md" className="my-4">
              <MDXRemote {...asyncapiExtensions} components={allComponents} />
            </Paragraph>
            <Heading typeStyle="heading-sm" className="mt-8">
              How documentation is generated
            </Heading>
            <Paragraph typeStyle="body-md" className="my-4">
              <MDXRemote {...asyncapiDocumentation} components={allComponents} />
            </Paragraph>
            <Heading typeStyle="heading-sm" className="mt-8">
              What bindings are used
            </Heading>
            <Paragraph typeStyle="body-md" className="my-4">
              <MDXRemote {...asyncapiBindings} components={allComponents} />
            </Paragraph>
            <Heading typeStyle="heading-sm" className="mt-8">
              What tools are used
            </Heading>
            <Paragraph typeStyle="body-md" className="my-4">
              <MDXRemote {...asyncapiTools} components={allComponents} />
            </Paragraph>
          </div>
          <div className="mt-10">
            <Heading typeStyle="heading-md" className="mt-8">
              Schemas
            </Heading>
            <div className="mt-4 items-center">
              <span className=" bg-green-100 border border-green-600 text-green-600 p-1 text-center text-xs rounded-md ">
                Spec: {casestudy.schemas.description}
              </span>
            </div>
            <Heading typeStyle="heading-sm" className="mt-8">
              Storage strategy
            </Heading>
            <Paragraph typeStyle="body-md" className="my-4">
              <MDXRemote {...schemaStorage} components={allComponents} />
            </Paragraph>
            <Heading typeStyle="heading-sm" className="mt-8">
              Schema Registry
            </Heading>
            <Paragraph typeStyle="body-md" className="my-4">
              <MDXRemote {...registry} components={allComponents} />
            </Paragraph>
            <Heading typeStyle="heading-sm" className="mt-8">
              Versioning of schemas
            </Heading>
            <Paragraph typeStyle="body-md" className="my-4">
              <MDXRemote {...versioning} components={allComponents} />
            </Paragraph>
            <Heading typeStyle="heading-sm" className="mt-8">
              Validation of message schemas
            </Heading>
            <Paragraph typeStyle="body-md" className="my-4">
              <MDXRemote {...validation} components={allComponents} />
            </Paragraph>
            <Heading typeStyle="heading-sm" className="mt-8">
              Additional resources
            </Heading>
            <Paragraph typeStyle="body-md" className="my-4">
              <MDXRemote {...additionalResources} components={allComponents} />
            </Paragraph>
          </div>
        </div>
      </div>
    </div>
    </GenericLayout>
  );
}

export default Index;