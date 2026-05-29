import React, { useState } from 'react';

import { Column, HoverBox } from './ComparisonCommon';

export interface HoverState {
  Paths: boolean;
  PathItem: boolean;
  Operation: boolean;
  Message: boolean;
}

export interface AsyncAPI3ChannelComparisonProps {
  className?: string;
}

const MessageDetails = () => (
  <div className='m-2 mr-1 box-border flex-1 border border-black p-2 dark:border-gray-600'>
    Message
    <div className='m-2 mr-1 box-border flex-1 border border-black p-2 dark:border-gray-600'>Headers</div>
    <div className='m-2 mr-1 box-border flex-1 border border-black p-2 dark:border-gray-600'>Payload</div>
  </div>
);

/**
 * @description Component to compare AsyncAPI 2.x and AsyncAPI 3.0 channels.
 * @param {string} [props.className=''] - Additional CSS classes for styling.
 */
export default function Asyncapi3ChannelComparison({ className = '' }: AsyncAPI3ChannelComparisonProps) {
  const [hoverState, setHoverState] = useState<HoverState>({
    Paths: false,
    PathItem: false,
    Operation: false,
    Message: false
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
          <div className='flex flex-1 flex-wrap'>
            <HoverBox<HoverState>
              label='Channel Item'
              fieldKey='PathItem'
              hoverState={hoverState}
              setHoverState={setHoverState}
              activeClass='bg-yellow-300 dark:bg-yellow-800/60'
              borderClass='border-yellow-600 dark:border-yellow-700'
              useMouseOver
            >
              <div className='flex flex-1 flex-wrap'>
                <HoverBox<HoverState>
                  label='Operation (Publish and Subscribe)'
                  fieldKey='Operation'
                  hoverState={hoverState}
                  setHoverState={setHoverState}
                  activeClass='bg-orange-100 dark:bg-orange-900/40'
                  borderClass='border-orange-300 dark:border-orange-700'
                  className='flex-1'
                  useMouseOver
                >
                  <div className='flex flex-1 flex-col flex-wrap'>
                    <div className='flex flex-1 flex-wrap'>
                      <HoverBox<HoverState>
                        label='Messages'
                        fieldKey='Message'
                        hoverState={hoverState}
                        setHoverState={setHoverState}
                        activeClass='bg-red-400 dark:bg-red-900/60'
                        borderClass='border-red-600 dark:border-red-700'
                        className='flex-1'
                      >
                        <MessageDetails />
                      </HoverBox>
                    </div>
                  </div>
                </HoverBox>
              </div>
            </HoverBox>
          </div>
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
              <HoverBox<HoverState>
                label='Messages'
                fieldKey='Message'
                hoverState={hoverState}
                setHoverState={setHoverState}
                activeClass='bg-red-400 dark:bg-red-900/60'
                borderClass='border-red-600 dark:border-red-700'
                className='flex-1'
              >
                <MessageDetails />
              </HoverBox>
            </div>
          </HoverBox>
        </HoverBox>

        <HoverBox<HoverState>
          label='Operations'
          fieldKey='Operation'
          hoverState={hoverState}
          setHoverState={setHoverState}
          activeClass='bg-yellow-100 dark:bg-yellow-900/40'
          defaultClass=' '
          borderClass='border-yellow-300 dark:border-yellow-700'
        >
          <div className='flex flex-1 flex-wrap'>
            <div className='m-2 flex-1 border border-orange-300 p-2 dark:border-orange-700'>
              Operation
              <div className='flex flex-1 flex-col flex-wrap'>
                <div className='m-2 border border-blue-500 bg-white p-2 hover:bg-blue-200 dark:border-blue-400 dark:bg-gray-900 dark:hover:bg-blue-900/50'>
                  action (send or receive)
                </div>
                <div className='m-2 border border-blue-500 bg-white p-2 hover:bg-blue-200 dark:border-blue-400 dark:bg-gray-900 dark:hover:bg-blue-900/50'>
                  channel
                </div>
                <div className='m-2 border border-blue-500 bg-white p-2 hover:bg-blue-200 dark:border-blue-400 dark:bg-gray-900 dark:hover:bg-blue-900/50'>
                  messages
                </div>
              </div>
            </div>
          </div>
        </HoverBox>
      </Column>
    </div>
  );
}
