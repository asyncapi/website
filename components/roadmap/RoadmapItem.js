export default function RoadmapItem({ url, title, bets = [], colorClass }) {
  return (
    <li className="mt-2">
      <div className="flex shadow-sm rounded-md">
        <a href={url} target="_blank" className={`flex-shrink-0 flex items-center justify-center w-4 text-sm font-medium rounded-l-md ${colorClass}`}></a>
        <div className="flex-1 flex items-center justify-between border-t border-r border-b border-gray-200 bg-white rounded-r-md">
          <div className="flex-1 px-4 py-2 text-sm">
            <a href={url} target="_blank" className="block text-gray-900 font-medium hover:text-gray-600">{title}</a>
          </div>
        </div>
      </div>

      <ul className="mt-3">
        {
          bets.map((bet, index) => (
            <li key={index} className="mt-2 flex">
              <div className="border-b-2 border-l-2 border-gray-200 rounded-bl-md w-5 my-2 ml-4 mr-2"></div>
              <div className="flex flex-1 shadow-sm rounded-md">
                <a href={bet.html_url} target="_blank" className="flex-shrink-0 flex items-center justify-center w-4 text-sm font-medium rounded-l-md bg-gray-700"></a>
                <div className="flex-1 flex items-center justify-between border-t border-r border-b border-gray-200 bg-white rounded-r-md">
                  <div className="flex flex-1 px-4 py-2 text-sm">
                    {
                      bet.state === 'closed' && (<span className="text-xs rounded-md px-1.5 py-0.5 mr-2 uppercase font-semibold bg-gray-100 text-pink-600">Done</span>)
                    }
                    <a href={bet.html_url} target="_blank" className="block text-gray-900 font-medium hover:text-gray-600">{bet.title}</a>
                  </div>
                </div>
              </div>
            </li>
          ))
        }
      </ul>
    </li>
  )
}