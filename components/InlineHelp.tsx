import React, { useEffect, useState } from 'react';

import { registerClickAway } from './helpers/click-away';
import QuestionMark from './icons/QuestionMark';

interface InlineHelpProps {
  className?: string;
  text: string;
}

/**
 * @description This component displays Inline Help about  outcome. solution, and implementation in the Roadmap page.
 * @param {InlineHelpProps} props - Props for  the InlineHelp component.
 * @param {string} props.className - Additional CSS classes for styling.
 * @param {string} props.text - The text to display in the inline help.
 */
export default function InlineHelp({ className = 'lg:relative inline-block', text }: InlineHelpProps) {
  const [isHelpVisible, setIsHelpVisible] = useState<boolean>(false);

  useEffect(() => {
    if (isHelpVisible) {
      registerClickAway(() => {
        setIsHelpVisible(false);
      });
    }
  }, [isHelpVisible]);

  return (
    <div className={className}>
      {isHelpVisible && (
        <div
          className='absolute inset-x-0 mt-6 rounded bg-gray-800 p-2 text-center text-xs normal-case text-white lg:-ml-4 lg:w-48'
          data-testid='InlineHelp'
        >
          {text}
        </div>
      )}
      <QuestionMark
        className='-mt-0.5 inline-block h-4 cursor-pointer text-gray-500'
        onClick={() => setIsHelpVisible(!isHelpVisible)}
        onMouseEnter={() => setIsHelpVisible(true)}
        onMouseLeave={() => setIsHelpVisible(false)}
        data-testid='InlineHelp-icon'
      />
    </div>
  );
}
