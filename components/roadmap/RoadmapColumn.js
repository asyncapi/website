import RoadmapItem from "./RoadmapItem";

export default function RoadmapColumn({ title, description, colorClass, items = [] }) {
  return (
    <div className="mt-8 lg:mt-4">
      <div className="p-4">
        <h3 className="text-md font-semibold uppercase text-center">{title}</h3>
        <p className="text-center text-sm text-gray-600 mt-2">{description}</p>
      </div>
      <ul className="mt-3">
        {
          items.map((item, index) => (
            <RoadmapItem
              key={index}
              url={item.url}
              title={item.title}
              bets={item.bets}
              colorClass={colorClass}
            />
          ))
        }
      </ul>
    </div>
  )
}