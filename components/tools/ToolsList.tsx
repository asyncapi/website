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
 * @description This component displays a list of tools.
 *
 * @param {ToolsListProp} props - Props for the ToolsList component.
 * @param {ToolsListData} props.toolsListData - List of Tools.
 */
export default function ToolsList({ toolsListData }: ToolsListProp) {
  return (
    <div className='' data-testid='ToolsList-main'>
      {Object.keys(toolsListData).map((categoryName, index) => {
        const { toolsList, description, elementRef } = toolsListData[categoryName];

        // Use a Set to track unique tool titles and avoid duplicates
        const uniqueTools = new Set();

        if (toolsList.length > 0) {
          return (
            <div className='my-8' key={index} id={categoryName} ref={elementRef}>
              <Heading typeStyle={HeadingTypeStyle.mdSemibold} className='my-2'>
                {categoryName}
              </Heading>
              <Paragraph typeStyle={ParagraphTypeStyle.md}>{description}</Paragraph>
              <hr className='my-8' />
              <div className='flex grid-cols-3 flex-col gap-8 lg:grid'>
                {toolsList.map((tool, toolIndex) => {
                  if (!uniqueTools.has(tool.title)) {
                    uniqueTools.add(tool.title);

                    return <ToolsCard key={tool.id || toolIndex} toolData={tool} />;
                  }

                  return null;
                })}
              </div>
            </div>
          );
        }

        return null;
      })}
    </div>
  );
}
