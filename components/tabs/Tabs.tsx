import React, { useState } from 'react';

export interface Tab {
  id: string;
  content: React.ReactNode;
}

export interface TabsProps {
  tabs?: Tab[];
  className?: string;
}

/**
 * @description Tabs component to display a set of tabs with associated content.
 * @param {Tab[]} [tabs=[]] - An array of tab objects.
 * @param {string} [className=''] - Additional CSS classes to apply to the Tabs component.
 */
export default function Tabs({ tabs = [], className = '' }: TabsProps): React.ReactElement {
  const filteredTabs = tabs.filter(Boolean);
  const [showTab, setShowTab] = useState(filteredTabs[0]?.id);

  const tabItemsCommonClassNames =
    'inline-block border-teal-300 pt-3 pb-1 px-2 mx-px cursor-pointer hover:text-teal-300 font-bold';
  const tabItemsClassNames = `${tabItemsCommonClassNames} text-gray-300`;
  const tabItemsActiveClassNames = `${tabItemsCommonClassNames} text-teal-300 border-b-2`;

  return (
    <div className={`flex flex-col ${className}`}>
      <ul className='flex flex-none rounded-t bg-code-editor-dark pl-1 text-xs'>
        {filteredTabs.map(({ id }) => (
          <li
            key={id}
            onClick={() => setShowTab(id)}
            className={id === showTab ? tabItemsActiveClassNames : tabItemsClassNames}
          >
            {id}
          </li>
        ))}
      </ul>
      <div className='grow'>
        {filteredTabs.map(({ content, id }) => (
          <div key={id} className={`h-full ${id === showTab ? '' : 'hidden'}`}>
            {content}
          </div>
        ))}
      </div>
    </div>
  );
}
