/* eslint-disable import/no-cycle*/
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
 * @param {RoadmapListProps} props - The props for the RoadmapList component.
 * @returns {JSX.Element} A JSX.Element representing the RoadmapList component.
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
    <>
    items && items.length && (
      <ul className={className} data-testid='RoadmapList-list'>
        { !collapsed && (
          items.map((item, index) => (
            <RoadmapItem
              key={index}
              item={item}
              colorClass={colorClass}
              showConnector={showConnector}
              collapsed={childrenCollapsed}
            />
          ))
        )}
      </ul>
    )
    </>
  );
}
