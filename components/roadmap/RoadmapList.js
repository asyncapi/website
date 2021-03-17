import RoadmapItem from "./RoadmapItem"

export default function RoadmapList({
  colorClass,
  className = 'mt-3',
  items = [],
  showConnector = true,
  collapsed = false,
  childrenCollapsed = true,
}) {
  return (
    items && items.length && (
      <ul className={className}>
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
  )
}