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
    <div className='mx-auto max-w-screen-lg pt-10'>
      <div className='flex flex-row justify-center gap-4 overflow-x-auto lg:gap-8'>
        {studies.map((study, index) => (
          <a key={index} href={`casestudies/${study.id}`} className='w-[350px] shrink-0 px-4'>
            <div
              className='flex h-full flex-col items-center justify-center overflow-hidden rounded-md border border-gray-200 bg-white p-4 text-center sm:p-6 md:p-8'
              data-testid='CaseStudyCard-main'
            >
              <img className='m-auto h-16' src={study.company.logo} alt={study.company.name} />
              <Paragraph typeStyle={ParagraphTypeStyle.md} className='my-4'>
                {study.company.description}
              </Paragraph>
            </div>
          </a>
        ))}
      </div>
    </div>
  );
}
