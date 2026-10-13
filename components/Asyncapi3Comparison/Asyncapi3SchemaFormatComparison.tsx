import React, { useState } from 'react';

import { Column, HoverBox } from '../ComparisonCommon';

export interface Asyncapi3SchemaFormatComparisonProps {
  className?: string;
}

export interface HoverState {
  SchemaFormat: boolean;
  Payload: boolean;
  Schema: boolean;
}

/**
 * @description React component for comparing AsyncAPI schema formats between versions 2.x and 3.0.
 * @param {string} [props.className=''] - Additional CSS classes for styling.
 */
export default function Asyncapi3SchemaFormatComparison({ className = '' }: Asyncapi3SchemaFormatComparisonProps) {
  const [hoverState, setHoverState] = useState<HoverState>({
    SchemaFormat: false,
    Payload: false,
    Schema: false
  });

  const renderSchemaFormat = () => (
    <HoverBox<HoverState>
      label='schemaFormat'
      fieldKey='SchemaFormat'
      hoverState={hoverState}
      setHoverState={setHoverState}
      activeClass='bg-orange-100 dark:bg-orange-900/40'
      borderClass='border-orange-300 dark:border-orange-700'
      className='flex-1'
      useMouseOver
      focusable
    />
  );

  const renderSchema = () => (
    <HoverBox<HoverState>
      label='schema'
      fieldKey='Schema'
      hoverState={hoverState}
      setHoverState={setHoverState}
      activeClass='bg-blue-300 dark:bg-blue-900/60'
      borderClass='border-orange-300 dark:border-orange-700'
      className='flex-1'
      useMouseOver
      focusable
    />
  );

  return (
    <div className={`${className} flex flex-col flex-wrap gap-1 text-center md:flex-row`}>
      <Column title='AsyncAPI 2.x'>
        <div className='m-2 border border-yellow-300 p-2 dark:border-yellow-700'>
          components | channels
          <div className='flex flex-1 flex-wrap'>
            <div className='m-2 border border-yellow-600 bg-white p-2 dark:border-yellow-700 dark:bg-gray-900'>
              messages
              <div className='flex flex-1 flex-wrap'>
                <div className='m-2 border border-yellow-600 bg-white p-2 dark:border-yellow-700 dark:bg-gray-900'>
                  message
                  <div className='flex flex-1 flex-wrap'>
                    {renderSchemaFormat()}
                    <HoverBox<HoverState>
                      label='payload'
                      fieldKey='Payload'
                      hoverState={hoverState}
                      setHoverState={setHoverState}
                      activeClass='bg-yellow-300 dark:bg-yellow-800/60'
                      borderClass='border-yellow-600 dark:border-yellow-700'
                      className='flex-1'
                    >
                      <div className='flex flex-1 flex-wrap'>{renderSchema()}</div>
                    </HoverBox>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Column>

      <Column title='AsyncAPI 3.0'>
        <div className='m-2 border border-yellow-300 p-2 dark:border-yellow-700'>
          components | channels
          <div className='flex flex-1 flex-wrap'>
            <div className='m-2 border border-yellow-600 bg-white p-2 dark:border-yellow-700 dark:bg-gray-900'>
              messages
              <div className='flex flex-1 flex-wrap'>
                <div className='m-2 border border-yellow-600 bg-white p-2 dark:border-yellow-700 dark:bg-gray-900'>
                  message
                  <div className='flex flex-1 flex-wrap'>
                    <HoverBox<HoverState>
                      label='payload'
                      fieldKey='Payload'
                      hoverState={hoverState}
                      setHoverState={setHoverState}
                      activeClass='bg-yellow-300 dark:bg-yellow-800/60'
                      borderClass='border-yellow-600 dark:border-yellow-700'
                      className='flex-1'
                    >
                      <div className='flex flex-1 flex-wrap'>
                        {renderSchemaFormat()}
                        {renderSchema()}
                      </div>
                    </HoverBox>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Column>
    </div>
  );
}
