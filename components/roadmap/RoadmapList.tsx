// Since a RoadmapList may contain other RoadmapItems, we need to import RoadmapItem to display them.
/* eslint-disable import/no-cycle*/
import React from 'react';

import RoadmapItem from './RoadmapItem';

interface IRoadmapListProps {
  colorClass: string;
  className?: string;
  items?: {
    solutions?: any[];
    implementations?: any[];
    done?: boolean;
    url?: string;
    description?: string;
    title: string;
  }[];
  showConnector?: boolean;
  collapsed?: boolean;
  childrenCollapsed?: boolean;
}

/**
 * @description RoadmapList is a component to display a list of roadmap items.
 * @param {string} props.colorClass - The color class for styling.
 * @param {string} props.className='mt-3' - The optional CSS class name.
 * @param {object[]} props.items=[] - The array of roadmap items.
 * @param {boolean} props.showConnector=true - Whether to show the connector.
 * @param {boolean} props.collapsed=false - Whether the list is collapsed.
 * @param {boolean} props.childrenCollapsed=true - Whether children items are collapsed.
 */
export default function RoadmapList({
  colorClass,
  className = 'mt-3',
  items = [],
  showConnector = true,
  collapsed = false,
  childrenCollapsed = true
}: IRoadmapListProps) {
  return (
    items &&
    items.length && (
      <ul className={className} data-testid='RoadmapList-list'>
        {!collapsed &&
          items.map((item, index) => (
            <RoadmapItem
              key={index}
              item={item}
              colorClass={colorClass}
              showConnector={showConnector}
              collapsed={childrenCollapsed}
            />
          ))}
      </ul>
    )
  );
}
