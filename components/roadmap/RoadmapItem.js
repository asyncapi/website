import { useState } from "react"
import RoadmapList from "./RoadmapList"
import IconArrowRight from '../icons/ArrowRight'
import Modal from '../Modal'

export default function RoadmapItem({
  item,
  colorClass,
  showConnector = true,
  collapsed = true,
}) {
  const [isCollapsed, setIsCollapsed] = useState(collapsed)
  const isCollapsible = item.solutions || item.implementations

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
        <Pill
          item={item}
          colorClass={colorClass}
          isCollapsed={isCollapsed}
          isCollapsible={isCollapsible}
          onClickCollapse={() => setIsCollapsed(!isCollapsed)}
        />
      </div>
      
      {!isCollapsed && item?.solutions?.length && (
        <RoadmapList
          className="pt-3 ml-2"
          colorClass="bg-blue-400"
          items={item.solutions}
          collapsed={false}
        />
      )}

      {!isCollapsed && item?.implementations?.length && (
        <RoadmapList
          className="pt-3 ml-9"
          colorClass="bg-black"
          items={item.implementations}
          collapsed={false}
        />
      )}
    </li>
  )
}

function Pill ({
  item,
  colorClass = '',
  isCollapsible = false,
  isCollapsed = false,
  onClickCollapse = () => {},
}) {
  const [isDescriptionVisible, setIsDescriptionVisible] = useState(false)

  return (
    <>
      <div className={`shadow-sm w-full ${item.done && 'opacity-50'}`}>
        <div className="flex flex-1">
          <div className={`flex-shrink-0 flex items-center justify-center w-4 text-sm font-medium rounded-l-md ${colorClass}`}></div>
          <div className={`flex-1 flex items-center justify-between border-t border-r border-b border-gray-200 bg-white rounded-r-md`}>
            <div className="px-4 py-2 text-sm">
              <a href={item.url} rel="noopener noreferrer" onClick={() => !item.url && item.description && setIsDescriptionVisible(true)} className={`block text-gray-900 text-left font-medium ${item.description || item.url ? 'hover:text-gray-600 cursor-pointer' : 'cursor-default'}`}>
                {
                  item.done && (
                    <span title="Done!">
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="inline-block mr-2 -mt-0.5 w-6 h-6 text-green-600">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </span>
                  )
                }
                <span>{ item.title }</span>
              </a>
            </div>
            {isCollapsible && (
              <button className="mr-2" onClick={onClickCollapse}>
                <IconArrowRight className={`h-4 transform ${isCollapsed ? 'rotate-90' : '-rotate-90'}`} />
              </button>
            )}
          </div>
        </div>
      </div>
      {
        isDescriptionVisible && (
          <Modal title={item.title} onModalClose={() => setIsDescriptionVisible(false)}>
            <div className="prose">{item.description}</div>
          </Modal>
        )
      }
    </>
  )
}