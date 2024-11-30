import React from 'react';

/* eslint-disable max-len */
/**
 * @description Icons for asyncapi website
 */
interface DocsArrowProps {
  isDropDown: boolean;
  activeDropDownItem: boolean;
  onClick: (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => void;
  className?: string;
}

/**
 * @param {boolean} props.isDropDown - The isDropDown attribute for the div tag.
 * @param {boolean} props.activeDropDownItem - The activeDropDownItem attribute for the div tag.
 * @param {function} props.onClick - The onClick attribute for the div tag.
 * @param {string} props.className - The className attribute for the div tag.
 */
export default function DocsArrow({ isDropDown, activeDropDownItem, onClick, className }: DocsArrowProps) {
  return (
    <div
      className={`my-auto w-6 cursor-pointer rounded-md p-2 ${isDropDown && 'hover:bg-gray-100'}`}
      onClick={isDropDown ? onClick : () => {}}
    >
      {isDropDown && (
        <img
          alt='docs arrow'
          src='/img/illustrations/icons/arrow.svg'
          className={`m-auto w-fit transition-transform duration-200${className} ${activeDropDownItem ? 'rotate-90' : ''}`}
        />
      )}
    </div>
  );
}
