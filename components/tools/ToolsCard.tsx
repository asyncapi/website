import React, { useEffect, useRef, useState } from 'react';

import type { ToolData, VisibleDataListType } from '@/types/components/tools/ToolDataType';
import { HeadingTypeStyle } from '@/types/typography/Heading';
import { ParagraphTypeStyle } from '@/types/typography/Paragraph';

import Data from '../../scripts/tools/tools-schema.json';
import Heading from '../typography/Heading';
import Paragraph from '../typography/Paragraph';
import { CardData } from './CardData';
import Tag from './Tags';

interface ToolsCardProp {
  toolData: ToolData;
}

/**
 * @description This component displays a card for a tool.
 *
 * @param {ToolsCardProp} props - Props for the ToolsCard component.
 * @param {ToolData} props.toolData - Data of the tool.
 */
export default function ToolsCard({ toolData }: ToolsCardProp) {
  const [showDescription, setShowDescription] = useState<boolean>(false);
  const [isTruncated, setIsTruncated] = useState<boolean>(false);
  const [readMore, setReadMore] = useState<boolean>(false);
  const descriptionRef = useRef<HTMLDivElement>(null);

  // Decide whether to show full description or not in the card based on
  // the number of lines occupied by the description.
  useEffect(() => {
    if (descriptionRef.current) {
      setIsTruncated(descriptionRef.current?.scrollHeight! > descriptionRef.current?.clientHeight!);
    }
  }, [descriptionRef.current]);

  let onGit = false;

  if (toolData?.links?.repoUrl) {
    const url = new URL(toolData.links.repoUrl);

    onGit = url.host === 'github.com';
  }

  const [visible, setVisible] = useState<VisibleDataListType>({
    lang: false,
    tech: false,
    desc: false
  });

  return (
    <div className='flex h-auto flex-col rounded-lg border shadow-md'>
      <div className='mb-6 px-6 pt-8'>
        <div className='flex flex-col gap-2'>
          <div className='flex w-full justify-between gap-4'>
            <Heading typeStyle={HeadingTypeStyle.smSemibold}>{toolData.title}</Heading>
            <div
              className='size-fit min-w-[5.3rem] rounded-md border border-green-600 bg-green-100 p-1 text-center text-xs text-green-600'
              onMouseEnter={() =>
                setTimeout(() => {
                  if (!visible.desc) setVisible({ ...visible, desc: true });
                }, 400)
              }
            >
              <span
                className='group relative'
                onMouseLeave={() =>
                  setTimeout(() => {
                    if (visible.desc) setVisible({ ...visible, desc: false });
                  }, 300)
                }
              >
                {toolData.filters?.hasCommercial === false ? 'Open Source' : 'Commercial'}
                {visible.desc && (
                  <span className='absolute -left-2/3 top-8 z-10 w-48 -translate-x-12 rounded border border-gray-200 bg-white px-2 py-1 text-left text-gray-700 shadow-md'>
                    {Data.properties.filters.properties.hasCommercial.description}
                  </span>
                )}
              </span>
            </div>
          </div>
          <div className='relative'>
            <Paragraph typeStyle={ParagraphTypeStyle.sm}>
              <span
                className={`w-full ${isTruncated ? 'cursor-pointer' : ''}`}
                onMouseEnter={() =>
                  setTimeout(() => {
                    if (isTruncated) setShowDescription(true);
                  }, 500)
                }
              >
                <span
                  ref={descriptionRef}
                  className={`line-clamp-3 inline-block ${isTruncated && 'after:ml-1 after:content-["..."]'}`}
                >
                  {toolData.description}
                </span>
              </span>
            </Paragraph>

            {showDescription && (
              <div
                className='absolute top-0 z-10 w-full border border-gray-200 bg-white p-2 shadow-md'
                onMouseLeave={() => setShowDescription(false)}
              >
                <Paragraph typeStyle={ParagraphTypeStyle.sm} className=''>
                  {toolData.description}
                </Paragraph>
              </div>
            )}
          </div>
        </div>
      </div>
      <hr className='mx-6' />
      <div className='grow'>
        {toolData.filters?.language || toolData?.filters?.technology?.length ? (
          <div className='my-6'>
            {toolData?.filters?.language?.length !== 0 && (
              <div className='mx-6 flex flex-col gap-2'>
                <CardData
                  className='text-sm'
                  heading='LANGUAGE'
                  data={Data.properties.filters.properties.language.description}
                  type='lang'
                  visible={visible}
                  setVisible={setVisible}
                  read={readMore}
                  setRead={setReadMore}
                />
                <div className='flex gap-2'>
                  {toolData.filters?.language &&
                    toolData.filters?.language.map((item, index) => (
                      <Tag key={index} name={item.name} bgColor={item.color} borderColor={item.borderColor} />
                    ))}
                </div>
              </div>
            )}
            {toolData.filters.technology?.length !== 0 && (
              <div className='mx-6 my-4 flex flex-col gap-2'>
                <CardData
                  className='text-sm'
                  heading='TECHNOLOGIES'
                  data={Data.properties.filters.properties.technology.description}
                  type='tech'
                  visible={visible}
                  setVisible={setVisible}
                  read={readMore}
                  setRead={setReadMore}
                />
                <div className='flex flex-wrap gap-2'>
                  {toolData.filters?.technology &&
                    toolData.filters.technology.map((item, index) => (
                      <Tag key={index} name={item.name} bgColor={item.color} borderColor={item.borderColor} />
                    ))}
                </div>
              </div>
            )}
          </div>
        ) : (
          <div className='relative size-full p-8 text-center text-gray-700'>
            <div className='absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2'>
              {' '}
              No further details provided{' '}
            </div>
          </div>
        )}
      </div>
      {(toolData?.links?.repoUrl || toolData?.links?.websiteUrl || toolData?.links?.docsUrl) && (
        <>
          <hr className='' />
          <div className='flex'>
            {toolData.links.repoUrl &&
              (onGit ? (
                <a
                  className='w-full cursor-pointer border-x px-1 py-6 text-center hover:bg-gray-200'
                  href={toolData.links.repoUrl}
                  target='_blank'
                  rel='noreferrer'
                  data-testid='ToolsCard-repoUrl'
                >
                  <div className='m-auto flex w-fit gap-2'>
                    <img src='/img/logos/github-black.svg' alt='GitHub' className='w-5' />
                    <div className='text-sm text-gray-700'>View Github</div>
                  </div>
                </a>
              ) : (
                <a
                  className='w-full cursor-pointer border-x border-gray-200 px-1 py-6 text-center hover:bg-gray-200'
                  href={toolData.links.repoUrl}
                  target='_blank'
                  rel='noreferrer'
                >
                  <div className='m-auto flex w-fit gap-2'>
                    <div className='text-sm text-gray-700'>View Source Code</div>
                  </div>
                </a>
              ))}
            {toolData.links.websiteUrl && (
              <a
                className='w-full cursor-pointer border-x border-gray-200 px-1 py-6 text-center hover:bg-gray-200'
                href={toolData.links.websiteUrl}
                target='_blank'
                rel='noreferrer'
                data-testid='ToolsCard-websiteUrl'
              >
                <div className='m-auto flex w-fit gap-2'>
                  <img src='/img/illustrations/icons/share.svg' alt='Share' className='w-5' />
                  <div className='text-sm text-gray-700'>Visit Website</div>
                </div>
              </a>
            )}
            {toolData.links.docsUrl && (
              <a
                className='w-full cursor-pointer border-x border-gray-200 px-1 py-6 text-center hover:bg-gray-200'
                href={toolData.links.docsUrl}
                target='_blank'
                rel='noreferrer'
                data-testid='ToolsCard-docsUrl'
              >
                <div className='m-auto flex w-fit gap-2'>
                  <img src='/img/illustrations/icons/docs-icon.svg' alt='Docs' className='w-5' />
                  <div className='text-sm text-gray-700'>Visit Docs</div>
                </div>
              </a>
            )}
          </div>
        </>
      )}
    </div>
  );
}
