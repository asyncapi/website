import { useEffect, useRef, useState } from 'react';
import { useFloating } from '@floating-ui/react-dom-interactions';
import Select from '../../form/Select';

/**
 * Hook that alerts clicks outside of the passed ref
 */
function useOutsideAlerter(ref, setOpen) {
  useEffect(() => {
    /**
     * Alert if clicked on outside of element
     */
    function handleClickOutside(event) {
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

export default function Filters({
  className,
  issues,
  setSelectedRepo,
  allIssues,
  setSelectedArea,
  selectedArea,
  selectedRepo,
}) {
  const [open, setOpen] = useState(false);
  const { x, y, reference, floating, strategy } = useFloating({
    placement: 'left-start',
    open,
  });
  const wrapperRef = useRef(null);
  useOutsideAlerter(wrapperRef, setOpen);
  const areas = allIssues.map((issue) => issue.area);
  const uniqueAreas = ['All', ...new Set(areas)].map((area) => ({
    key: area,
    text: area,
  }));

  const repos = allIssues.map((issue) => issue.repo);
  const uniqueRepos = ['All', ...new Set(repos)].map((repo) => ({
    key: repo,
    text: repo,
  }));

  return (
    <>
      <img
        onClick={() => setOpen(!open)}
        ref={reference}
        alt='filter menu'
        src="/img/illustrations/icons/filters-icon.svg"
        className={`cursor-pointer ${className}`}
      />
      <div ref={wrapperRef}>
        {open && (
          <div
            ref={floating}
            style={{
              position: strategy,
              top: y ?? '',
              left: x ?? '',
            }}
          >
            <div className="bg-white w-96 shadow-xl rounded">
              <div className="flex p-4">
                <h4 className="text-base">Filter Issues</h4>
                <button onClick={() => setOpen(!open)} className="ml-auto">
                  <img src="/img/illustrations/icons/close-icon.svg" />
                </button>
              </div>
              <div className="w-full h-px bg-gray-900" />
              <div className="p-4 flex flex-col gap-2">
                <h5 className="text-base">BY REPOSITORY</h5>
                <Select
                  options={uniqueRepos}
                  onChange={setSelectedRepo}
                  className="w-full mb-4 "
                  selected={selectedRepo}
                />
                <h5 className="text-base">BY AREA</h5>
                <Select
                  options={uniqueAreas}
                  onChange={setSelectedArea}
                  className="w-full"
                  selected={selectedArea}
                />
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
