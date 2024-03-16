import { useRouter } from 'next/router';

import type { MenuBlocksProps } from '@/types/navigation/MenuBlocks';
import { ParagraphTypeStyle } from '@/types/typography/Paragraph';

import LinkComponent from '../link';
import Paragraph from '../typography/Paragraph';
import Label from './Label';

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
          <LinkComponent href={item.comingSoon ? '' : item.href} key={index}>
            <a
              data-testid='MenuBlocks-Link'
              className={`-m-3 flex items-start space-x-4 rounded-lg p-3 transition duration-150 ease-in-out ${
                router.asPath === item.href ? 'bg-secondary-100 shadow-sm' : 'hover:bg-gray-50'
              }`}
              target={isExternalHref ? '_blank' : undefined}
              rel={isExternalHref ? 'noopener noreferrer' : undefined}
            >
              <div
                className={`flex size-10 shrink-0 items-center justify-center rounded-lg ${
                  item.className ? item.className : 'border border-gray-800 bg-secondary-100'
                } text-gray-900 sm:size-12 ${item.comingSoon && 'opacity-50'}`}
                data-testid='MenuBlock-icon'
              >
                <item.icon className='size-6' />
              </div>
              <div className='space-y-1 whitespace-pre-line'>
                <Paragraph typeStyle={ParagraphTypeStyle.md} textColor='text-gray-900' fontWeight='font-semibold'>
                  <span className={item.comingSoon ? 'opacity-50' : ''}>{item.title}</span>{' '}
                  {item.comingSoon && <Label text='Coming soon' />} {item.beta && <Label text='Beta' />}
                </Paragraph>
                <Paragraph typeStyle={ParagraphTypeStyle.sm} className={item.comingSoon ? 'opacity-50' : ''}>
                  {item.description}
                </Paragraph>
              </div>
            </a>
          </LinkComponent>
        );
      })}
    </>
  );
}
