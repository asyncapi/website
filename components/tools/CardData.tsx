import React, { useEffect, useRef, useState } from 'react';
import TextTruncate from 'react-text-truncate';

import InfoIcon from '../icons/InfoIcon';

type VisibleType = Record<string, boolean>;

interface CardDataProps {
  className: string;
  visible: VisibleType;
  heading: string;
  data: string;
  read: boolean;
  setRead: React.Dispatch<React.SetStateAction<boolean>>;
  setVisible: React.Dispatch<React.SetStateAction<VisibleType>>;
  type: string;
};

export const CardData = ({
  className,
  visible,
  heading,
  data,
  read,
  setRead,
  setVisible,
  type
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

  useEffect(() => {
    const divHeight = domNode.current?.offsetHeight || 0;
    const numberOfLines = divHeight / 20;

    if (numberOfLines > 3) {
      setShowDescription(true);
    } else {
      setShowDescription(false);
    }
  }, [visible]);

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
    <div className={className || 'text-left text-sm text-gray-500'}>
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
