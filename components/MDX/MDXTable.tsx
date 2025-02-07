import React from 'react';

/**
 * @description The Table component is a wrapper for the HTML table element that provides custom
 * styling for the table.
 * @param props contains default HTML table props
 * @returns
 */
export function Table(props: React.HTMLProps<HTMLTableElement>) {
  return (
    <div className={`${props.className || ''} flex flex-col`}>
      <div className='my-2 overflow-x-auto py-2 sm:-mx-6 sm:px-6 lg:-mx-8 lg:px-8'>
        <div className='inline-block w-full overflow-auto border-b border-gray-200 align-middle shadow sm:rounded-lg'>
          <table {...props} className={`${props.className || ''} w-full`} />
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
export function TableRow(props: React.HTMLProps<HTMLTableRowElement>) {
  return <tr {...props} className={`${props.className || ''} bg-white`} />;
}

/**
 * @description The TableCell component is a wrapper for the HTML table cell element that provides custom
 * styling for the table cell.
 * @param props contains default HTML table cell props
 * @returns
 */
export function TableCell(props: React.HTMLProps<HTMLTableCellElement>) {
  return (
    <td
      {...props}
      className={`${props.className || ''} border-b border-gray-200 px-6 py-4 text-sm leading-5 tracking-tight text-gray-700`}
    />
  );
}

/**
 * @description The TableHeader component is a wrapper for the HTML table header element that provides custom
 * styling for the table header.
 * @param props contains default HTML table header props
 * @returns
 */
export function TableHeader(props: React.HTMLProps<HTMLTableCellElement>) {
  return (
    <th
      {...props}
      className={`${props.className || ''} border-b border-gray-200 bg-gray-100 px-6 py-3 text-left font-body text-xs font-medium uppercase leading-4 tracking-wider text-gray-900`}
    />
  );
}

/**
 * Renders the body of a table.
 *
 * @param props - The HTML props for the `<tbody>` element.
 * @returns The rendered `<tbody>` element.
 */
export function TableBody(props: React.HTMLProps<HTMLTableSectionElement>) {
  return <tbody {...props} className={`${props.className || ''}`} />;
}

/**
 * Renders the body of a table.
 *
 * @param props - The HTML props for the `<tbody>` element.
 * @returns The rendered `<tbody>` element.
 */
export function Thead(props: React.HTMLProps<HTMLTableSectionElement>) {
  return <thead {...props} className={`${props.className || ''}`} />;
}
