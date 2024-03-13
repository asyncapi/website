import React, { useState } from 'react';
import { Asyncapi3ParameterComparisonProps } from '@/types/Asyncapi3Comparison/Asyncapi3ParameterComparison';

export default function Asyncapi3ParameterComparison ({ className = '' }: Asyncapi3ParameterComparisonProps) {
  const [hoverState, setHoverState] = useState({
    location: false,
    description: false,
    enum: false,
    examples: false,
    default: false
  });

  return (
    <div className={`${className} flex flex-col md:flex-row gap-1 flex-wrap text-center`}>
      <div className="flex-1 border border-black p-2 ml-1">
        <h3 className="text-lg font-sans font-medium mb-4 ml-2">AsyncAPI 2.x</h3>

        <div>
          <div className={'border border-yellow-300 p-2 m-2'}>
            components | channels

            <div className="flex flex-wrap flex-1">
              <div className={'bg-white border border-yellow-600 p-2 m-2'}>
                parameters

                <div className="flex flex-wrap flex-1">
                  <div className={'bg-white border border-yellow-600 p-2 m-2'}>
                    parameter
                    <div className="flex flex-wrap flex-1">
                      <div className={(hoverState.location ? `bg-orange-300` : 'bg-white ') + ` flex-1 border border-orange-300 p-2 m-2`} onMouseOver={() => setHoverState(prevState => ({ ...prevState, location: true }))} onMouseLeave={() => setHoverState(prevState => ({ ...prevState, location: false }))}>
                        location
                      </div>
                      <div className={(hoverState.description ? `bg-orange-300` : 'bg-white ') + ` flex-1 border border-orange-300 p-2 m-2`} onMouseOver={() => setHoverState(prevState => ({ ...prevState, description: true }))} onMouseLeave={() => setHoverState(prevState => ({ ...prevState, description: false }))}>
                        description
                      </div>

                      <div className="flex-1 bg-white border border-yellow-600 p-2 m-2">
                        schema
                        <div className="flex flex-wrap flex-1">
                          <div className={'bg-white flex-1 bg-red-300 p-2 m-2'}>type</div>
                          <div className={(hoverState.enum ? `bg-orange-300` : 'bg-white ') + ` flex-1 border border-orange-300 p-2 m-2`} onMouseOver={() => setHoverState(prevState => ({ ...prevState, enum: true }))} onMouseLeave={() => setHoverState(prevState => ({ ...prevState, enum: false }))}>
                            enum
                          </div>
                          <div className={(hoverState.examples ? `bg-orange-300` : 'bg-white ') + ` flex-1 border border-orange-300 p-2 m-2`} onMouseOver={() => setHoverState(prevState => ({ ...prevState, examples: true }))} onMouseLeave={() => setHoverState(prevState => ({ ...prevState, examples: false }))}>
                            examples
                          </div>
                          <div className={(hoverState.default ? `bg-orange-300` : 'bg-white ') + ` flex-1 border border-orange-300 p-2 m-2`} onMouseOver={() => setHoverState(prevState => ({ ...prevState, default: true }))} onMouseLeave={() => setHoverState(prevState => ({ ...prevState, default: false }))}>
                            default
                          </div>
                          <div className={(hoverState.description ? `bg-orange-300` : 'bg-white ') + ` flex-1 border border-orange-300 p-2 m-2`} onMouseOver={() => setHoverState(prevState => ({ ...prevState, description: true }))} onMouseLeave={() => setHoverState(prevState => ({ ...prevState, description: false }))}>
                            description
                          </div>
                          <div className={'bg-white flex-1 bg-red-300 p-2 m-2'}>pattern</div>
                          <div className={'bg-white flex-1 bg-red-300 p-2 m-2'}>multipleOf</div>
                          <div className={'bg-white flex-1 bg-red-300 p-2 m-2'}>And all other properties</div>
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
      <div className="flex-1 border border-black p-2 ml-1">
        <h3 className="text-lg font-sans font-medium mb-4 ml-2">AsyncAPI 3.0</h3>

        <div>
          <div className={'border border-yellow-300 p-2 m-2'}>
            components | channels

            <div className="flex flex-wrap flex-1">
              <div className={'bg-white border border-yellow-600 p-2 m-2'}>
                parameters

                <div className="flex flex-wrap flex-1">
                  <div className={'bg-white border border-yellow-600 p-2 m-2'}>
                    parameter
                    <div className="flex flex-wrap flex-1">
                      <div className={(hoverState.location ? `bg-orange-300` : 'bg-white ') + ` flex-1 border border-orange-300 p-2 m-2`} onMouseOver={() => setHoverState(prevState => ({ ...prevState, location: true }))} onMouseLeave={() => setHoverState(prevState => ({ ...prevState, location: false }))}>
                        location
                      </div>
                      <div className={(hoverState.description ? `bg-orange-300` : 'bg-white ') + ` flex-1 border border-orange-300 p-2 m-2`} onMouseOver={() => setHoverState(prevState => ({ ...prevState, description: true }))} onMouseLeave={() => setHoverState(prevState => ({ ...prevState, description: false }))}>
                        description
                      </div>
                      <div className={(hoverState.enum ? `bg-orange-300` : 'bg-white ') + ` flex-1 border border-orange-300 p-2 m-2`} onMouseOver={() => setHoverState(prevState => ({ ...prevState, enum: true }))} onMouseLeave={() => setHoverState(prevState => ({ ...prevState, enum: false }))}>
                        enum
                      </div>
                      <div className={(hoverState.examples ? `bg-orange-300` : 'bg-white ') + ` flex-1 border border-orange-300 p-2 m-2`} onMouseOver={() => setHoverState(prevState => ({ ...prevState, examples: true }))} onMouseLeave={() => setHoverState(prevState => ({ ...prevState, examples: false }))}>
                        examples
                      </div>
                      <div className={(hoverState.default ? `bg-orange-300` : 'bg-white ') + ` flex-1 border border-orange-300 p-2 m-2`} onMouseOver={() => setHoverState(prevState => ({ ...prevState, default: true }))} onMouseLeave={() => setHoverState(prevState => ({ ...prevState, default: false }))}>
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
    </div >
  );
};

