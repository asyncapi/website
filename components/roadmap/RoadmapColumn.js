import Heading from "../typography/Heading"
import Paragraph from "../typography/Paragraph"
import RoadmapList from "./RoadmapList"

export default function RoadmapColumn({
  title,
  description,
  colorClass,
  items = [],
  childrenCollapsed = true,
}) {
  return (
    <div className="mt-8 lg:mt-4">
      <div className="p-4 text-center">
        <Heading level="h3" typeStyle="heading-sm-semibold">{title}</Heading>
        <Paragraph typeStyle="body-md" className="mt-2">{description}</Paragraph>
      </div>
      <RoadmapList
        items={items}
        colorClass={colorClass}
        showConnector={false}
        childrenCollapsed={childrenCollapsed}
      />
    </div>
  )
}