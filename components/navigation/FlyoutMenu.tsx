import React, { useEffect, useRef, useState } from 'react';

import type { MenuItem } from './MenuBlocks';
import MenuBlocks from './MenuBlocks';

interface FlyoutProps {
  items?: MenuItem[];
}

/**
 * @description Component representing a flyout menu.
 * @param {MenuItem[]} [props.items=[]] - The list of items to be displayed in the flyout menu.
 */
export default function Flyout({ items = [] }: FlyoutProps) {
  const contentRef = useRef<HTMLDivElement>(null);
  const [needsScroll, setNeedsScroll] = useState(false);

  useEffect(() => {
    if (contentRef.current) {
      const contentHeight = contentRef.current.scrollHeight;
      const maxHeight = window.innerHeight * 0.8; // 70vh
      setNeedsScroll(contentHeight > maxHeight);
    }
  }, [items]);

  return (
    <div
      className="absolute z-50 -ml-4 w-screen max-w-md pt-3 md:ml-12 md:-translate-x-1/2 lg:left-1/2 lg:max-w-3xl lg:-translate-x-1/2"
      data-testid="Flyout-main"
    >
      <div className="rounded-lg shadow-lg">
        <div className="shadow-xs overflow-hidden rounded-lg">
          <div
            ref={contentRef}
            className={`relative z-20 grid gap-6 bg-white px-5 py-6 sm:gap-8 sm:p-8 lg:grid-cols-2 ${
              needsScroll ? 'max-h-[70vh] overflow-y-auto' : ''
            }`}
          >
            <MenuBlocks items={items} />
          </div>
        </div>
      </div>
    </div>
  );
}
