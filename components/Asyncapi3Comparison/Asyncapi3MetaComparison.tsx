import React, { useState } from 'react';

import { Column, HoverBox } from './ComparisonCommon';

export interface Asyncapi3MetaComparisonProps {
  className?: string;
}

export interface HoverState {
  Info: boolean;
  Tags: boolean;
  External: boolean;
}

/**
 * @description React component for comparing AsyncAPI metadata between versions 2.x and 3.0.
 * @param {string} [props.className=''] - Additional CSS classes for styling.
 */
export default function Asyncapi3MetaComparison({ className = '' }: Asyncapi3MetaComparisonProps) {
  const [hoverState, setHoverState] = useState<HoverState>({
    Info: false,
    Tags: false,
    External: false
  });

  return (
    <div className={`${className} flex flex-col flex-wrap gap-1 text-center md:flex-row`}>
      <Column title='AsyncAPI 2.x'>
        <HoverBox<HoverState>
          label='Info'
          fieldKey='Info'
          hoverState={hoverState}
          setHoverState={setHoverState}
          activeClass='bg-blue-100 dark:bg-blue-900/40'
          borderClass='border-blue-300 dark:border-blue-700'
        />
        <div className='flex flex-1 flex-wrap'>
          <HoverBox<HoverState>
            label='Tags'
            fieldKey='Tags'
            hoverState={hoverState}
            setHoverState={setHoverState}
            activeClass='bg-pink-300 dark:bg-pink-900/60'
            borderClass='border-black dark:border-gray-600'
            className='flex-1'
            focusable
          />
          <HoverBox<HoverState>
            label='External Docs'
            fieldKey='External'
            hoverState={hoverState}
            setHoverState={setHoverState}
            activeClass='bg-green-500 dark:bg-green-900/60'
            borderClass='border-black dark:border-gray-600'
            className='flex-1'
            focusable
          />
        </div>
      </Column>

      <Column title='AsyncAPI 3.0'>
        <HoverBox<HoverState>
          label='Info'
          fieldKey='Info'
          hoverState={hoverState}
          setHoverState={setHoverState}
          activeClass='bg-blue-100 dark:bg-blue-900/40'
          borderClass='border-blue-300 dark:border-blue-700'
        >
          <div className='flex flex-1 flex-wrap'>
            <HoverBox<HoverState>
              label='Tags'
              fieldKey='Tags'
              hoverState={hoverState}
              setHoverState={setHoverState}
              activeClass='bg-pink-300 dark:bg-pink-900/60'
              borderClass='border-black dark:border-gray-600'
              className='flex-1'
              focusable
            />
            <HoverBox<HoverState>
              label='External Docs'
              fieldKey='External'
              hoverState={hoverState}
              setHoverState={setHoverState}
              activeClass='bg-green-500 dark:bg-green-900/60'
              borderClass='border-black dark:border-gray-600'
              className='flex-1'
              focusable
            />
          </div>
        </HoverBox>
      </Column>
    </div>
  );
}
