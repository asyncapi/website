import React from 'react';

import { HeadingTypeStyle } from '@/types/typography/Heading';
import { ParagraphTypeStyle } from '@/types/typography/Paragraph';

import Heading from '../typography/Heading';
import Paragraph from '../typography/Paragraph';

export interface IGoalCardProps {
    title: string;
    description: React.ReactNode;
    category?: string;
}

export default function GoalCard({ title, description, category = 'GOAL' }: IGoalCardProps) {
    return (
        <div className='group relative flex h-full flex-col justify-between rounded-xl border border-gray-100 bg-white p-8 shadow-lg transition-all duration-300 hover:-translate-y-1 hover:shadow-xl'>
            <div className='absolute inset-x-0 top-0 h-2 w-0 overflow-hidden rounded-t-xl bg-secondary-500 transition-all duration-500 ease-out group-hover:w-full' />
            <div>
                <div className='mb-6'>
                    <span className='rounded-full bg-secondary-100 px-3 py-1 text-xs font-bold uppercase tracking-wider text-secondary-600'>
                        {category}
                    </span>
                </div>
                <Heading typeStyle={HeadingTypeStyle.mdSemibold} className='mb-4 text-gray-900'>
                    {title}
                </Heading>
                <div className='text-gray-600'>
                    {typeof description === 'string' ? (
                        <Paragraph typeStyle={ParagraphTypeStyle.md} className='my-4'>
                            {description}
                        </Paragraph>
                    ) : (
                        description
                    )}
                </div>
            </div>
        </div>
    );
}
