import React, { useState } from 'react';

// Since a roadmap item can contain nested roadmap lists, we need to import RoadmapList to display them.
/* eslint-disable import/no-cycle*/
import RoadmapList from './RoadmapList';
import Pill from './RoadmapPill';

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
 * @param {object} props.item - The roadmap item.
 * @param {boolean} props.item.done - Whether the item is done.
 * @param {string} props.item.url - The URL associated with the item.
 * @param {string} props.item.description - The description of the item.
 * @param {string} props.item.title - The title of the item.
 * @param {string} props.colorClass - The color class for styling.
 * @param {boolean} props.showConnector - Whether to show the connector.
 * @param {boolean} props.collapsed - Whether the list is collapsed.
 */
export default function RoadmapItem({ item, colorClass, showConnector = true, collapsed = true }: IRoadmapItemProps) {
  const [isCollapsed, setIsCollapsed] = useState(collapsed);
  const isCollapsible = item.solutions !== undefined;

  const connectorClasses = 'border-l-2 border-dashed border-gray-300';
  const classNames = `pt-2 ${showConnector && connectorClasses}`;

  return (
    <li className={classNames} data-testid='RoadmapItem-list'>
      <div className='flex'>
        {showConnector && (
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
        <RoadmapList className='ml-2 pt-3' colorClass='bg-blue-400' items={item.solutions} collapsed={false} />
      )}

      {!isCollapsed && item?.implementations?.length && (
        <RoadmapList className='ml-9 pt-3' colorClass='bg-black' items={item.implementations} collapsed={false} />
      )}
    </li>
  );
}
