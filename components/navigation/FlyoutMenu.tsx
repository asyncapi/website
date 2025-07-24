import React from 'react';

import type { MenuItem } from './MenuBlocks';
import MenuBlocks from './MenuBlocks';

interface FlyoutProps {
  items?: MenuItem[];
}

/**
 * @description Component representing a flyout menu.
 * @param {MenuItem[]} [props.items=[]] - The list of items to be displayed in the flyout menu.
 */
export default function Flyout({ items = [] }: FlyoutProps) {
  return (
    <div
      className='absolute z-50 -ml-4 md:h-[80vh] overflow-x-scroll w-screen max-w-md pt-3 md:ml-12 md:-translate-x-1/2 lg:left-1/2 lg:max-w-3xl lg:-translate-x-1/2'
      data-testid='Flyout-main'
    >
      <div className='rounded-lg shadow-lg'>
        <div className='shadow-xs overflow-hidden rounded-lg'>
          <div className='relative z-20 grid gap-6 bg-white px-5 py-6 sm:gap-8 sm:p-8 lg:grid-cols-2'>
            <MenuBlocks items={items} />
          </div>
        </div>
      </div>
    </div>
  );
}
