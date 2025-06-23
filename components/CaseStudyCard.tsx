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
	@@ -20,7 +20,7 @@ export default function CaseStudyCard({ studies = [] }: ICaseStudyCardProps) {

  return (
    <div className='flex flex-wrap gap-3 pt-10 justify-center lg:gap-8 lg:text-center'>
      {studies.map((study, index) => (
        <a key={index} className='lg:w-[30%]' href={`casestudies/${study.id}`}>
          <div
            className='h-full min-h-[300px] max-w-sm overflow-hidden rounded-md border border-gray-200 bg-white p-4'
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