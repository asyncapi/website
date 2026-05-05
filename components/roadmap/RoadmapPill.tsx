import React, { useState } from 'react';

import IconArrowRight from '../icons/ArrowRight';
import Modal from '../Modal';

/**
 * @description Icon for Done (Tick)
 */
function DoneIcon() {
  return (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      fill='none'
      viewBox='0 0 24 24'
      strokeWidth={1.5}
      stroke='currentColor'
      className='-mt-0.5 mr-2 inline-block size-6 text-green-600'
    >
      <path
        strokeLinecap='round'
        strokeLinejoin='round'
        d='M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z'
      />
    </svg>
  );
}

interface IPillProps {
  item: {
    done?: boolean;
    url?: string;
    description?: string | React.ReactNode;
    title: string;
  };
  colorClass?: string;
  isCollapsible?: boolean;
  isCollapsed?: boolean;
  onClickCollapse?: () => void;
  collapsibleContentId?: string;
}

/**
 * @description Pill is a component to display a roadmap item.
 * @param {object} props.item - The roadmap item.
 * @param {boolean} props.item.done - Whether the item is done.
 * @param {string} props.item.url - The URL associated with the item.
 * @param {string} props.item.description - The description of the item.
 * @param {string} props.item.title - The title of the item.
 * @param {string} props.colorClass - The color class for styling.
 * @param {boolean} props.isCollapsible - Whether the item is collapsible.
 * @param {boolean} props.isCollapsed - Whether the item is collapsed.
 * @param {function} props.onClickCollapse - Function to handle click on collapse.
 */
export default function Pill({
  item,
  colorClass = '',
  isCollapsible = false,
  isCollapsed = false,
  onClickCollapse = () => {},
  collapsibleContentId
}: IPillProps) {
  const [isDescriptionVisible, setIsDescriptionVisible] = useState(false);
  const isDescriptionTrigger = !item.url && Boolean(item.description);
  const interactiveClassName =
    'block rounded-md text-left font-medium text-gray-900 transition-colors hover:text-gray-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet focus-visible:ring-offset-2';
  const titleContent = (
    <>
      {item.done && (
        <span title='Done!'>
          <DoneIcon />
        </span>
      )}
      <span>{item.title}</span>
    </>
  );

  let titleElement = <span className='block text-left font-medium text-gray-900'>{item.title}</span>;

  if (item.url) {
    titleElement = (
      <a href={item.url} rel='noopener noreferrer' className={`${interactiveClassName} cursor-pointer`}>
        {titleContent}
      </a>
    );
  } else if (isDescriptionTrigger) {
    titleElement = (
      <button
        type='button'
        onClick={() => setIsDescriptionVisible(true)}
        aria-label={`Open details for ${item.title}`}
        aria-haspopup='dialog'
        className={`${interactiveClassName} cursor-pointer`}
      >
        {titleContent}
      </button>
    );
  }

  return (
    <>
      <div className={`w-full shadow-sm ${item.done && 'opacity-50'}`}>
        <div className='flex flex-1'>
          <div
            className={`flex w-4 shrink-0 items-center justify-center rounded-l-md text-sm font-medium ${colorClass}`}
          ></div>
          <div
            className={
              'flex flex-1 items-center justify-between rounded-r-md border-y border-r border-gray-200 bg-white'
            }
          >
            <div className='px-4 py-2 text-sm'>{titleElement}</div>
            {isCollapsible && (
              <button
                type='button'
                className='mr-2 rounded-md p-1 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet focus-visible:ring-offset-2'
                onClick={onClickCollapse}
                data-testid='RoadmapItem-button'
                aria-expanded={!isCollapsed}
                aria-controls={collapsibleContentId}
                aria-label={`${isCollapsed ? 'Expand' : 'Collapse'} ${item.title}`}
              >
                <IconArrowRight className={`h-4 ${isCollapsed ? 'rotate-90' : '-rotate-90'}`} />
              </button>
            )}
          </div>
        </div>
      </div>
      {isDescriptionVisible && (
        <Modal title={item.title} onModalClose={() => setIsDescriptionVisible(false)}>
          <div className='prose'>{item.description}</div>
        </Modal>
      )}
    </>
  );
}
