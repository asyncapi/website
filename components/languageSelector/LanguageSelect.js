import { twMerge } from 'tailwind-merge'
export default function LanguageSelect({
    className = '',
    onChange = () => { },
    options = [],
    selected,
}) {
    return (
        <select data-testid="Select-form"
            onChange={(ev) => onChange(ev.target.value)}
            className={twMerge(`form-select h-full py-0 px-3 pr-7 inline-flex justify-center rounded-md border border-gray-300 shadow-sm py-2 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 focus:ring-indigo-500 ${className}`)}
            value={selected}
        >
            {options.map((option, index) => (
                <option key={index} selected={option.value === selected} value={option.value} data-testid="Option-form">
                    {option.text}
                </option>
            ))}
        </select>
    )
}