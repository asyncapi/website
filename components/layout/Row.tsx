import React from 'react';

interface IRowProps {
  children: React.ReactNode;
}

/**
 * @description The row layout with the content
 * @param props.children - The content of the row
 */
export default function Row({ children }: IRowProps) {
  return <div className='mb-4 md:mb-0 md:flex'>{children}</div>;
}
