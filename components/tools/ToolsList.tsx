import React from 'react';

import type { ToolsListData } from '@/types/components/tools/ToolDataType';
import { HeadingTypeStyle } from '@/types/typography/Heading';
import { ParagraphTypeStyle } from '@/types/typography/Paragraph';

import Heading from '../typography/Heading';
import Paragraph from '../typography/Paragraph';
import ToolsCard from './ToolsCard';

interface ToolsListProp {
  toolsListData: ToolsListData;
}

/**
 * @description This component displays list of tools.
 *
 * @param {ToolsListProp} props - Props for the ToolsList component.
 * @param {ToolsListData} props.toolsListData - List of Tools.
 */
export default function ToolsList({ toolsListData }: ToolsListProp) {
  return (
    <div className='' data-testid='ToolsList-main'>
      {Object.keys(toolsListData).map((categoryName, index) => {
        if (toolsListData[categoryName].toolsList.length > 0) {
          return (
            <div className='my-8' key={index} id={categoryName} ref={toolsListData[categoryName].elementRef}>
              <Heading typeStyle={HeadingTypeStyle.mdSemibold} className='my-2'>
                {categoryName}
              </Heading>
              <Paragraph typeStyle={ParagraphTypeStyle.md}>{toolsListData[categoryName].description}</Paragraph>
              <hr className='my-8' />
              <div className='flex grid-cols-3 flex-col gap-8 lg:grid'>
                {toolsListData[categoryName].toolsList.map((tool, toolIndex) => (
                  <ToolsCard key={toolIndex} toolData={tool} />
                ))}
              </div>
            </div>
          );
        }

        return null;
      })}
    </div>
  );
}
