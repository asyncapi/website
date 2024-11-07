import React from 'react';

interface IColumnProps {
  children: React.ReactNode;
}

/**
 * @description The column layout with the content
 * @param props.children - The content of the column
 */
export default function Column({ children }: IColumnProps) {
  return (
    <div className='mb-4 md:mx-1 md:mb-0 md:flex-1' data-testid='Column-main'>
      {children}
    </div>
  );
}
