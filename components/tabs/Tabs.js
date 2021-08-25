import { useState } from "react";

export default function Tabs({ tabs = [], className = '' }) {
  const filteredTabs = tabs.filter(Boolean);
  const [showTab, seShowTab] = useState(filteredTabs[0].id);

  const tabItemsCommonClassNames = 'inline-block border-teal-300 pt-3 pb-1 px-2 mx-px cursor-pointer hover:text-teal-300 font-bold'
  const tabItemsClassNames = `${tabItemsCommonClassNames} text-gray-300`
  const tabItemsActiveClassNames = `${tabItemsCommonClassNames} text-teal-300 border-b-2`

  return (
    <div className={`flex flex-col ${className}`}>
      <ul className="flex-none flex text-xs rounded-t bg-code-editor-dark pl-1">
        {filteredTabs.map(({ id }) => (
          <li 
            onClick={() => seShowTab(id)}
            className={id === showTab ? tabItemsActiveClassNames : tabItemsClassNames}
          >
            {id}
          </li>
        ))}
      </ul>
      <div className="flex-grow">
        {filteredTabs.map(({ content, id }) => (
          <div className={`h-full ${id === showTab ? '' : 'hidden'}`}>
            {content}
          </div>
        ))}
      </div>
    </div>
  );
}