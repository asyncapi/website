import { useFloating } from '@floating-ui/react-dom-interactions';
import React, { useState } from 'react';

/**
 * @description A tooltip that appears when the user hovers over the Good First Issues icon.
 */
export default function GoodFirstIssuesTip() {
  const [open, setOpen] = useState(false);
  const { x, y, reference, floating, strategy } = useFloating({
    placement: 'right-start',
    open
  });

  return (
    <>
      <img
        onMouseLeave={() => setOpen(false)}
        onMouseEnter={() => setOpen(true)}
        ref={reference}
        src='/img/illustrations/icons/tip-icon.svg'
        data-testid='GoodFirstIssuesTip-hover-icon'
        alt='Tooltip'
        className='dark:invert'
      />

      {open && (
        <div
          ref={floating}
          style={{
            position: strategy,
            top: y ?? '',
            left: x ?? ''
          }}
        >
          <div className='max-w-xs rounded-xl bg-white dark:bg-dark-card p-5 shadow-2xl dark:shadow-2xl border border-gray-200 dark:border-gray-700'>
            <div className='flex items-start gap-3'>
              <div className='flex-shrink-0 w-10 h-10 rounded-lg bg-green-100 dark:bg-green-900/30 flex items-center justify-center'>
                <svg
                  className='w-5 h-5 text-green-600 dark:text-green-400'
                  fill='none'
                  viewBox='0 0 24 24'
                  stroke='currentColor'
                >
                  <path
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    strokeWidth={2}
                    d='M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z'
                  />
                </svg>
              </div>
              <div className='flex-1'>
                <h4 className='mb-2 text-base font-bold dark:text-white'>Is this your first contribution?</h4>
                <p className='text-sm font-regular dark:text-gray-300 leading-relaxed'>
                  The issues in this column are perfect for you! These issues are of low-complexity and should be a
                  quick commit. Thanks for your help, and welcome!
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
