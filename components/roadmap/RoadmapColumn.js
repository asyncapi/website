import Heading from "../typography/Heading"
import Paragraph from "../typography/Paragraph"
import RoadmapList from "./RoadmapList"

export default function RoadmapColumn({
  title,
  description,
  colorClass,
  items = [],
  childrenCollapsed = false,
}) {
  return (
    <div className="mt-8 lg:mt-4">
      <div className="p-4 text-center" data-testid="RoadmapColumn-heading">
        <Heading level="h3" typeStyle="heading-sm-semibold" >{title}</Heading>
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