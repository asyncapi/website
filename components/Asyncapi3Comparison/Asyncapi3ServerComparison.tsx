import React, { useState } from 'react';

import { Column } from './ComparisonCommon';

export interface Asyncapi3ServerComparisonProps {
  className?: string;
}

export interface HoverState {
  Host: boolean;
  Path: boolean;
}

interface ServerButtonProps {
  label: string;
  active: boolean;
  onHover: (val: boolean) => void;
  className?: string;
}

const ServerButton = ({ label, active, onHover, className = '' }: ServerButtonProps) => (
  <button
    type='button'
    className={`${active ? 'bg-pink-300 dark:bg-pink-900/60' : ' '} m-2 border border-black p-2 dark:border-gray-600 focus:outline-none ${className}`}
    onMouseEnter={() => onHover(true)}
    onMouseLeave={() => onHover(false)}
    onFocus={() => onHover(true)}
    onBlur={() => onHover(false)}
  >
    <p>{label}</p>
  </button>
);

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
      <Column title='AsyncAPI 2.x'>
        <div className='m-2 border border-blue-300 p-2 dark:border-blue-700'>
          Servers
          <div className='flex flex-1 flex-col flex-wrap'>
            <div className='m-2 border border-blue-600 p-2 dark:border-blue-700'>
              Server
              <div className='flex flex-1 flex-wrap'>
                <ServerButton
                  label='Url'
                  active={hoverState.Host || hoverState.Path}
                  onHover={(val) => setHoverState({ Host: val, Path: val })}
                  className='flex flex-1 items-center justify-center'
                />
              </div>
            </div>
          </div>
        </div>
      </Column>

      <Column title='AsyncAPI 3.0'>
        <div className='m-2 border border-blue-300 p-2 dark:border-blue-700'>
          Servers
          <div className='flex flex-1 flex-col flex-wrap'>
            <div className='m-2 border border-blue-600 p-2 dark:border-blue-700'>
              Server
              <div className='flex flex-1 flex-wrap'>
                <ServerButton
                  label='Host'
                  active={hoverState.Host}
                  onHover={(val) => setHoverState((prev) => ({ ...prev, Host: val }))}
                  className='mr-1 box-border flex-1'
                />
                <ServerButton
                  label='Pathname'
                  active={hoverState.Path}
                  onHover={(val) => setHoverState((prev) => ({ ...prev, Path: val }))}
                  className='mr-1 box-border flex-1'
                />
              </div>
            </div>
          </div>
        </div>
      </Column>
    </div>
  );
}
