interface LabelProps {
    text: string;
    color?: 'gray' | 'green'; // Define the color prop as optional with specific values
}

/**
 * @description Component representing a label with optional color styling.
 * @param {string} props.text - The text to be displayed in the label.
 * @param {'gray' | 'green'} [props.color='gray'] - The color of the label, either 'gray' or 'green'. Default is 'gray'.
 */
export default function Label({ text, color = 'gray' }: LabelProps) {
  let colorClasses: string;

  switch (color) {
    case 'gray':
      colorClasses = 'bg-gray-300 text-gray-700';
      break;
    case 'green':
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
