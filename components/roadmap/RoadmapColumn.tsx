import React from 'react';

import { HeadingLevel, HeadingTypeStyle } from '@/types/typography/Heading';
import { ParagraphTypeStyle } from '@/types/typography/Paragraph';

import Heading from '../typography/Heading';
import Paragraph from '../typography/Paragraph';
import RoadmapList from './RoadmapList';

interface IRoadmapColumnProps {
  title: string;
  description: string;
  colorClass: string;
  items?: any[];
  childrenCollapsed?: boolean;
}

/**
 * @description RoadmapColumn component.
 * @param {string} props.title - The title of the column.
 * @param {string} props.description - The description of the column.
 * @param {string} props.colorClass - The color class for styling.
 * @param {array} props.items - The array of items.
 * @param {boolean} props.childrenCollapsed - Whether children items are collapsed.
 */
export default function RoadmapColumn({
  title,
  description,
  colorClass,
  items = [],
  childrenCollapsed = false
}: IRoadmapColumnProps): React.ReactElement {
  return (
    <div className='mt-8 lg:mt-4'>
      <div className='p-4 text-center' data-testid='RoadmapColumn-heading'>
        <Heading level={HeadingLevel.h3} typeStyle={HeadingTypeStyle.smSemibold}>
          {title}
        </Heading>
        <Paragraph typeStyle={ParagraphTypeStyle.md} className='mt-2'>
          {description}
        </Paragraph>
      </div>
      <RoadmapList items={items} colorClass={colorClass} showConnector={false} childrenCollapsed={childrenCollapsed} />
    </div>
  );
}
