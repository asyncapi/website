import { useState } from 'react';
import { useFloating } from '@floating-ui/react-dom-interactions';

export default function GoodFirstIssuesTip() {
  const [open, setOpen] = useState(false);
  const { x, y, reference, floating, strategy } = useFloating({
    placement: 'right-start',
    open,
  });

  return (
    <>
      <img
        onMouseLeave={() => setOpen(false)}
        onMouseEnter={() => setOpen(true)}
        ref={reference}
        src="/img/illustrations/icons/tip-icon.svg"
      />

      {open && (
        <div
          ref={floating}
          style={{
            position: strategy,
            top: y ?? '',
            left: x ?? '',
          }}
        >
          <div className="bg-white max-w-xs p-4 shadow-xl rounded">
            <h4 className="text-base font-bold mb-3 ">
              Is this your first contribution?
            </h4>
            <p className="font-regular">
              The issues in this column are perfect for you! These issues are of
              low-complexity and should be a quick commit. Thanks for your help,
              and welcome!
            </p>
          </div>
        </div>
      )}
    </>
  );
}
