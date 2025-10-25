import React from 'react';

/**
 * @description The Table component is a wrapper for the HTML table element that provides custom
 * styling for the table.
 * @param props contains default HTML table props
 * @returns
 */
export function Table({ className = '' }: { className?: string }) {
  return (
    <div className={`${className} flex flex-col`}>
      <div className='my-2 overflow-x-auto py-2 sm:-mx-6 sm:px-6 lg:-mx-8 lg:px-8'>
        <div className='inline-block w-full overflow-auto border-b border-gray-200 align-middle shadow sm:rounded-lg'>
          <table className={`${className} w-full`} />
        </div>
      </div>
    </div>
  );
}

/**
 * @description The TableRow component is a wrapper for the HTML table row element that provides custom
 * styling for the table row.
 * @param props contains default HTML table row props
 * @returns
 */
export function TableRow({ className = '' }: { className?: string }) {
  return <tr className={`${className} bg-white`} />;
}

/**
 * @description The TableCell component is a wrapper for the HTML table cell element that provides custom
 * styling for the table cell.
 * @param props contains default HTML table cell props
 * @returns
 */
export function TableCell({ className = '' }: { className?: string }) {
  return (
    <td className={`${className} border-b border-gray-200 px-6 py-4 text-sm leading-5 tracking-tight text-gray-700`} />
  );
}

/**
 * @description The TableHeader component is a wrapper for the HTML table header element that provides custom
 * styling for the table header.
 * @param props contains default HTML table header props
 * @returns
 */
export function TableHeader({ className = '' }: { className?: string }) {
  return (
    <th
      className={`${className} border-b border-gray-200 bg-gray-100 px-6 py-3 text-left font-body text-xs font-medium uppercase leading-4 tracking-wider text-gray-900`}
    />
  );
}

/**
 * Renders the body of a table.
 *
 * @param props - The HTML props for the `<tbody>` element.
 * @returns The rendered `<tbody>` element.
 */
export function TableBody({ className = '' }: { className?: string }) {
  return <tbody className={`${className}`} />;
}

/**
 * Renders the body of a table.
 *
 * @param props - The HTML props for the `<tbody>` element.
 * @returns The rendered `<tbody>` element.
 */
export function Thead({ className = '' }: { className?: string }) {
  return <thead className={`${className}`} />;
}
