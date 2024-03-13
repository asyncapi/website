import React, { useState } from 'react';
import { Asyncapi3SchemaFormatComparisonProps } from '@/types/Asyncapi3Comparison/Asyncapi3SchemaFormatComparison';

export default function Asyncapi3SchemaFormatComparison ({ className = '' } : Asyncapi3SchemaFormatComparisonProps) {
  const [hoverState, setHoverState] = useState({
    SchemaFormat: false,
    Payload: false,
    Schema: false
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
                messages

                <div className="flex flex-wrap flex-1">
                  <div className={'bg-white border border-yellow-600 p-2 m-2'}>
                    message
                    <div className="flex flex-wrap flex-1">
                      <div className={(hoverState.SchemaFormat ? `bg-orange-100` : 'bg-white ') + ` flex-1 border border-orange-300 p-2 m-2`} onMouseOver={() => setHoverState(prevState => ({ ...prevState, SchemaFormat: true }))} onMouseLeave={() => setHoverState(prevState => ({ ...prevState, SchemaFormat: false }))}>
                        schemaFormat
                      </div>

                      <div className={(hoverState.Payload ? `bg-yellow-300` : 'bg-white') + ` flex-1 border border-yellow-600 p-2 m-2`} onMouseOver={() => setHoverState(prevState => ({ ...prevState, Payload: true }))} onMouseLeave={() => setHoverState(prevState => ({ ...prevState, Payload: false }))}>
                        payload
                        <div className="flex flex-wrap flex-1">
                          <div className={(hoverState.Schema ? `bg-blue-300` : 'bg-white') + ' flex-1 border border-orange-300 p-2 m-2'} onMouseOver={() => setHoverState(prevState => ({ ...prevState, Schema: true }))} onMouseLeave={() => setHoverState(prevState => ({ ...prevState, Schema: false }))}>
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
      <div className="flex-1 border border-black p-2 ml-1">
        <h3 className="text-lg font-sans font-medium mb-4 ml-2">AsyncAPI 3.0</h3>

        <div>
          <div className={'border border-yellow-300 p-2 m-2'}>
            components | channels

            <div className="flex flex-wrap flex-1">
              <div className={'bg-white border border-yellow-600 p-2 m-2'}>
                messages

                <div className="flex flex-wrap flex-1">
                  <div className={'bg-white border border-yellow-600 p-2 m-2'}>
                    message
                    <div className="flex flex-wrap flex-1">
                      <div className={(hoverState.Payload ? `bg-yellow-300` : 'bg-white') + ` border border-yellow-600 p-2 m-2`} onMouseOver={() => setHoverState(prevState => ({ ...prevState, Payload: true }))} onMouseLeave={() => setHoverState(prevState => ({ ...prevState, Payload: false }))}>
                        payload

                        <div className="flex flex-wrap flex-1">
                          <div className={(hoverState.SchemaFormat ? `bg-orange-100` : 'bg-white ') + ` flex-1 border border-orange-300 p-2 m-2`} onMouseOver={() => setHoverState(prevState => ({ ...prevState, SchemaFormat: true }))} onMouseLeave={() => setHoverState(prevState => ({ ...prevState, SchemaFormat: false }))}>
                            schemaFormat
                          </div>
                          <div className={(hoverState.Schema ? `bg-blue-300` : 'bg-white') + ' flex-1 border border-orange-300 p-2 m-2'} onMouseOver={() => setHoverState(prevState => ({ ...prevState, Schema: true }))} onMouseLeave={() => setHoverState(prevState => ({ ...prevState, Schema: false }))}>
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
    </div >
  );
};
