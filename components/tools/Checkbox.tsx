import { twMerge } from 'tailwind-merge';

export interface CheckboxProps {
  // eslint-disable-next-line prettier/prettier

  /** The name to be displayed inside the checkbox. */
  name: string;

  /** If the checkbox is checked or not. */
  checked: boolean;

  /** The background color of the checkbox. */
  bgColor?: string;

  /** The text color of the checkbox. */
  textColor?: string;

  /** The border color of the checkbox. */
  borderColor?: string;

  /** The background color of the checkbox when it is checked. */
  checkedStateBgColor?: string;

  /** The text color of the checkbox when it is checked. */
  checkedStateTextColor?: string;

  /** Function to handle the click event of the checkbox. */
  handleClickOption: (name: string) => void;
}

/**
 * This component renders a checkbox.
 */
const Checkbox = ({
  name,
  checked,
  bgColor = 'bg-white',
  textColor = 'text-secondary-600',
  borderColor = 'border-secondary-600',
  checkedStateBgColor = 'bg-secondary-600',
  checkedStateTextColor = 'text-white',
  handleClickOption
}: CheckboxProps) => {
  const handleClick = (event: React.MouseEvent) => {
    event.stopPropagation(); // Prevents the event from propagating to parent elements
    handleClickOption(name);
  };

  return (
    <div
      className={twMerge(
        `border ${borderColor} ${bgColor} ${textColor} p-1 pb-0 rounded-2xl flex gap-1 cursor-pointer items-start ${checked ? `${checkedStateBgColor} ${checkedStateTextColor}` : ''}`
      )}
      onClick={handleClick}
    >
      {checked ? (
        <img src='/img/illustrations/icons/CheckedIcon.svg' alt='checked' />
      ) : (
        <img src='/img/illustrations/icons/UncheckedIcon.svg' alt='unchecked' />
      )}
      <div className='-mt-px mb-px text-xs'>{name}</div>
    </div>
  );
};

export default Checkbox;
