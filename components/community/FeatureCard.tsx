import React from 'react';

import { HeadingLevel, HeadingTypeStyle } from '@/types/typography/Heading';
import { ParagraphTypeStyle } from '@/types/typography/Paragraph';

import Heading from '../typography/Heading';
import Paragraph from '../typography/Paragraph';

interface FeatureCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
}

/**
 * @description FeatureCard component for displaying a feature card with icon, title and description
 * @param {FeatureCardProps} props - Props for the FeatureCard component
 */
export default function FeatureCard({ icon, title, description }: FeatureCardProps) {
  return (
    <div className='flex flex-col items-center text-center' data-testid='FeatureCard'>
      <div className='mb-6 flex size-16 items-center justify-center rounded-2xl bg-indigo-600 text-white shadow-lg'>
        {icon}
      </div>
      <Heading level={HeadingLevel.h3} typeStyle={HeadingTypeStyle.smSemibold} className='mb-3'>
        {title}
      </Heading>
      <Paragraph typeStyle={ParagraphTypeStyle.md} className='text-gray-600 dark:text-gray-400'>
        {description}
      </Paragraph>
    </div>
  );
}
