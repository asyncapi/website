import { twMerge } from 'tailwind-merge';

interface Option {
  value: string;
  text: string;
}

interface LanguageSelectProps {
  className?: string;
  onChange: (value: string) => void;
  options: Option[];
  selected: string;
}

/**
 * @description LanguageSelect component for selecting a language.
 * @param {LanguageSelectProps} props - The props for the LanguageSelect component.
 */
export default function LanguageSelect({
  className = '',
  onChange = () => {},
  options = [],
  selected
}: LanguageSelectProps) {
  return (
    <select
      data-testid='Select-form'
      onChange={(ev) => onChange(ev.target.value)}
      className={twMerge(`form-select h-full py-0 px-3 pr-7 inline-flex justify-center rounded-md border border-gray-300 shadow-sm py-2 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:border-gray-500 focus:outline-none focus:ring-0 focus:ring-black ${className}`)}
      value={selected}
    >
      {options.map((option, index) => (
        <option key={index} value={option.value} data-testid='Option-form'>
          {option.text}
        </option>
      ))}
    </select>
  );
}
