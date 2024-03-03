import React from "react";
import Link from "next/link";
import Paragraph from "../../components/typography/Paragraph";
import Heading from "../../components/typography/Heading";
import CaseStudiesList from "../../config/case-studies.json";
import { MDXRemote } from "next-mdx-remote";
import { getMDXComponents } from "../../components/MDX.js";
import { serialize } from "next-mdx-remote/serialize";
import GenericLayout from "../../components/layout/GenericLayout";
import CaseTOC from "../../components/CaseTOC";
import { generateCaseStudyContent } from "../../lib/staticHelpers";

const renderContent = (content, allComponents, level) => {
  const typeStyle =
    level === 0 ? "heading-lg" : level === 1 ? "heading-md" : "heading-sm";

  return content.map((item) => {
    return (
      <div
        className="mt-10 w-11/12 mx-auto"
        key={item.title}
      >
        <Heading typeStyle={typeStyle} className="mt-8"  id={item.title
          .replace(/<|>|"|\\|\/|=/gi, "")
          .replace(/\s/gi, "-")
          .toLowerCase()}>
          {item.title}
        </Heading>
        {item.content && (
          <Paragraph typeStyle="body-md" className="my-4">
            <MDXRemote {...item.content} components={allComponents} />
          </Paragraph>
        )}
        {item.items && (
          <div className="mt-4 items-center">
            <div className="flex flex-wrap gap-2">
              {item.items.map((item) => (
                <span
                  key={item}
                  className="bg-green-100 border border-green-600 text-green-600 p-1 text-center text-xs rounded-md "
                >
                  {item}
                </span>
              ))}
            </div>
            {item.children &&
              renderContent(item.children, allComponents, level + 1)}
          </div>
        )}
      </div>
    );
  });
};

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
  additionalResources,
}) {
  const image = "/img/social/website-card.png";
  const allComponents = getMDXComponents();
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
    casestudy,
  });

  return (
    <GenericLayout
      title="AsyncAPI Case Studies"
      description="The home for all case studies related to AsyncAPI."
      image={image}
      hideBanner={true}
      wide
    >
    <div className="max-w-screen lg:flex-row-reverse lg:flex lg:justify-between">
      <CaseTOC toc={content} cssBreakingPoint="lg" className="lg:flex-1 bg-blue-100 mt-4 p-4 sticky top-20 overflow-y-auto max-h-screen lg:bg-transparent lg:mt-2 lg:pt-0 lg:pb-8 lg:top-24 lg:max-h-(screen-16) lg:border-l lg:border-gray-200 lg:min-w-[200px] lg:max-w-72 lg:-mr-0" />
      <div className="xl:max-w-5xl case-study">
        <div className=" mt-10 md:mt-20 flex flex-col md:flex-row justify-between items-center w-11/12 mx-auto">
          <div className="w-full md:w-[65%]">
            <Heading typeStyle="heading-xl" className="countdown-text-gradient">
              {casestudy.company.name}
            </Heading>
            <div className='flex flex-wrap gap-1' id='Contacts'>
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
          <img
              src={casestudy.company.logo}
              alt={casestudy.company.name}
              className="w-[300px] mt-5 md:mt-0 rounded-lg"
            />
        </div>
        {renderContent(content, allComponents, 0)}
        </div>
     </div>
    </GenericLayout>
  );
}

export default Index;