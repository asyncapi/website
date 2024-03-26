import React from 'react';

export interface Asyncapi3OperationComparisonProps {
  className?: string;
}

/**
 * @description React component for comparing AsyncAPI operations between versions 2.x and 3.0.
 * @param {string} [props.className=''] - Additional CSS classes for styling.
 */
export default function Asyncapi3OperationComparison({ className = '' }: Asyncapi3OperationComparisonProps) {
  return (
    <div className={`${className} flex flex-col flex-wrap gap-1 text-center md:flex-row`}>
      <div className='ml-1 flex-1 border border-black p-2'>
        <h3 className='mb-4 ml-2 font-sans text-lg font-medium'>AsyncAPI 2.x</h3>
        <div>
          <div className='m-2 border border-yellow-300 p-2'>
            Channels
            <div className='flex flex-1 flex-wrap'>
              <div className='m-2 border border-yellow-600 p-2'>
                Channel Item
                <div className='flex flex-1 flex-wrap'>
                  <div className='m-2 flex-1 border border-orange-300 p-2'>Operation (Publish and Subscribe)</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className='ml-1 flex-1 border border-black p-2'>
        <h3 className='mb-4 ml-2 font-sans text-lg font-medium'>AsyncAPI 3.0</h3>
        <div>
          <div className='m-2 border border-yellow-300 p-2'>
            Operations
            <div className='flex flex-1 flex-wrap'>
              <div className='m-2 flex-1 border border-orange-300 p-2'>
                Operation
                <div className='flex flex-1 flex-col flex-wrap'>
                  <div className='m-2 border border-blue-500 bg-white p-2'>action (send or receive)</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
