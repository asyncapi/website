import React from 'react';

interface ColumnProps {
  title: string;
  children: React.ReactNode;
}

/**
 * Standard side-by-side comparison column.
 */
export const Column = ({ title, children }: ColumnProps) => (
  <div className='ml-1 flex-1 border border-black p-2 dark:border-gray-600 dark:text-gray-100'>
    <h3 className='mb-4 ml-2 font-sans text-lg font-medium'>{title}</h3>
    <div>{children}</div>
  </div>
);

interface HoverBoxProps<T extends { [K in keyof T]: boolean }> {
  label: string | React.ReactNode;
  fieldKey: keyof T;
  hoverState: T;
  setHoverState: React.Dispatch<React.SetStateAction<T>>;
  activeClass: string;
  defaultClass?: string;
  borderClass: string;
  useMouseOver?: boolean;
  children?: React.ReactNode;
  className?: string;
  focusable?: boolean;
  testId?: string;
}

/**
 * Reusable wrapper that manages hover states, hover event handlers, and styling dynamically.
 */
export function HoverBox<T extends { [K in keyof T]: boolean }>({
  label,
  fieldKey,
  hoverState,
  setHoverState,
  activeClass,
  defaultClass = 'bg-white dark:bg-gray-900',
  borderClass,
  useMouseOver = false,
  children,
  className = '',
  focusable = false,
  testId
}: Readonly<HoverBoxProps<T>>) {
  const hovered = hoverState[fieldKey];
  const setHover = (val: boolean) => setHoverState((prev) => ({ ...prev, [fieldKey]: val }));

  const hoverProps = useMouseOver
    ? { onMouseOver: () => setHover(true), onMouseLeave: () => setHover(false) }
    : { onMouseEnter: () => setHover(true), onMouseLeave: () => setHover(false) };

  if (focusable) {
    return (
      <button
        type='button'
        className={`${hovered ? activeClass : defaultClass} m-2 border ${borderClass} p-2 focus:outline-none text-left block w-full ${className}`}
        onFocus={() => setHover(true)}
        onBlur={() => setHover(false)}
        data-testid={testId}
        {...hoverProps}
      >
        {label}
        {children}
      </button>
    );
  }

  return (
    <div
      className={`${hovered ? activeClass : defaultClass} m-2 border ${borderClass} p-2 ${className}`}
      data-testid={testId}
      {...hoverProps}
    >
      {label}
      {children}
    </div>
  );
}

/**
 * A plain bordered box used for non-interactive specification sections
 * (e.g. "Security", "Id (application identifier)").
 */
export const ComparisonBox = ({ children, className = '' }: { children: React.ReactNode; className?: string }) => (
  <div className={`m-2 border border-black p-2 dark:border-gray-600 ${className}`}>{children}</div>
);

/**
 * Two-column grid wrapper that holds a list of ComponentsGridItem entries.
 */
export const ComponentsGrid = ({ children }: { children: React.ReactNode }) => (
  <div className='gap-2 mt-2 grid flex-1 grid-cols-2 flex-wrap'>{children}</div>
);

/**
 * A single cell inside a ComponentsGrid — represents one spec component entry.
 */
export const ComponentsGridItem = ({ children }: { children: React.ReactNode }) => (
  <div className='m-2 box-border border border-black bg-gray-100 p-2 dark:border-gray-600 dark:bg-gray-800'>
    {children}
  </div>
);

/**
 * Renders a ComponentsGrid populated from a plain string array.
 * Use this instead of repeating <ComponentsGridItem> calls manually.
 */
export const ComponentsGridList = ({ items }: { items: string[] }) => (
  <ComponentsGrid>
    {items.map((item) => (
      <ComponentsGridItem key={item}>{item}</ComponentsGridItem>
    ))}
  </ComponentsGrid>
);
