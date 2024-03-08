interface IRowProps {
  children: React.ReactNode;
}

/**
 * @param props.children - The content of the row
 * @description The row layout with the content
 */
export default function Row({ children }: IRowProps) {
  return <div className='mb-4 md:mb-0 md:flex'>{children}</div>;
}
