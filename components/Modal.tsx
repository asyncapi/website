import React, { useEffect, useRef } from 'react';

interface IModalProps {
  title: string;
  children: React.ReactNode;
  onModalClose?: () => void;
}

/**
 * @description Modal component.
 * @param {string} props.title - The title of the modal.
 * @param {React.ReactNode} props.children - The content of the modal.
 * @param {function} props.onModalClose=()=>{} - Function to handle modal close event.
 */
export default function Modal({ title, children, onModalClose = () => {} }: IModalProps) {
  const modalRef = useRef<HTMLDivElement>(null);

  // Focus the modal when it mounts and trap focus
  useEffect(() => {
    if (modalRef.current) {
      modalRef.current.focus();
      
      // Focus trap: prevent focus from leaving the modal
      const focusableElements = modalRef.current.querySelectorAll(
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
      );
      const firstElement = focusableElements[0] as HTMLElement;
      const lastElement = focusableElements[focusableElements.length - 1] as HTMLElement;

      const handleTabKey = (e: KeyboardEvent) => {
        if (e.key === 'Tab') {
          if (e.shiftKey) {
            if (document.activeElement === firstElement) {
              lastElement?.focus();
              e.preventDefault();
            }
          } else {
            if (document.activeElement === lastElement) {
              firstElement?.focus();
              e.preventDefault();
            }
          }
        }
      };

      document.addEventListener('keydown', handleTabKey);
      return () => document.removeEventListener('keydown', handleTabKey);
    }
  }, []);

  /**
   * @description Handles the backdrop click event.
   * @param {React.MouseEvent<HTMLDivElement>} e - The event object.
   */
  function backdropClickHandler(e: React.MouseEvent<HTMLDivElement>) {
    if (modalRef.current && (modalRef.current === e.target || !modalRef.current.contains(e.target as Node))) {
      onModalClose();
    }
  }

  /**
   * @description Handles the key up event.
   * @param {React.KeyboardEvent<HTMLDivElement>} e - The event object.
   */
  function onKeyUpHandler(e: React.KeyboardEvent<HTMLDivElement>) {
    if (e.key === 'Escape') onModalClose();
  }

  return (
    <div
      ref={modalRef}
      tabIndex={-1}
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
      className='fixed inset-0 z-30 my-auto mt-2 flex min-h-full items-end justify-center bg-black/30 p-4 text-center backdrop-blur sm:items-center sm:p-0'
      onClick={backdropClickHandler}
      onKeyUp={onKeyUpHandler}
    >
      <div className='relative m-auto overflow-hidden rounded-lg bg-white px-4 pb-4 pt-5 text-left shadow-xl transition-all sm:w-full sm:max-w-4xl sm:p-6'>
        <div className='mb-6 flex justify-between'>
          <h1 id="modal-title" className='mr-4 truncate text-lg font-bold'>{title}</h1>
          <button 
            onClick={() => onModalClose()} 
            data-testid='Modal-close'
            aria-label="Close modal"
            className="focus:outline-none focus:ring-2 focus:ring-primary-500 rounded-md p-1"
          >
            <svg
              xmlns='http://www.w3.org/2000/svg'
              fill='none'
              viewBox='0 0 24 24'
              strokeWidth={1.5}
              stroke='currentColor'
              className='size-6'
            >
              <path strokeLinecap='round' strokeLinejoin='round' d='M6 18L18 6M6 6l12 12' />
            </svg>
          </button>
        </div>
        <div className='max-h-[65vh] w-full overflow-auto lg:max-h-[70vh]'>{children}</div>
      </div>
    </div>
  );
}
