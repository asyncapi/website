import React from 'react';

import type { ICaseStudies } from '@/types/post';
import { HeadingLevel, HeadingTypeStyle } from '@/types/typography/Heading';
import { ParagraphTypeStyle } from '@/types/typography/Paragraph';

import CaseStudyCard from '../../components/CaseStudyCard';
import GenericLayout from '../../components/layout/GenericLayout';
import Heading from '../../components/typography/Heading';
import Paragraph from '../../components/typography/Paragraph';
import TextLink from '../../components/typography/TextLink';
import AdoptersList from '../../config/adopters.json';
import CaseStudiesList from '../../config/case-studies.json';

interface Resource {
  title: string;
  link: string;
}

interface Adopter {
  companyName: string;
  useCase: string;
  resources: Resource[];
}

/**
 * @description Renders the Case Studies page.
 */
export default function Casestudies() {
  const description: string =
    'Learn about different case studies based on AsyncAPI spec and related tools.';
  const image: string = '/img/social/case-studies.webp';
  const title: string = 'Case Studies';

  return (
    <GenericLayout title={title} description={description} image={image} wide>
      <div
        className="relative mx-auto max-w-xl px-4 py-10 sm:px-6 lg:max-w-screen-xl lg:px-8"
        data-testid="CaseStudy-main"
      >
        <div className="grid lg:grid-cols-9 lg:gap-8 lg:text-center">
          <div className="col-span-5 col-start-3">
            <Heading level={HeadingLevel.h1} typeStyle={HeadingTypeStyle.lg}>
              {title}
            </Heading>
            <Paragraph
              typeStyle={ParagraphTypeStyle.md}
              className="my-4 max-w-4xl"
            >
              The best way to learn how to use AsyncAPI is not only through
              documentation that usually is focused on recommendations and best
              practices. It is also good to confront with real-life case studies
              that explain how people really use AsyncAPI and what are their
              flows.
            </Paragraph>
            <Paragraph
              typeStyle={ParagraphTypeStyle.md}
              className="my-4 max-w-4xl"
            >
              Feel free to submit your case study. We have a template for you.
              For more details
              <TextLink
                href="https://github.com/asyncapi/website/blob/master/README.md#case-studies"
                target="_blank"
              >
                read our FAQ
              </TextLink>
              .
            </Paragraph>
          </div>
        </div>
        <div data-testid="CaseStudy-card">
          <CaseStudyCard studies={CaseStudiesList as ICaseStudies} />
        </div>

        <div className="adopters">
          <div className="mt-8 grid lg:grid-cols-9 lg:gap-8 lg:text-center">
            <div className="col-span-5 col-start-3">
              <Heading level={HeadingLevel.h1} typeStyle={HeadingTypeStyle.lg}>
                Adopters
              </Heading>
              <Paragraph
                typeStyle={ParagraphTypeStyle.md}
                className="my-4 max-w-4xl"
              >
                Check out how different companies use AsyncAPI and what problems
                they solve.
              </Paragraph>
              <Paragraph
                typeStyle={ParagraphTypeStyle.md}
                className="my-4 max-w-4xl"
              >
                Feel free to{' '}
                <a
                  className="underline"
                  href="https://github.com/asyncapi/website/blob/master/config/adopters.yml"
                >
                  submit a pull request
                </a>{' '}
                with information about how your company uses AsyncAPI. We know
                that writing an official case study might be time consuming and
                requires too much internal paper work. Let&apos;s make sure we
                can at least capture a use case that is already a great learning
                information for the community.
              </Paragraph>
            </div>
          </div>
        </div>

        <div className="w-full flex justify-center">
          <div className="overflow-x-auto w-full">
            <table className="my-8 min-w-[600px] w-full border-collapse border">
              <thead>
                <tr>
                  <th className="border p-2 font-bold text-left">
                    Company name
                  </th>
                  <th className="border p-2 font-bold text-left">Use Case</th>
                  <th className="border p-2 font-bold text-left">Resources</th>
                </tr>
              </thead>
              <tbody>
                {AdoptersList.map((entry: Adopter, index: number) => (
                  <tr key={index} data-testid="Adopters">
                    <td className="border p-2">{entry.companyName}</td>
                    <td className="border p-2">{entry.useCase}</td>
                    <td className="border p-2">
                      <ul className="list-disc pl-4">
                        {entry.resources.map(
                          (resource: Resource, resourceIndex: number) => (
                            <li key={resourceIndex} className="py-1">
                              <a
                                className="text-cyan-500 underline"
                                href={resource.link}
                                target="_blank"
                                rel="noopener noreferrer"
                              >
                                {resource.title}
                              </a>
                            </li>
                          ),
                        )}
                      </ul>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </GenericLayout>
  );
}
