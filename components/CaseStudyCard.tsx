import Link from 'next/link';
import React from 'react';

import type { ICaseStudies } from '@/types/post';
import { ParagraphTypeStyle } from '@/types/typography/Paragraph';

import Button from './buttons/Button';
import Paragraph from './typography/Paragraph';

interface ICaseStudyCardProps {
  studies?: ICaseStudies;
}

/**
 * @description Enhanced case study card component with modern design
 * @param {ICaseStudies} props.studies - The list of case studies to display
 */
export default function CaseStudyCard({ studies = [] }: ICaseStudyCardProps) {
  if (studies.length === 0) {
    return null;
  }

  return (
    <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8'>
      {studies.map((study, index) => (
        <Link key={index} href={`/casestudies/${study.id}`} className='group block h-full'>
          <div className='h-full bg-white dark:bg-dark-background border border-gray-200 dark:border-gray-700 rounded-2xl p-6 transition-all duration-300 hover:shadow-xl hover:-translate-y-1'>
            {/* Company Logo */}
            <div className='flex items-center justify-center h-20 mb-6'>
              <img src={study.company.logo} alt={study.company.name} className='max-h-16 max-w-full object-contain' />
            </div>

            {/* Description */}
            <Paragraph typeStyle={ParagraphTypeStyle.md} className='text-gray-600 dark:text-gray-400 mb-6 line-clamp-4'>
              {study.company.description}
            </Paragraph>

            {/* CTA Button */}
            <div className='mt-auto'>
              <Button
                text='Read case study →'
                className='w-full bg-primary-500 hover:bg-primary-600 text-white group-hover:bg-primary-600 transition-colors'
              />
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
}
