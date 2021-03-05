import RoadmapList from "./RoadmapList";

export default function RoadmapItem({ item, colorClass, showConnector = true }) {
  const connectorClasses = 'border-l-2 border-dashed border-gray-300'
  const classNames = `pt-2 ${showConnector && connectorClasses}`
  return (
    <li className={classNames}>
      <div className="flex">
        { showConnector && (
          <div className="flex flex-col justify-center">
            <div className="border-b-2 border-dashed border-gray-300 w-5 h-1 my-2 ml-0 mr-2"></div>
          </div>
        )}
        <div className="flex flex-1 shadow-sm rounded-md">
          <a href={item.html_url} target="_blank" className={`flex-shrink-0 flex items-center justify-center w-4 text-sm font-medium rounded-l-md ${colorClass}`}></a>
          <div className="flex-1 flex items-center justify-between border-t border-r border-b border-gray-200 bg-white rounded-r-md">
            <div className="flex flex-1 px-4 py-2 text-sm">
              {
                item.state === 'closed' && (<div className="text-xs rounded-md h-6 px-1.5 py-0.5 mr-2 uppercase font-semibold bg-gray-100 text-pink-600">Done</div>)
              }
              <a href={item.html_url} target="_blank" className="block text-gray-900 font-medium hover:text-gray-600">{item.title}</a>
            </div>
          </div>
        </div>
      </div>
      
      { item.solutions && item.solutions.length && (
        <RoadmapList
          className="pt-3 ml-2"
          colorClass="bg-blue-400"
          items={item.solutions}
        />
      )}

      { item.bets && item.bets.length && (
        <RoadmapList
          className="ml-9"
          colorClass="bg-gray-700"
          items={item.bets}
          collapsible={true}
          collapsed={true}
        />
      )}
    </li>
  )
}