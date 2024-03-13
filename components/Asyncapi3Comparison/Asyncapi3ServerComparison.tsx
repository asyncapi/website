import React, { useState } from 'react';
import { Asyncapi3ServerComparisonProps, HoverState } from '@/types/Asyncapi3Comparison/Asyncapi3ServerComparison';

export default function Asyncapi3ServerComparison ({ className = '' }: Asyncapi3ServerComparisonProps) {
  const [hoverState, setHoverState] = useState<HoverState>({
    Host: false,
    Path: false,
  });

  return (
    <div className={`${className} flex flex-col md:flex-row gap-1 flex-wrap text-center`}>
      <div className="flex-1 border border-black p-2 ml-1">
        <h3 className="text-lg font-sans font-medium mb-4 ml-2">AsyncAPI 2.x</h3>

        <div>
          <div className="border border-blue-300 p-2 m-2">
            Servers
            <div className="flex flex-col flex-wrap flex-1">
              <div className="border border-blue-600 p-2 m-2">
                Server
                <div className="flex flex-wrap flex-1">
                  <div className={(hoverState.Host || hoverState.Path ? `bg-pink-300` : ' ') + ` flex items-center justify-center flex-1 border border-black p-2 m-2`} onMouseOver={() => setHoverState(prevState => ({ ...prevState, Host: true, Path: true }))} onMouseLeave={() => setHoverState(prevState => ({ ...prevState, Host: false, Path: false }))}>
                    <p>Url</p>
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
          <div className="border border-blue-300 p-2 m-2">
            Servers
            <div className="flex flex-col flex-wrap flex-1">
              <div className="border border-blue-600 p-2 m-2">
                Server
                <div className="flex flex-wrap flex-1">
                  <div className={(hoverState.Host ? `bg-pink-300` : ' ') + ` flex-1 border border-black box-border mr-1 p-2 m-2`} onMouseOver={() => setHoverState(prevState => ({ ...prevState, Host: true }))} onMouseLeave={() => setHoverState(prevState => ({ ...prevState, Host: false }))}>
                    <p>Host</p>
                  </div>
                  <div className={(hoverState.Path ? `bg-pink-300` : ' ') + ` flex-1 border border-black box-border mr-1 p-2 m-2`} onMouseOver={() => setHoverState(prevState => ({ ...prevState, Path: true }))} onMouseLeave={() => setHoverState(prevState => ({ ...prevState, Path: false }))}>
                    <p>Pathname</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
