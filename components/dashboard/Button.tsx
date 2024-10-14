import React from 'react';

interface ButtonProps {
  text: string;
  onClick: (event: React.MouseEvent<HTMLButtonElement>) => void;
}

/**
 * @description Button component.
 *
 * @param {ButtonProps} props - The props of the component.
 * @param {string} props.text - The text of the button.
 * @param {Function} props.onClick - The function to be called when the button is clicked.
 */
function Button({ text, onClick }: ButtonProps) {
  return (
    <button
      onClick={onClick}
      className='rounded-r bg-gray-300 px-4 py-2 text-sm font-semibold text-gray-800 hover:bg-gray-400'
    >
      {text}
    </button>
  );
}

export default Button;
