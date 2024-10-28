import Link from 'next/link';
import React from 'react';

import { ParagraphTypeStyle } from '@/types/typography/Paragraph';

import Paragraph from '../typography/Paragraph';

interface NavMenuItem {
  href: string;
  target?: string;
  text: string;
  description: string;
}

interface NavMenuProps {
  items: NavMenuItem[];
}

/**
 * @description NavMenu component renders a navigation menu with a list of items.
 * @param {Object} props - Props object for NavMenu component.
 * @param {NavMenuItem[]} props.items - Array of navigation menu items..
 */
export default function NavMenu({ items = [] }: NavMenuProps) {
  if (!items.length) return null;

  return (
    <div className='absolute left-1/2 z-50 mt-3 w-screen max-w-xs -translate-x-1/2 px-2 sm:px-0'>
      <div className='rounded-lg shadow-lg'>
        <div className='shadow-xs overflow-hidden rounded-lg'>
          <div className='relative z-20 grid gap-6 bg-white px-5 py-6 sm:gap-8 sm:p-8'>
            {items.map((item, index) => (
              <Link
                href={item.href}
                key={index}
                target={item.target || '_self'}
                rel='noopener noreferrer'
                className='-m-3 block space-y-1 rounded-md p-3 transition duration-150 ease-in-out hover:bg-gray-50'
                data-testid='NavMenu-Link'
              >
                <Paragraph typeStyle={ParagraphTypeStyle.sm} textColor='text-gray-900' className='font-semibold'>
                  {item.text}
                </Paragraph>
                <Paragraph typeStyle={ParagraphTypeStyle.sm}>{item.description}</Paragraph>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
