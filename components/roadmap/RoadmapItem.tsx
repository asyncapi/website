import { useState } from 'react';

import IconArrowRight from '../icons/ArrowRight';
import Modal from '../Modal';
/* eslint-disable import/no-cycle*/
import RoadmapList from './RoadmapList';

interface IPillProps {
  item: {
    done?: boolean;
    url?: string;
    description?: string;
    title: string;
  };
  colorClass?: string;
  isCollapsible?: boolean;
  isCollapsed?: boolean;
  onClickCollapse?: () => void;
}

/**
 * @description Pill is a component to display a roadmap item.
 * @param {PillProps} props - The props for the Pill component.
 */
function Pill({
  item,
  colorClass = '',
  isCollapsible = false,
  isCollapsed = false,
  onClickCollapse = () => {}
}: IPillProps) {
  const [isDescriptionVisible, setIsDescriptionVisible] = useState(false);

  return (
    <>
      <div className={`w-full shadow-sm ${item.done && 'opacity-50'}`}>
        <div className='flex flex-1'>
          <div className={`flex w-4 shrink-0 items-center justify-center rounded-l-md text-sm font-medium ${colorClass}`}></div>
          <div className={'flex flex-1 items-center justify-between rounded-r-md border-y border-r border-gray-200 bg-white'}>
            <div className='px-4 py-2 text-sm'>
              <a href={item.url} rel='noopener noreferrer' onClick={() => !item.url && item.description && setIsDescriptionVisible(true)} className={`block text-left font-medium text-gray-900 ${item.description || item.url ? 'cursor-pointer hover:text-gray-600' : 'cursor-default'}`}>
                {
                  item.done && (
                    <span title='Done!'>
                      <svg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' strokeWidth={1.5} stroke='currentColor' className='-mt-0.5 mr-2 inline-block size-6 text-green-600'>
                        <path strokeLinecap='round' strokeLinejoin='round' d='M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z' />
                      </svg>
                    </span>
                  )
                }
                <span>{ item.title }</span>
              </a>
            </div>
            {isCollapsible && (
              <button className='mr-2' onClick={onClickCollapse} data-testid='RoadmapItem-button'>
                <IconArrowRight className={`h-4${isCollapsed ? 'rotate-90' : '-rotate-90'}`} />
              </button>
            )}
          </div>
        </div>
      </div>
      {
        isDescriptionVisible && (
          <Modal title={item.title} onModalClose={() => setIsDescriptionVisible(false)}>
            <div className='prose'>{item.description}</div>
          </Modal>
        )
      }
    </>
  );
}

export interface IRoadmapItemProps {
  item: {
    solutions?: any[];
    implementations?: any[];
    done?: boolean;
    url?: string;
    description?: string;
    title: string;
  };
  colorClass: string;
  showConnector?: boolean;
  collapsed?: boolean;
}

/**
 * @description RoadmapItem is a component to display a roadmap item.
 * @param {RoadmapItemProps} props - The props for the RoadmapItem component.
 */
export default function RoadmapItem({
  item,
  colorClass,
  showConnector = true,
  collapsed = true
}: IRoadmapItemProps) {
  const [isCollapsed, setIsCollapsed] = useState(collapsed);
  const isCollapsible = (item.solutions !== null) || (item.implementations !== null);

  const connectorClasses = 'border-l-2 border-dashed border-gray-300';
  const classNames = `pt-2 ${showConnector && connectorClasses}`;

  return (
    <li className={classNames} data-testid='RoadmapItem-list'>
      <div className='flex'>
        { showConnector && (
          <div className='flex flex-col justify-center'>
            <div className='my-2 ml-0 mr-2 h-1 w-5 border-b-2 border-dashed border-gray-300'></div>
          </div>
        )}
        <Pill
          item={item}
          colorClass={colorClass}
          isCollapsed={isCollapsed}
          isCollapsible={isCollapsible}
          onClickCollapse={() => setIsCollapsed(!isCollapsed)}
        />
      </div>

      {!isCollapsed && item?.solutions?.length && (
        <RoadmapList
          className='ml-2 pt-3'
          colorClass='bg-blue-400'
          items={item.solutions}
          collapsed={false}
        />
      )}

      {!isCollapsed && item?.implementations?.length && (
        <RoadmapList
          className='ml-9 pt-3'
          colorClass='bg-black'
          items={item.implementations}
          collapsed={false}
        />
      )}
    </li>
  );
}
