import { twMerge } from "tailwind-merge"
import { useState, useEffect, useRef } from "react"
import ArrowDown from "../icons/ArrowDown"

export default function MultiSelect({
    className = '',
    onChange = () => { },
    options = [],
    selected = [],
}) {
    const [toggleDropdown, setToggleDropdown] = useState(false)
    const dropDownRef = useRef(null)

    const handleOptionToggle = (option) => {
        const isSelected = selected.includes(option.value);
        if (isSelected) {
            onChange(selected.filter((selected) => selected !== option.value));
        } else {
            onChange([...selected, option.value]);
        }
    };

    const handleClickOutside = (event) => {
        if (dropDownRef.current && !dropDownRef.current.contains(event.target)) {
            setToggleDropdown(false);
        }
    };

    useEffect(() => {
        document.addEventListener('click', handleClickOutside);
        return () => {
            document.removeEventListener('click', handleClickOutside);
        };
    }, []);
    return (
        <div className={twMerge(`relative h-auto text-left rounded-md ${className}`)} ref={dropDownRef}>
            <button
                type="button"
                className="justify-between h-full w-full flex gap-2 bg-white text-sm font-medium text-gray-600"
                aria-haspopup="true"
                aria-expanded="true"
                onClick={() => setToggleDropdown(!toggleDropdown)}
            >
                <div className="w-fit my-auto">
                    {selected.length === 0 ? 'Select Subscription Type' : `${selected.length} subscriptions selected`}
                </div>
                <div className="w-fit my-auto">
                    <ArrowDown className={toggleDropdown ? 'rotate-180' : ''} />
                </div>
            </button>
            <div
                className={`origin-top-right absolute right-0 mt-4 w-full md:max-w-[14rem] rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none ${!toggleDropdown ? 'hidden' : ''
                    }`}
                role="menu"
                aria-orientation="vertical"
                aria-labelledby="options-menu"
            >
                <div className="py-1" role="none">
                    {options.map((option) => (
                        <div
                            key={option.value}
                            className="flex items-center px-4 py-2 text-sm text-gray-700 cursor-pointer hover:bg-gray-100"
                            role="menuitem"
                            onClick={() => handleOptionToggle(option)}
                        >
                            <input
                                type="checkbox"
                                className="form-checkbox h-5 w-5 text-indigo-600"
                                checked={selected.includes(option.value)}
                                readOnly
                            />
                            <span className="ml-2">{option.text}</span>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}
