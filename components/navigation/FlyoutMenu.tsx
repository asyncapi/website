import React from 'react';

import type { MenuItem } from './MenuBlocks';
import MenuBlocks from './MenuBlocks';

interface FlyoutProps {
  items?: MenuItem[];
  open?: boolean;
}

/**
 * @description Component representing a flyout menu with enter/exit transitions.
 * @param {MenuItem[]} [props.items=[]] - The list of items to be displayed in the flyout menu.
 * @param {boolean} [props.open=false] - Whether the flyout is open (used to apply animation classes).
 */
export default function Flyout({ items = [], open = false }: FlyoutProps) {
  return (
    <div
      data-testid='Flyout-main'
      className={`absolute z-50 -ml-4 md:h-[80vh] overflow-x-scroll w-screen max-w-md pt-3 md:ml-12 md:-translate-x-1/2 lg:left-1/2 lg:max-w-3xl lg:-translate-x-1/2 transition-all duration-500 ease-out transform origin-top ${
        open ? 'opacity-100 translate-y-0 pointer-events-auto' : 'opacity-0 -translate-y-6 pointer-events-none'
      }`}
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
