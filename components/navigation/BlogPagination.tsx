import React from 'react';
import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';
import IconArrowRight from '../icons/ArrowRight';
import IconArrowLeft from '../icons/ArrowLeft';
import Button from '../buttons/Button';
import { ButtonIconPosition } from '@/types/components/buttons/ButtonPropsType';


interface BlogPaginationProps {
    blogsPerPage: number;
    totalBlogs: number;
    paginate: (pageNumber: number) => void;
}

export default function BlogPagination({ blogsPerPage, totalBlogs, paginate }: BlogPaginationProps) {
    const router = useRouter();
    const { page } = router.query;
    const currentPage: number = parseInt(page as string);
    const totalPages: number = Math.ceil(totalBlogs / blogsPerPage);
    const pagesToShow: number = 6;
    const [pageNumbers, setPageNumbers] = useState<(number | string)[]>([]);

    const calculatePageNumbers = () => {
        const pageNumbers: (number | string)[] = [];
        if (totalPages <= pagesToShow) {
            for (let i = 1; i <= totalPages; i++) {
                pageNumbers.push(i);
            }
        } else {
            if (currentPage <= 2) {
                for (let i = 1; i <= 3; i++) {
                    pageNumbers.push(i);
                }
                pageNumbers.push('...');
                pageNumbers.push(totalPages - 2);
                pageNumbers.push(totalPages - 1);
                pageNumbers.push(totalPages);
            } else if (currentPage >= totalPages - 1) {
                pageNumbers.push(1);
                pageNumbers.push(2);
                pageNumbers.push(3);
                pageNumbers.push('...');
                for (let i = totalPages - 2; i <= totalPages; i++) {
                    pageNumbers.push(i);
                }
            } else {
                pageNumbers.push(1);
                pageNumbers.push('...');
                pageNumbers.push(currentPage - 1);
                pageNumbers.push(currentPage);
                pageNumbers.push(currentPage + 1);
                pageNumbers.push('...');
                pageNumbers.push(totalPages);
            }
        }
        return pageNumbers;
    };

    useEffect(() => {
        setPageNumbers(calculatePageNumbers());
    }, [currentPage, totalBlogs]);

    return (
        <div className='flex justify-center items-center p-4 gap-2 mt-8'>
            <Button
                className={`${currentPage === 1 && 'opacity-50 cursor-not-allowed'} w-[120px] h-[35px] py-2 px-4 rounded-l-md`}
                bgClassName='bg-white'
                textClassName='text-[#212525] font-inter text-[14px] font-normal'
                text='Previous'
                disabled={currentPage === 1}
                onClick={() => paginate(currentPage - 1)}
                icon={<IconArrowLeft className='w-4 h-4 inline-block' />}
                iconPosition={ButtonIconPosition.LEFT}
            />
            <div className='flex justify-center gap-3 w-[35vw]'>
                {pageNumbers.map((number, index) => (
                    <button
                        key={index}
                        className={`w-[40px] h-[40px] ${number === currentPage ? 'border rounded bg-[#6200EE] text-white' : 'text-[#6B6B6B'}`}
                        onClick={() => typeof number === 'number' && paginate(number)}
                        disabled={number === '...'}
                    >
                        {number}
                    </button>
                ))}
            </div>
            <Button
                className={`${currentPage === totalPages && 'opacity-50 cursor-not-allowed'} w-[120px] h-[35px] py-2 px-4 rounded-l-md`}
                bgClassName='bg-white'
                textClassName='text-[#212525] font-inter text-[14px] font-normal'
                text='Next'
                disabled={currentPage === totalPages}
                onClick={() => paginate(currentPage + 1)}
                icon={<IconArrowRight className='w-4 h-4 inline-block' />}
                iconPosition={ButtonIconPosition.RIGHT}
            />
        </div>
    );
}

