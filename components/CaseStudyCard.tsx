import React from 'react';

import type { ICaseStudies } from '@/types/post';
import { ParagraphTypeStyle } from '@/types/typography/Paragraph';

import Paragraph from './typography/Paragraph';

interface ICaseStudyCardProps {
  studies?: ICaseStudies;
}

/**
 * @description A component that displays a list of case studies in a card format
 * @param {ICaseStudies} props.studies - The list of case studies to display
 */
export default function CaseStudyCard({ studies = [] }: ICaseStudyCardProps) {
  if (studies.length === 0) {
    return null;
  }

  return (
    <div className="grid gap-y-4 pt-10 sm:gap-y-6 lg:grid-cols-2 lg:gap-y-8 lg:justify-items-center lg:gap-x-0">
  {studies.map((study, index) => (
    <a key={index} href={`casestudies/${study.id}`} className="w-full max-w-sm">
      <div
        className="flex flex-col items-center h-full overflow-hidden rounded-md border border-gray-200 bg-white p-4 transform transition-transform duration-300 hover:scale-105 hover:shadow-lg"
        style={{ minHeight: '300px' }}
        data-testid="CaseStudyCard-main"
      >
        <span className="mr-2"> 
          <img className="m-auto h-16" src={study.company.logo} alt={study.company.name} />
        </span>
        <Paragraph typeStyle={ParagraphTypeStyle.md} className="my-4 text-center">
          {study.company.description}
        </Paragraph>
      </div>
    </a>
  ))}
</div>

  );
}
