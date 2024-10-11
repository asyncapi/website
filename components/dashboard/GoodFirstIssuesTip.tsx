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
          <div className='max-w-xs rounded bg-white p-4 shadow-xl'>
            <h4 className='mb-3 text-base font-bold '>Is this your first contribution?</h4>
            <p className='font-regular'>
              The issues in this column are perfect for you! These issues are of low-complexity and should be a quick
              commit. Thanks for your help, and welcome!
            </p>
          </div>
        </div>
      )}
    </>
  );
}
