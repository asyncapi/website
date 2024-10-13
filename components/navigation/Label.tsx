import React from 'react';

enum LabelColor {
  Gray = 'gray',
  Green = 'green'
}

interface LabelProps {
  text: string;
  color?: LabelColor;
}

/**
 * @description Component representing a label with optional color styling.
 * @param {string} props.text - The text to be displayed in the label.
 * @param {LabelColor} [props.color=LabelColor.Gray] - The color of the label, either 'gray' or 'green'. Default is 'gray'.
 */
export default function Label({ text, color = LabelColor.Gray }: LabelProps) {
  let colorClasses: string;

  switch (color) {
    case LabelColor.Gray:
      colorClasses = 'bg-gray-300 text-gray-700';
      break;
    case LabelColor.Green:
      colorClasses = 'bg-green-300 text-green-700';
      break;
    default:
      colorClasses = 'bg-gray-300 text-gray-700'; // Default case
  }

  return (
    <span className={`ml-2 inline-block -translate-y-0.5 rounded px-1 py-0 text-xs uppercase${colorClasses}`}>
      {text}
    </span>
  );
}
