import RoadmapList from "./RoadmapList"

export default function RoadmapColumn({ title, description, colorClass, items = [] }) {
  return (
    <div className="mt-8 lg:mt-4">
      <div className="p-4">
        <h3 className="text-md font-semibold uppercase text-center">{title}</h3>
        <p className="text-center text-sm text-gray-600 mt-2">{description}</p>
      </div>
      <RoadmapList
        items={items}
        colorClass={colorClass}
        showConnector={false}
      />
    </div>
  )
}