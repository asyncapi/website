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
      setOutsideClick(true);
      if (domNode.current && !domNode.current.contains(event.target as Node)) {
        setOutsideClick(false);
      }
    };

    document.addEventListener('mousedown', maybeHandler);

    return () => {
      document.removeEventListener('mousedown', maybeHandler);
    };
  }, []);

  return (
    <div className={twMerge('text-left text-sm text-gray-500', className)}>
      {heading}
      <span className='group relative'>
        {outsideClick && visible[type] && (
          <span
            ref={domNode}
            data-testid='Carddata-description'
            className='absolute -left-2/3 -top-4 z-10 w-48 translate-x-1/3 rounded border border-gray-200
              bg-white px-2 py-1 text-xs shadow-md'
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
                className='cursor-pointer text-cyan-600'
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
          className='mx-1'
          data-testid='Carddata-button'
        >
          <InfoIcon />
        </button>
      </span>
    </div>
  );
};
