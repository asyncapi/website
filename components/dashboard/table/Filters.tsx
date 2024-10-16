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
  }, [ref]);
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
  const { x, y, reference, floating, strategy } = useFloating({
    placement: 'left-start',
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
      <img
        onClick={() => setOpen(!open)}
        ref={reference}
        alt='filter menu'
        src='/img/illustrations/icons/filters-icon.svg'
        className={`cursor-pointer ${className}`}
        data-testid='Filters-img-container'
      />

      <div ref={wrapperRef}>
        {open && (
          <div
            ref={floating}
            className={`${strategy} ${x && x > 0 ? `left-[${x}px]` : 'left-[14px]'}`}
            style={{
              top: y ?? '',
              left: x && x > 0 ? x : ''
            }}
            data-testid='Filter-menu'
          >
            <div className='w-96 max-w-[19rem] rounded bg-white shadow-xl'>
              <div className='flex p-4'>
                <h4 className='text-base'>Filter Issues</h4>
                <button onClick={() => setOpen(!open)} className='ml-auto'>
                  <img src='/img/illustrations/icons/close-icon.svg' alt='close' />
                </button>
              </div>
              <div className='h-px w-full bg-gray-900' />
              <div className='flex flex-col gap-2 p-4'>
                <h5 className='text-base'>BY REPOSITORY</h5>
                <Select
                  options={uniqueRepos}
                  onChange={setSelectedRepo}
                  className='mb-4 w-full '
                  selected={selectedRepo}
                />
                <h5 className='text-base'>BY AREA</h5>
                <Select options={uniqueAreas} onChange={setSelectedArea} className='w-full' selected={selectedArea} />
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
