import React, { useState } from 'react';

export interface Asyncapi3MetaComparisonProps {
  className?: string;
}

export interface HoverState {
  Info: boolean;
  Tags: boolean;
  External: boolean;
}

/**
 * @description React component for comparing AsyncAPI metadata between versions 2.x and 3.0.
 * @param {string} [props.className=''] - Additional CSS classes for styling.
 */
export default function Asyncapi3MetaComparison({ className = '' }: Asyncapi3MetaComparisonProps) {
  const [hoverState, setHoverState] = useState<HoverState>({
    Info: false,
    Tags: false,
    External: false
  });

  return (
    <div className={`${className} flex flex-col flex-wrap gap-1 text-center md:flex-row`}>
      <div className='ml-1 flex-1 border border-black p-2'>
        <h3 className='mb-4 ml-2 font-sans text-lg font-medium'>AsyncAPI 2.x</h3>
        <div>
          <div
            className={`${hoverState.Info ? 'bg-blue-100 ' : ' '}m-2 border border-blue-300 p-2`}
            onMouseOver={() => setHoverState((prevState) => ({ ...prevState, Info: true }))}
            onMouseLeave={() => setHoverState((prevState) => ({ ...prevState, Info: false }))}
          >
            Info
          </div>
          <div className='flex flex-1 flex-wrap'>
            <div
              className={`${hoverState.Tags ? 'bg-pink-300' : ' '} m-2 flex flex-1 items-center justify-center border border-black p-2`}
              onMouseOver={() => setHoverState((prevState) => ({ ...prevState, Tags: true }))}
              onMouseLeave={() => setHoverState((prevState) => ({ ...prevState, Tags: false }))}
            >
              <p>Tags</p>
            </div>
            <div
              className={`${hoverState.External ? 'bg-green-500' : ' '} m-2 flex flex-1 items-center justify-center border border-black p-2`}
              onMouseOver={() => setHoverState((prevState) => ({ ...prevState, External: true }))}
              onMouseLeave={() => setHoverState((prevState) => ({ ...prevState, External: false }))}
            >
              <p>External Docs</p>
            </div>
          </div>
        </div>
      </div>
      <div className='ml-1 flex-1 border border-black p-2'>
        <h3 className='mb-4 ml-2 font-sans text-lg font-medium'>AsyncAPI 3.0</h3>
        <div>
          <div
            className={`${hoverState.Info ? 'bg-blue-100 ' : ' '}m-2 border border-blue-300 p-2`}
            onMouseOver={() => setHoverState((prevState) => ({ ...prevState, Info: true }))}
            onMouseLeave={() => setHoverState((prevState) => ({ ...prevState, Info: false }))}
          >
            Info
            <div className='flex flex-1 flex-wrap'>
              <div
                className={`${hoverState.Tags ? 'bg-pink-300' : ' '} m-2 flex flex-1 items-center justify-center border border-black p-2`}
                onMouseOver={() => setHoverState((prevState) => ({ ...prevState, Tags: true }))}
                onMouseLeave={() => setHoverState((prevState) => ({ ...prevState, Tags: false }))}
              >
                <p>Tags</p>
              </div>
              <div
                className={`${hoverState.External ? 'bg-green-500' : ' '} m-2 flex flex-1 items-center justify-center border border-black p-2`}
                onMouseOver={() => setHoverState((prevState) => ({ ...prevState, External: true }))}
                onMouseLeave={() => setHoverState((prevState) => ({ ...prevState, External: false }))}
              >
                <p>External Docs</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
