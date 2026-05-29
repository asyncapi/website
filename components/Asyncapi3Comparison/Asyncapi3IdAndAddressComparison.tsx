import React, { useState } from 'react';

import { Column, HoverBox } from './ComparisonCommon';

export interface HoverState {
  Paths: boolean;
  PathItem: boolean;
}

export interface AsyncAPI3IdAndAddressComparisonProps {
  className?: string;
}

/**
 * @description Component for comparing AsyncAPI versions based on ID and address.
 * @param {string} [props.className=''] - Additional CSS classes for styling.
 */
export default function Asyncapi3IdAndAddressComparison({ className = '' }: AsyncAPI3IdAndAddressComparisonProps) {
  const [hoverState, setHoverState] = useState<HoverState>({
    Paths: false,
    PathItem: false
  });

  return (
    <div className={`${className} flex flex-col flex-wrap gap-1 text-center md:flex-row`}>
      <Column title='AsyncAPI 2.x'>
        <HoverBox<HoverState>
          label='Channels'
          fieldKey='Paths'
          hoverState={hoverState}
          setHoverState={setHoverState}
          activeClass='bg-yellow-100 dark:bg-yellow-900/40'
          defaultClass=' '
          borderClass='border-yellow-300 dark:border-yellow-700'
        >
          <HoverBox<HoverState>
            label='Channel Item'
            fieldKey='PathItem'
            hoverState={hoverState}
            setHoverState={setHoverState}
            activeClass='bg-yellow-300 dark:bg-yellow-800/60'
            borderClass='border-yellow-600 dark:border-yellow-700'
            useMouseOver
          />
        </HoverBox>
      </Column>

      <Column title='AsyncAPI 3.0'>
        <HoverBox<HoverState>
          label='Channels'
          fieldKey='Paths'
          hoverState={hoverState}
          setHoverState={setHoverState}
          activeClass='bg-yellow-100 dark:bg-yellow-900/40'
          defaultClass=' '
          borderClass='border-yellow-300 dark:border-yellow-700'
        >
          <HoverBox<HoverState>
            label='Channel'
            fieldKey='PathItem'
            hoverState={hoverState}
            setHoverState={setHoverState}
            activeClass='bg-yellow-300 dark:bg-yellow-800/60'
            borderClass='border-yellow-600 dark:border-yellow-700'
            useMouseOver
          >
            <div className='flex flex-1 flex-col flex-wrap'>
              <div className='m-2 border border-blue-500 bg-white p-2 hover:bg-blue-200 dark:border-blue-400 dark:bg-gray-900 dark:hover:bg-blue-900/50'>
                address
              </div>
            </div>
          </HoverBox>
        </HoverBox>
      </Column>
    </div>
  );
}
