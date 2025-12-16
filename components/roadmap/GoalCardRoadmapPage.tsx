import React from 'react';

interface GoalCardRoadmapPageProps {
  icon: React.ComponentType<{ className?: string }>;
  title: string;
  description: string;
}

/**
 * @description GoalCardRoadmapPage component displays a goal with an icon, title, and description.
 * Used in the roadmap page to showcase AsyncAPI's goals.
 */
export default function GoalCardRoadmapPage({ icon: Icon, title, description }: GoalCardRoadmapPageProps) {
  return (
    <div className='bg-white dark:bg-dark-background rounded-xl p-8 shadow-sm hover:shadow-md transition-shadow'>
      <div className='mb-6'>
        <div className='inline-flex items-center justify-center w-14 h-14 bg-secondary-200 dark:bg-secondary-700 rounded-lg'>
          <Icon className='w-8 h-8 text-gray-900 dark:text-gray-900' />
        </div>
      </div>
      <h3 className='text-xl font-bold text-gray-900 dark:text-white mb-3'>{title}</h3>
      <p className='text-gray-600 dark:text-gray-400 leading-relaxed'>{description}</p>
    </div>
  );
}
