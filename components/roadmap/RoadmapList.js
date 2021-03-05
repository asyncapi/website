import { useState } from "react";
import RoadmapItem from "./RoadmapItem";

export default function RoadmapList({
  colorClass,
  className = 'mt-3',
  items = [],
  showConnector = true,
  collapsed = false,
  collapsible = false,
}) {
  const [isCollapsed, setIsCollapsed] = useState(collapsed)

  const text = isCollapsed ? 'Show more' : 'Show less'

  return (
    items && (
      <>
        { collapsible && (
          <div className="text-right">
            <button onClick={() => setIsCollapsed(!isCollapsed)} className="text-center text-xxs border-b border-dashed border-gray-300 py-0.5 uppercase">{text}</button>
          </div>
        )}
        <ul className={className}>
          { (!collapsible || !isCollapsed) && (
            items.map((item, index) => (
              <RoadmapItem
                key={index}
                item={item}
                colorClass={colorClass}
                showConnector={showConnector}
              />
            ))
          )}
        </ul>
      </>
    )
  )
}