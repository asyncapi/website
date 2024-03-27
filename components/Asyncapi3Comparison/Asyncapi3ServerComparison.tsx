import React, { useState } from 'react';

export interface Asyncapi3ServerComparisonProps {
  className?: string;
}

export interface HoverState {
  Host: boolean;
  Path: boolean;
}

/**
 * @description React component for comparing AsyncAPI servers between versions 2.x and 3.0.
 * @param {string} [props.className=''] - Additional CSS classes for styling.
 */
export default function Asyncapi3ServerComparison({ className = '' }: Asyncapi3ServerComparisonProps) {
  const [hoverState, setHoverState] = useState<HoverState>({
    Host: false,
    Path: false
  });

  return (
    <div className={`${className} flex flex-col flex-wrap gap-1 text-center md:flex-row`}>
      <div className='ml-1 flex-1 border border-black p-2'>
        <h3 className='mb-4 ml-2 font-sans text-lg font-medium'>AsyncAPI 2.x</h3>
        <div>
          <div className='m-2 border border-blue-300 p-2'>
            Servers
            <div className='flex flex-1 flex-col flex-wrap'>
              <div className='m-2 border border-blue-600 p-2'>
                Server
                <div className='flex flex-1 flex-wrap'>
                  <div
                    className={`${hoverState.Host || hoverState.Path ? 'bg-pink-300' : ' '} m-2 flex flex-1 items-center justify-center border border-black p-2`}
                    onMouseOver={() => setHoverState((prevState) => ({ ...prevState, Host: true, Path: true }))}
                    onMouseLeave={() => setHoverState((prevState) => ({ ...prevState, Host: false, Path: false }))}
                  >
                    <p>Url</p>
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
          <div className='m-2 border border-blue-300 p-2'>
            Servers
            <div className='flex flex-1 flex-col flex-wrap'>
              <div className='m-2 border border-blue-600 p-2'>
                Server
                <div className='flex flex-1 flex-wrap'>
                  <div
                    className={`${hoverState.Host ? 'bg-pink-300' : ' '} m-2 mr-1 box-border flex-1 border border-black p-2`}
                    onMouseOver={() => setHoverState((prevState) => ({ ...prevState, Host: true }))}
                    onMouseLeave={() => setHoverState((prevState) => ({ ...prevState, Host: false }))}
                  >
                    <p>Host</p>
                  </div>
                  <div
                    className={`${hoverState.Path ? 'bg-pink-300' : ' '} m-2 mr-1 box-border flex-1 border border-black p-2`}
                    onMouseOver={() => setHoverState((prevState) => ({ ...prevState, Path: true }))}
                    onMouseLeave={() => setHoverState((prevState) => ({ ...prevState, Path: false }))}
                  >
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
}
