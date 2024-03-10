import LinkComponent from '../link';
import Paragraph from '../typography/Paragraph';
import Label from './Label';
import { useRouter } from 'next/router';
import { ParagraphTypeStyle } from '@/types/typography/Paragraph';
import { MenuBlocksProps } from '@/types/navigation/MenuBlocks';

export default function MenuBlocks({ items = [] }: MenuBlocksProps) {
  const router = useRouter();

  return (
    <>
      {items.map((item, index) => {
        const isExternalHref = item.href && item.href.startsWith('http');

        return (
          <LinkComponent href={item.comingSoon ? '' : item.href} key={index}>
            <a
              data-testid="MenuBlocks-Link"
              className={`flex items-start p-3 -m-3 space-x-4 transition duration-150 ease-in-out rounded-lg ${
                router.asPath === item.href ? 'bg-secondary-100 shadow-sm' : 'hover:bg-gray-50'
              }`}
              target={isExternalHref ? '_blank' : undefined}
              rel={isExternalHref ? 'noopener noreferrer' : undefined}
            >
              <div
                className={`flex-shrink-0 flex items-center justify-center h-10 w-10 rounded-lg ${
                  item.className ? item.className : 'border border-gray-800 bg-secondary-100'
                } text-gray-900 sm:h-12 sm:w-12 ${item.comingSoon && 'opacity-50'}`}
                data-testid="MenuBlock-icon"
              >
                <item.icon className="h-6 w-6" />
              </div>
              <div className="space-y-1 whitespace-pre-line">
                <Paragraph typeStyle={ParagraphTypeStyle.md} textColor="text-gray-900" fontWeight="font-semibold">
                  <span className={item.comingSoon ? 'opacity-50' : ''}>{item.title}</span>{' '}
                  {item.comingSoon && <Label text="Coming soon" />} {item.beta && <Label text="Beta" />}
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
