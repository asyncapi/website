import React from 'react';
import { Asyncapi3OperationComparisonProps } from '@/types/Asyncapi3Comparison/Asyncapi3OperationComparison';

export default function Asyncapi3OperationComparison ({ className = '' }: Asyncapi3OperationComparisonProps) {
  return (
    <div className={`${className} flex flex-col md:flex-row gap-1 flex-wrap text-center`}>
      <div className="flex-1 border border-black p-2 ml-1">
        <h3 className="text-lg font-sans font-medium mb-4 ml-2">AsyncAPI 2.x</h3>

        <div>
          <div className="border border-yellow-300 p-2 m-2">
            Channels

            <div className="flex flex-wrap flex-1">
              <div className="border border-yellow-600 p-2 m-2">
                Channel Item

                <div className="flex flex-wrap flex-1">
                  <div className="flex-1 border border-orange-300 p-2 m-2">
                    Operation (Publish and Subscribe)
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
          <div className="border border-yellow-300 p-2 m-2">
            Operations
            <div className="flex flex-wrap flex-1">
              <div className="flex-1 border border-orange-300 p-2 m-2">
                Operation

                <div className="flex flex-col flex-wrap flex-1">
                  <div className="border border-blue-500 bg-white p-2 m-2">
                    action (send or receive)
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
