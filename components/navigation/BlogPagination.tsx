import React, { useEffect, useState } from 'react';

import { ButtonIconPosition } from '@/types/components/buttons/ButtonPropsType';

import Button from '../buttons/Button';
import IconArrowLeft from '../icons/ArrowLeft';
import IconArrowRight from '../icons/ArrowRight';

interface BlogPaginationProps {
  blogsPerPage: number;
  totalBlogs: number;
  paginate: (pageNumber: number) => void;
  currentPage: number;
}

export default function BlogPagination({ blogsPerPage, totalBlogs, paginate, currentPage }: BlogPaginationProps) {
  const totalPages: number = Math.ceil(totalBlogs / blogsPerPage);
  const pagesToShow: number = 6;
  const [pageNumbers, setPageNumbers] = useState<(number | string)[]>([]);

  const calculatePageNumbers = () => {
    const numbers: (number | string)[] = [];

    if (totalPages < 1) return [];
    if (totalPages <= pagesToShow) {
      for (let i = 1; i <= totalPages; i++) {
        numbers.push(i);
      }
    } else if (currentPage <= 2) {
      for (let i = 1; i <= 3; i++) {
        numbers.push(i);
      }
      numbers.push('...');
      numbers.push(totalPages - 2);
      numbers.push(totalPages - 1);
      numbers.push(totalPages);
    } else if (currentPage >= totalPages - 1) {
      numbers.push(1);
      numbers.push(2);
      numbers.push(3);
      numbers.push('...');
      for (let i = totalPages - 2; i <= totalPages; i++) {
        numbers.push(i);
      }
    } else {
      numbers.push(1);
      numbers.push('...');
      numbers.push(currentPage - 1);
      numbers.push(currentPage);
      numbers.push(currentPage + 1);
      numbers.push('...');
      numbers.push(totalPages);
    }

    return numbers;
  };

  useEffect(() => {
    setPageNumbers(calculatePageNumbers());
  }, [currentPage, totalBlogs]);

  return (
    <nav aria-label='Blog pagination' className='mt-8 flex items-center justify-center gap-2 p-4'>
      <Button
        className={`${currentPage === 1 ? 'cursor-not-allowed opacity-50' : ''} size-[120px] rounded-l-md px-4 py-2`}
        aria-label='Previous page'
        bgClassName='bg-white'
        textClassName='text-[#212525] font-inter text-[14px] font-normal'
        text='Previous'
        disabled={currentPage === 1}
        onClick={() => paginate(currentPage - 1)}
        icon={<IconArrowLeft className='inline-block size-4' />}
        iconPosition={ButtonIconPosition.LEFT}
      />
      <div className='flex w-[35vw] justify-center gap-3'>
        {pageNumbers.map((number, index) => (
          <button
            key={index}
            className={`size-[40px] ${number === currentPage ? 'rounded border bg-[#6200EE] text-white' : 'text-[#6B6B6B]'}`}
            aria-label={`${typeof number === 'number' ? `Go to page ${number}` : 'More pages'}`}
            aria-current={number === currentPage ? 'page' : undefined}
            onClick={() => typeof number === 'number' && paginate(number)}
            disabled={number === '...'}
          >
            {number}
          </button>
        ))}
      </div>
      <Button
        className={`${currentPage === totalPages && 'cursor-not-allowed opacity-50'} h-[35px] w-[120px] rounded-l-md px-4 py-2`}
        bgClassName='bg-white'
        textClassName='text-[#212525] font-inter text-[14px] font-normal'
        text='Next'
        disabled={currentPage === totalPages}
        onClick={() => paginate(currentPage + 1)}
        icon={<IconArrowRight className='inline-block size-4' />}
        iconPosition={ButtonIconPosition.RIGHT}
      />
    </nav>
  );
}
