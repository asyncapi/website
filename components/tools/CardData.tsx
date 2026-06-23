import React, { useEffect, useRef, useState } from 'react';
import TextTruncate from 'react-text-truncate';
import { twMerge } from 'tailwind-merge';

import type { VisibleDataListType } from '@/types/components/tools/ToolDataType';

import InfoIcon from '../icons/InfoIcon';

interface CardDataProps {
  visible: VisibleDataListType;
  heading: string;
  data: string;
  read: boolean;
  setRead: React.Dispatch<React.SetStateAction<boolean>>;
  setVisible: React.Dispatch<React.SetStateAction<VisibleDataListType>>;
  type: keyof VisibleDataListType;
  className?: string;
}

/**
 * @description This component displays Card.
 *
 * @param {SelectTagsProps} props - The props for the Cards Data component.
 * @param {string} props.className - Additional CSS classes for the component.
 * @param {VisibleDataListType} props.visible - Visibility status for different types.
 * @param {string} props.heading - The heading text.
 * @param {string} props.data - The data to be displayed.
 * @param {boolean} props.read - Read status.
 * @param {React.Dispatch<React.SetStateAction<boolean>>} props.setRead - Function to set read status.
 * @param {React.Dispatch<React.SetStateAction<VisibleDataListType>>} props.setVisible - Function to set visibility status.
 * @param {string} props.type - Type of the card data.
 */
export const CardData = ({
  visible,
  heading,
  data,
  read,
  setRead,
  setVisible,
  type,
  className = ''
}: CardDataProps) => {
  const [outsideClick, setOutsideClick] = useState<boolean>(true);
  const [description, setShowDescription] = useState<boolean>(false);
  const initial = {
    lang: false,
    tech: false,
    category: false,
    pricing: false,
    ownership: false
  };
  const domNode = useRef<HTMLSpanElement>(null);

  // Decide whether to show full description or not in the card based on the
  // number of lines occupied by the description.
  useEffect(() => {
    const divHeight = domNode.current?.offsetHeight || 0;
    const numberOfLines = divHeight / 20;

    if (numberOfLines > 3) {
      setShowDescription(true);
    } else {
      setShowDescription(false);
    }
  }, [visible]);

  // Decide whether the user click outside this component (card description) or not.
  useEffect(() => {
    const maybeHandler = (event: MouseEvent) => {
      if (domNode.current && !domNode.current.contains(event.target as Node)) {
        // Clicked outside: hide tooltip and reset visibility so it won't
        // reappear on the next arbitrary click (fixes #5098)
        setOutsideClick(false);
        setVisible((prev) => ({ ...prev, [type]: false }));
        setRead(false);
      } else {
        setOutsideClick(true);
      }
    };

    document.addEventListener('mousedown', maybeHandler);

    return () => {
      document.removeEventListener('mousedown', maybeHandler);
    };
  }, [type, setVisible, setRead]);

  return (
    <div className={twMerge('text-left text-sm text-gray-500 dark:text-gray-300', className)}>
      {heading}
      <span className='group relative inline-flex'>
        {outsideClick && visible[type] && (
          <span
            ref={domNode}
            data-testid='Carddata-description'
            className='absolute left-0 top-7 z-50 max-h-60 w-64 max-w-[calc(100vw-2rem)] overflow-y-auto
              rounded-lg border border-gray-200 bg-white px-3 py-2 text-xs text-gray-700 shadow-xl
              dark:border-gray-600 dark:bg-dark-card dark:text-gray-300 dark:shadow-2xl'
          >
            {read ? (
              data
            ) : (
              <div>
                <TextTruncate element='span' line={4} text={data} />
              </div>
            )}
            {description && (
              <button
                className='cursor-pointer text-cyan-600 hover:text-cyan-700 dark:text-cyan-400 dark:hover:text-cyan-300'
                onClick={() => {
                  setOutsideClick(true);
                  setRead(!read);
                }}
              >
                {read ? ' Show Less' : ' Show More'}
              </button>
            )}
          </span>
        )}
        <button
          onClick={() => {
            setRead(false);
            setVisible({ ...initial, [type]: !visible[type] });
          }}
          className='mx-1 text-gray-600 transition-colors hover:text-gray-900 dark:text-gray-300 dark:hover:text-white'
          data-testid='Carddata-button'
        >
          <InfoIcon />
        </button>
      </span>
    </div>
  );
};
