import React from 'react';

import { Column } from '../ComparisonCommon';

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
      <Column title='AsyncAPI 2.x'>
        <div className='m-2 border border-yellow-300 p-2 dark:border-yellow-700'>
          Channels
          <div className='flex flex-1 flex-wrap'>
            <div className='m-2 border border-yellow-600 p-2 dark:border-yellow-700'>
              Channel Item
              <div className='flex flex-1 flex-wrap'>
                <div className='m-2 flex-1 border border-orange-300 p-2 dark:border-orange-700'>
                  Operation (Publish and Subscribe)
                </div>
              </div>
            </div>
          </div>
        </div>
      </Column>
      <Column title='AsyncAPI 3.0'>
        <div className='m-2 border border-yellow-300 p-2 dark:border-yellow-700'>
          Operations
          <div className='flex flex-1 flex-wrap'>
            <div className='m-2 flex-1 border border-orange-300 p-2 dark:border-orange-700'>
              Operation
              <div className='flex flex-1 flex-col flex-wrap'>
                <div className='m-2 border border-blue-500 bg-white p-2 dark:border-blue-400 dark:bg-gray-900'>
                  action (send or receive)
                </div>
              </div>
            </div>
          </div>
        </div>
      </Column>
    </div>
  );
}
