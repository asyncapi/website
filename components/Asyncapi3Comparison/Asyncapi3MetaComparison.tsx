import React, { useState } from 'react';
import { Asyncapi3MetaComparisonProps, HoverState } from '@/types/Asyncapi3Comparison/Asyncapi3MetaComparison';

export default function Asyncapi3MetaComparison ({ className = '' }: Asyncapi3MetaComparisonProps) {
  const [hoverState, setHoverState] = useState<HoverState>({
    Info: false,
    Tags: false,
    External: false,
  });

  return (
    <div className={`${className} flex flex-col md:flex-row gap-1 flex-wrap text-center`}>
      <div className="flex-1 border border-black p-2 ml-1">
        <h3 className="text-lg font-sans font-medium mb-4 ml-2">AsyncAPI 2.x</h3>

        <div>
          <div className={(hoverState.Info ? `bg-blue-100 ` : ' ') + 'border border-blue-300 p-2 m-2'} onMouseOver={() => setHoverState(prevState => ({ ...prevState, Info: true }))} onMouseLeave={() => setHoverState(prevState => ({ ...prevState, Info: false }))}>
            Info
          </div>
          <div className="flex flex-wrap flex-1">
            <div className={(hoverState.Tags ? `bg-pink-300` : ' ') + ` flex items-center justify-center flex-1 border border-black p-2 m-2`} onMouseOver={() => setHoverState(prevState => ({ ...prevState, Tags: true }))} onMouseLeave={() => setHoverState(prevState => ({ ...prevState, Tags: false }))}>
              <p>Tags</p>
            </div>
            <div className={(hoverState.External ? `bg-green-500` : ' ') + ` flex items-center justify-center flex-1 border border-black p-2 m-2`} onMouseOver={() => setHoverState(prevState => ({ ...prevState, External: true }))} onMouseLeave={() => setHoverState(prevState => ({ ...prevState, External: false }))}>
              <p>External Docs</p>
            </div>
          </div>
        </div>
      </div>
      <div className="flex-1 border border-black p-2 ml-1">
        <h3 className="text-lg font-sans font-medium mb-4 ml-2">AsyncAPI 3.0</h3>

        <div>
          <div className={(hoverState.Info ? `bg-blue-100 ` : ' ') + 'border border-blue-300 p-2 m-2'} onMouseOver={() => setHoverState(prevState => ({ ...prevState, Info: true }))} onMouseLeave={() => setHoverState(prevState => ({ ...prevState, Info: false }))}>
            Info
            <div className="flex flex-wrap flex-1">
              <div className={(hoverState.Tags ? `bg-pink-300` : ' ') + ` flex items-center justify-center flex-1 border border-black p-2 m-2`} onMouseOver={() => setHoverState(prevState => ({ ...prevState, Tags: true }))} onMouseLeave={() => setHoverState(prevState => ({ ...prevState, Tags: false }))}>
                <p>Tags</p>
              </div>
              <div className={(hoverState.External ? `bg-green-500` : ' ') + ` flex items-center justify-center flex-1 border border-black p-2 m-2`} onMouseOver={() => setHoverState(prevState => ({ ...prevState, External: true }))} onMouseLeave={() => setHoverState(prevState => ({ ...prevState, External: false }))}>
                <p>External Docs</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
