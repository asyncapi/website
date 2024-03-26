import React, { useState } from 'react';

export interface Asyncapi3SchemaFormatComparisonProps {
  className?: string;
}

/**
 * @description React component for comparing AsyncAPI schema formats between versions 2.x and 3.0.
 * @param {string} [props.className=''] - Additional CSS classes for styling.
 */
export default function Asyncapi3SchemaFormatComparison({ className = '' }: Asyncapi3SchemaFormatComparisonProps) {
  const [hoverState, setHoverState] = useState({
    SchemaFormat: false,
    Payload: false,
    Schema: false
  });

  return (
    <div className={`${className} flex flex-col flex-wrap gap-1 text-center md:flex-row`}>
      <div className='ml-1 flex-1 border border-black p-2'>
        <h3 className='mb-4 ml-2 font-sans text-lg font-medium'>AsyncAPI 2.x</h3>
        <div>
          <div className={'m-2 border border-yellow-300 p-2'}>
            components | channels
            <div className='flex flex-1 flex-wrap'>
              <div className={'m-2 border border-yellow-600 bg-white p-2'}>
                messages
                <div className='flex flex-1 flex-wrap'>
                  <div className={'m-2 border border-yellow-600 bg-white p-2'}>
                    message
                    <div className='flex flex-1 flex-wrap'>
                      <div
                        className={`${hoverState.SchemaFormat ? 'bg-orange-100' : 'bg-white '} m-2 flex-1 border border-orange-300 p-2`}
                        onMouseOver={() => setHoverState((prevState) => ({ ...prevState, SchemaFormat: true }))}
                        onMouseLeave={() => setHoverState((prevState) => ({ ...prevState, SchemaFormat: false }))}
                      >
                        schemaFormat
                      </div>
                      <div
                        className={`${hoverState.Payload ? 'bg-yellow-300' : 'bg-white'} m-2 flex-1 border border-yellow-600 p-2`}
                        onMouseOver={() => setHoverState((prevState) => ({ ...prevState, Payload: true }))}
                        onMouseLeave={() => setHoverState((prevState) => ({ ...prevState, Payload: false }))}
                      >
                        payload
                        <div className='flex flex-1 flex-wrap'>
                          <div
                            className={`${hoverState.Schema ? 'bg-blue-300' : 'bg-white'} m-2 flex-1 border border-orange-300 p-2`}
                            onMouseOver={() => setHoverState((prevState) => ({ ...prevState, Schema: true }))}
                            onMouseLeave={() => setHoverState((prevState) => ({ ...prevState, Schema: false }))}
                          >
                            schema
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
          <div className={'m-2 border border-yellow-300 p-2'}>
            components | channels
            <div className='flex flex-1 flex-wrap'>
              <div className={'m-2 border border-yellow-600 bg-white p-2'}>
                messages
                <div className='flex flex-1 flex-wrap'>
                  <div className={'m-2 border border-yellow-600 bg-white p-2'}>
                    message
                    <div className='flex flex-1 flex-wrap'>
                      <div
                        className={`${hoverState.Payload ? 'bg-yellow-300' : 'bg-white'} m-2 border border-yellow-600 p-2`}
                        onMouseOver={() => setHoverState((prevState) => ({ ...prevState, Payload: true }))}
                        onMouseLeave={() => setHoverState((prevState) => ({ ...prevState, Payload: false }))}
                      >
                        payload
                        <div className='flex flex-1 flex-wrap'>
                          <div
                            className={`${hoverState.SchemaFormat ? 'bg-orange-100' : 'bg-white '} m-2 flex-1 border border-orange-300 p-2`}
                            onMouseOver={() => setHoverState((prevState) => ({ ...prevState, SchemaFormat: true }))}
                            onMouseLeave={() => setHoverState((prevState) => ({ ...prevState, SchemaFormat: false }))}
                          >
                            schemaFormat
                          </div>
                          <div
                            className={`${hoverState.Schema ? 'bg-blue-300' : 'bg-white'} m-2 flex-1 border border-orange-300 p-2`}
                            onMouseOver={() => setHoverState((prevState) => ({ ...prevState, Schema: true }))}
                            onMouseLeave={() => setHoverState((prevState) => ({ ...prevState, Schema: false }))}
                          >
                            schema
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
    </div>
  );
}
