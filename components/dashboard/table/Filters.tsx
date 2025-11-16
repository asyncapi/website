import { useFloating } from '@floating-ui/react-dom-interactions';
import type { RefObject } from 'react';
import React, { useEffect, useRef, useState } from 'react';

import type { Issue } from '@/types/components/dashboard/TableTypes';

import Select from '../../form/Select';

interface FilterProps {
  className?: string;
  issues: Issue[];
  allIssues: Issue[];
  selectedRepo: string;
  selectedArea: string;
  setSelectedRepo: (repo: string) => void;
  setSelectedArea: (area: string) => void;
}

/**
 * @description Hook that alerts clicks outside of the passed ref
 */
function useOutsideAlerter(ref: RefObject<any>, setOpen: (open: boolean) => void) {
  /**
   * @description This useEffect handles the click event outside of the element
   */
  useEffect(() => {
    /**
     * @description Alert if clicked on outside of element
     */
    function handleClickOutside(event: MouseEvent) {
      if (ref.current && !ref.current.contains(event.target)) {
        setOpen(false);
      }
    }
    // Bind the event listener
    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      // Unbind the event listener on clean up
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [ref, setOpen]);
}

/**
 * @description Filter component that allows users to filter issues by repository and area.
 *
 * @param {FilterProps} props - The props for the component.
 * @param {string} props.className - The class name for the component.
 * @param {Issue[]} props.issues - The list of issues to filter.
 * @param {Issue[]} props.allIssues - The list of all issues.
 * @param {string} props.selectedRepo - The selected repository.
 * @param {string} props.selectedArea - The selected area.
 * @param {(repo: string) => void} props.setSelectedRepo - The function to set the selected repository.
 * @param {(area: string) => void} props.setSelectedArea - The function to set the selected area.
 */
export default function Filters({
  className,
  allIssues,
  selectedRepo,
  selectedArea,
  setSelectedRepo,
  setSelectedArea
}: FilterProps) {
  const [open, setOpen] = useState(false);
  const [placement, setPlacement] = useState<'left-start' | 'bottom-end'>('left-start');

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) {
        setPlacement('bottom-end');
      } else {
        setPlacement('left-start');
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const { x, y, reference, floating, strategy } = useFloating({
    placement,
    open
  });

  const wrapperRef = useRef(null);

  useOutsideAlerter(wrapperRef, setOpen);
  const areas = allIssues.map((issue) => issue.area);
  const uniqueAreas = ['All', ...Array.from(new Set(areas))].map((area) => ({
    value: area === undefined ? 'All' : area,
    text: area === undefined ? 'All' : area
  }));

  const repos = allIssues.map((issue) => issue.repo);
  const uniqueRepos = ['All', ...Array.from(new Set(repos))].map((repo) => ({
    value: repo,
    text: repo
  }));

  return (
    <>
      <button
        onClick={() => setOpen(!open)}
        ref={reference}
        className={`flex items-center justify-center w-8 h-8 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-dark-background hover:bg-gray-50 dark:hover:bg-dark-card transition-all duration-200 hover:shadow-md ${className}`}
        aria-label='Filter issues'
        data-testid='Filters-img-container'
      >
        <img
          alt='filter menu'
          src='/img/illustrations/icons/filters-icon.svg'
          className='w-4 h-4 dark:invert dark:opacity-80'
        />
      </button>

      <div ref={wrapperRef}>
        {open && (
          <div
            ref={floating}
            className='z-50'
            style={{
              position: strategy,
              top: y ?? '',
              left: x ?? '',
              right: placement === 'bottom-end' ? '1rem' : undefined
            }}
            data-testid='Filter-menu'
          >
            <div className='w-[calc(100vw-2rem)] max-w-[19rem] sm:w-96 rounded-xl bg-white dark:bg-dark-card shadow-2xl dark:shadow-2xl border border-gray-200 dark:border-gray-700 overflow-hidden z-50'>
              <div className='flex items-center justify-between px-4 sm:px-5 py-3 sm:py-4 bg-gradient-to-r from-gray-50 to-white dark:from-dark-background dark:to-dark-card border-b border-gray-200 dark:border-gray-700'>
                <div className='flex items-center gap-2'>
                  <div className='w-7 h-7 sm:w-8 sm:h-8 rounded-lg bg-primary-100 dark:bg-primary-900/30 flex items-center justify-center flex-shrink-0'>
                    <svg
                      className='w-3.5 h-3.5 sm:w-4 sm:h-4 text-primary-600 dark:text-primary-400'
                      fill='none'
                      viewBox='0 0 24 24'
                      stroke='currentColor'
                    >
                      <path
                        strokeLinecap='round'
                        strokeLinejoin='round'
                        strokeWidth={2}
                        d='M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z'
                      />
                    </svg>
                  </div>
                  <h4 className='text-sm sm:text-base font-semibold dark:text-white'>Filter Issues</h4>
                </div>
                <button
                  onClick={() => setOpen(!open)}
                  className='ml-auto p-1.5 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors flex-shrink-0'
                  aria-label='Close filter menu'
                >
                  <img
                    src='/img/illustrations/icons/close-icon.svg'
                    alt='close'
                    className='w-4 h-4 dark:invert dark:opacity-80'
                  />
                </button>
              </div>
              <div className='flex flex-col gap-4 p-4 sm:p-5'>
                <div>
                  <h5 className='text-xs font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400 mb-3'>
                    BY REPOSITORY
                  </h5>
                  <Select options={uniqueRepos} onChange={setSelectedRepo} className='w-full' selected={selectedRepo} />
                </div>
                <div>
                  <h5 className='text-xs font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400 mb-3'>
                    BY AREA
                  </h5>
                  <Select options={uniqueAreas} onChange={setSelectedArea} className='w-full' selected={selectedArea} />
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
