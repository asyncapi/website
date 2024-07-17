import React, { useState } from 'react';

export interface Asyncapi3ParameterComparisonProps {
  className?: string;
}

/**
 * @description React component for comparing AsyncAPI parameters between versions 2.x and 3.0.
 * @param {string} [props.className=''] - Additional CSS classes for styling.
 */
export default function Asyncapi3ParameterComparison({ className = '' }: Asyncapi3ParameterComparisonProps) {
  const [hoverState, setHoverState] = useState({
    location: false,
    description: false,
    enum: false,
    examples: false,
    default: false
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
                parameters
                <div className='flex flex-1 flex-wrap'>
                  <div className={'m-2 border border-yellow-600 bg-white p-2'}>
                    parameter
                    <div className='flex flex-1 flex-wrap'>
                      <div
                        className={`${hoverState.location ? 'bg-orange-300' : 'bg-white '} m-2 flex-1 border border-orange-300 p-2`}
                        onMouseOver={() => setHoverState((prevState) => ({ ...prevState, location: true }))}
                        onMouseLeave={() => setHoverState((prevState) => ({ ...prevState, location: false }))}
                      >
                        location
                      </div>
                      <div
                        className={`${hoverState.description ? 'bg-orange-300' : 'bg-white '} m-2 flex-1 border border-orange-300 p-2`}
                        onMouseOver={() => setHoverState((prevState) => ({ ...prevState, description: true }))}
                        onMouseLeave={() => setHoverState((prevState) => ({ ...prevState, description: false }))}
                      >
                        description
                      </div>
                      <div className='m-2 flex-1 border border-yellow-600 bg-white p-2'>
                        schema
                        <div className='flex flex-1 flex-wrap'>
                          <div className={'m-2 flex-1 bg-white p-2'}>type</div>
                          <div
                            className={`${hoverState.enum ? 'bg-orange-300' : 'bg-white '} m-2 flex-1 border border-orange-300 p-2`}
                            onMouseOver={() => setHoverState((prevState) => ({ ...prevState, enum: true }))}
                            onMouseLeave={() => setHoverState((prevState) => ({ ...prevState, enum: false }))}
                          >
                            enum
                          </div>
                          <div
                            className={`${hoverState.examples ? 'bg-orange-300' : 'bg-white '} m-2 flex-1 border border-orange-300 p-2`}
                            onMouseOver={() => setHoverState((prevState) => ({ ...prevState, examples: true }))}
                            onMouseLeave={() => setHoverState((prevState) => ({ ...prevState, examples: false }))}
                          >
                            examples
                          </div>
                          <div
                            className={`${hoverState.default ? 'bg-orange-300' : 'bg-white '} m-2 flex-1 border border-orange-300 p-2`}
                            onMouseOver={() => setHoverState((prevState) => ({ ...prevState, default: true }))}
                            onMouseLeave={() => setHoverState((prevState) => ({ ...prevState, default: false }))}
                          >
                            default
                          </div>
                          <div
                            className={`${hoverState.description ? 'bg-orange-300' : 'bg-white '} m-2 flex-1 border border-orange-300 p-2`}
                            onMouseOver={() => setHoverState((prevState) => ({ ...prevState, description: true }))}
                            onMouseLeave={() => setHoverState((prevState) => ({ ...prevState, description: false }))}
                          >
                            description
                          </div>
                          <div className={'m-2 flex-1 bg-white p-2'}>pattern</div>
                          <div className={'m-2 flex-1 bg-white p-2'}>multipleOf</div>
                          <div className={'m-2 flex-1 bg-white p-2'}>And all other properties</div>
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
                parameters
                <div className='flex flex-1 flex-wrap'>
                  <div className={'m-2 border border-yellow-600 bg-white p-2'}>
                    parameter
                    <div className='flex flex-1 flex-wrap'>
                      <div
                        className={`${hoverState.location ? 'bg-orange-300' : 'bg-white '} m-2 flex-1 border border-orange-300 p-2`}
                        onMouseOver={() => setHoverState((prevState) => ({ ...prevState, location: true }))}
                        onMouseLeave={() => setHoverState((prevState) => ({ ...prevState, location: false }))}
                      >
                        location
                      </div>
                      <div
                        className={`${hoverState.description ? 'bg-orange-300' : 'bg-white '} m-2 flex-1 border border-orange-300 p-2`}
                        onMouseOver={() => setHoverState((prevState) => ({ ...prevState, description: true }))}
                        onMouseLeave={() => setHoverState((prevState) => ({ ...prevState, description: false }))}
                      >
                        description
                      </div>
                      <div
                        className={`${hoverState.enum ? 'bg-orange-300' : 'bg-white '} m-2 flex-1 border border-orange-300 p-2`}
                        onMouseOver={() => setHoverState((prevState) => ({ ...prevState, enum: true }))}
                        onMouseLeave={() => setHoverState((prevState) => ({ ...prevState, enum: false }))}
                      >
                        enum
                      </div>
                      <div
                        className={`${hoverState.examples ? 'bg-orange-300' : 'bg-white '} m-2 flex-1 border border-orange-300 p-2`}
                        onMouseOver={() => setHoverState((prevState) => ({ ...prevState, examples: true }))}
                        onMouseLeave={() => setHoverState((prevState) => ({ ...prevState, examples: false }))}
                      >
                        examples
                      </div>
                      <div
                        className={`${hoverState.default ? 'bg-orange-300' : 'bg-white '} m-2 flex-1 border border-orange-300 p-2`}
                        onMouseOver={() => setHoverState((prevState) => ({ ...prevState, default: true }))}
                        onMouseLeave={() => setHoverState((prevState) => ({ ...prevState, default: false }))}
                      >
                        default
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
