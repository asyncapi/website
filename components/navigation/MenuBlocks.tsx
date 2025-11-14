import { useRouter } from 'next/router';
import React from 'react';

import { ParagraphTypeStyle } from '@/types/typography/Paragraph';

import LinkComponent from '../link';
import Paragraph from '../typography/Paragraph';
import Label from './Label';

export interface MenuItem {
  title: string;
  href: string;
  description: string;
  icon: React.ElementType;
  className?: string;
  comingSoon?: boolean;
  beta?: boolean;
}

export interface MenuBlocksProps {
  items?: MenuItem[];
}

/**
 * @description Component representing a set of menu blocks.
 * @param {MenuItem[]} [props.items=[]] - The list of items to be displayed in the menu blocks.
 */
export default function MenuBlocks({ items = [] }: MenuBlocksProps) {
  const router = useRouter();

  return (
    <>
      {items.map((item, index) => {
        const isExternalHref = item.href && item.href.startsWith('http');

        return (
          <LinkComponent
            href={item.comingSoon ? '' : item.href}
            key={index}
            target={isExternalHref ? '_blank' : undefined}
            rel={isExternalHref ? 'noopener noreferrer' : undefined}
          >
            <span
              data-testid='MenuBlocks-Link'
              className={`-mx-3 mt-1 flex items-start space-x-4 rounded-lg p-3 transition-all ${'duration-200 ease-in-out'} ${
                router.asPath === item.href
                  ? 'bg-primary-100 dark:bg-dark-background shadow-sm'
                  : 'hover:bg-primary-100 dark:hover:bg-dark-background hover:translate-x-1'
              }`}
            >
              <div
                className={`flex size-10 shrink-0 items-center justify-center rounded-lg ${
                  item.className
                    ? item.className
                    : 'border border-primary-500 dark:border-primary-500 bg-primary-100 dark:bg-primary-500/20'
                } text-primary-600 dark:text-primary-300 sm:size-12 ${item.comingSoon && 'opacity-50'}`}
                data-testid='MenuBlock-icon'
              >
                <item.icon className='size-6' />
              </div>
              <div className='space-y-1 whitespace-pre-line'>
                <Paragraph
                  typeStyle={ParagraphTypeStyle.md}
                  textColor='text-gray-900 dark:text-gray-100'
                  fontWeight='font-semibold'
                >
                  <span className={item.comingSoon ? 'opacity-50' : ''}>{item.title}</span>{' '}
                  {item.comingSoon && <Label text='Coming soon' />} {item.beta && <Label text='Beta' />}
                </Paragraph>
                <Paragraph
                  typeStyle={ParagraphTypeStyle.sm}
                  className={`text-gray-600 dark:text-gray-400 ${item.comingSoon ? 'opacity-50' : ''}`}
                >
                  {item.description}
                </Paragraph>
              </div>
            </span>
          </LinkComponent>
        );
      })}
    </>
  );
}
