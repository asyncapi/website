export default function RoadmapItem({ url, title, colorClass }) {
  return (
    <li className="mt-2 flex shadow-sm rounded-md">
      <a href={url} target="_blank" className={`flex-shrink-0 flex items-center justify-center w-4 text-sm font-medium rounded-l-md ${colorClass}`}>

      </a>
      <div className="flex-1 flex items-center justify-between border-t border-r border-b border-gray-200 bg-white rounded-r-md">
        <div className="flex-1 px-4 py-2 text-sm">
          <a href={url} target="_blank" className="block text-gray-900 font-medium hover:text-gray-600">{title}</a>
        </div>
      </div>
    </li>
  )
}