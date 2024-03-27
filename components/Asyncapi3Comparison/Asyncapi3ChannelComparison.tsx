import React, { useState } from 'react';

export interface HoverState {
  Paths: boolean;
  PathItem: boolean;
  Operation: boolean;
  Message: boolean;
}

export interface AsyncAPI3ChannelComparisonProps {
  className?: string;
}

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

  const handleMouseEnter = (key: keyof HoverState) => {
    setHoverState((prevState) => ({ ...prevState, [key]: true }));
  };

  const handleMouseLeave = (key: keyof HoverState) => {
    setHoverState((prevState) => ({ ...prevState, [key]: false }));
  };

  return (
    <div className={`${className} flex flex-col flex-wrap gap-1 text-center md:flex-row`}>
      <div className='ml-1 flex-1 border border-black p-2'>
        <h3 className='mb-4 ml-2 font-sans text-lg font-medium'>AsyncAPI 2.x</h3>
        <div>
          <div
            className={`${hoverState.Paths ? 'bg-yellow-100' : ' '} m-2 border border-yellow-300 p-2`}
            onMouseEnter={() => handleMouseEnter('Paths')}
            onMouseLeave={() => handleMouseLeave('Paths')}
          >
            Channels
            <div className='flex flex-1 flex-wrap'>
              <div
                className={`${hoverState.PathItem ? 'bg-yellow-300' : 'bg-white'} m-2 border border-yellow-600 p-2`}
                onMouseOver={() => handleMouseEnter('PathItem')}
                onMouseLeave={() => handleMouseLeave('PathItem')}
              >
                Channel Item
                <div className='flex flex-1 flex-wrap'>
                  <div
                    className={`${hoverState.Operation ? 'bg-orange-100' : 'bg-white '} m-2 flex-1 border border-orange-300 p-2`}
                    onMouseOver={() => handleMouseEnter('Operation')}
                    onMouseLeave={() => handleMouseLeave('Operation')}
                  >
                    Operation (Publish and Subscribe)
                    <div className='flex flex-1 flex-col flex-wrap'>
                      <div className='flex flex-1 flex-wrap'>
                        <div
                          className={`${hoverState.Message ? 'bg-red-400' : 'bg-white'} m-2 flex-1 border border-red-600 p-2`}
                          onMouseEnter={() => handleMouseEnter('Message')}
                          onMouseLeave={() => handleMouseLeave('Message')}
                        >
                          Messages
                          <div className='m-2 mr-1 box-border flex-1 border border-black p-2'>
                            Message
                            <div className='m-2 mr-1 box-border flex-1 border border-black p-2'>Headers</div>
                            <div className='m-2 mr-1 box-border flex-1 border border-black p-2'>Payload</div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className='ml-1 flex-1 border border-black p-2'>
        <h3 className='mb-4 ml-2 font-sans text-lg font-medium'>AsyncAPI 3.0</h3>
        <div>
          <div
            className={`${hoverState.Paths ? 'bg-yellow-100' : ' '} m-2 border border-yellow-300 p-2`}
            onMouseEnter={() => handleMouseEnter('Paths')}
            onMouseLeave={() => handleMouseLeave('Paths')}
          >
            Channels
            <div
              className={`${hoverState.PathItem ? 'bg-yellow-300' : 'bg-white'} m-2 border border-yellow-600 p-2`}
              onMouseOver={() => handleMouseEnter('PathItem')}
              onMouseLeave={() => handleMouseLeave('PathItem')}
            >
              Channel
              <div className='flex flex-1 flex-col flex-wrap'>
                <div
                  className={`${hoverState.Message ? 'bg-red-400' : 'bg-white'} m-2 flex-1 border border-red-600 p-2`}
                  onMouseEnter={() => handleMouseEnter('Message')}
                  onMouseLeave={() => handleMouseLeave('Message')}
                >
                  Messages
                  <div className='m-2 mr-1 box-border flex-1 border border-black p-2'>
                    Message
                    <div className='m-2 mr-1 box-border flex-1 border border-black p-2'>Headers</div>
                    <div className='m-2 mr-1 box-border flex-1 border border-black p-2'>Payload</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div
            className={`${hoverState.Operation ? 'bg-yellow-100' : ' '} m-2 border border-yellow-300 p-2`}
            onMouseEnter={() => handleMouseEnter('Operation')}
            onMouseLeave={() => handleMouseLeave('Operation')}
          >
            Operations
            <div className='flex flex-1 flex-wrap'>
              <div className='m-2 flex-1 border border-orange-300 p-2'>
                Operation
                <div className='flex flex-1 flex-col flex-wrap'>
                  <div className='m-2 border border-blue-500 bg-white p-2 hover:bg-blue-200'>
                    action (send or receive)
                  </div>
                  <div className='m-2 border border-blue-500 bg-white p-2 hover:bg-blue-200'>channel</div>
                  <div className='m-2 border border-blue-500 bg-white p-2 hover:bg-blue-200'>messages</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
