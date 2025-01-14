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

  let gridClass = 'lg:grid-cols-3'; // Default to 3 columns for larger screens

  if (studies.length === 1) {
    gridClass = 'lg:grid-cols-1';
  } else if (studies.length === 2) {
    gridClass = 'lg:grid-cols-2';
  }

  return (
    <div className={`mx-auto flex max-w-screen-lg flex-wrap gap-4 pt-10 lg:grid lg:gap-8 lg:text-center ${gridClass}`}>
      {studies.map((study, index) => (
        <a key={index} href={`casestudies/${study.id}`} className='w-full grow'>
          <div
            className='min-h-[300px] overflow-hidden rounded-md border border-gray-200 bg-white p-4 sm:p-6 md:p-8'
            data-testid='CaseStudyCard-main'
          >
            <span className='mr-2'>
              <img className='m-auto h-16' src={study.company.logo} alt={study.company.name} />
            </span>
            <Paragraph typeStyle={ParagraphTypeStyle.md} className='my-4'>
              {study.company.description}
            </Paragraph>
          </div>
        </a>
      ))}
    </div>
  );
}
