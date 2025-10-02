import React from 'react';

import type { InputBoxProps } from '@/types/components/InputBoxPropsType';

/**
 * This component renders input box.
 */
export default function InputBox({
  inputType,
  inputName,
  placeholder,
  inputValue,
  setInput,
}: InputBoxProps) {
  return (
    <input
      type={inputType}
      name={inputName}
      placeholder={placeholder}
      value={inputValue}
      onChange={(e) => setInput(e.target.value)}
      className="form-input mt-2 block w-full rounded-md sm:text-sm sm:leading-5 md:mt-0 md:flex-1 bg-white dark:bg-dark-purple-800 text-gray-900 dark:text-white border-gray-300 dark:border-dark-purple-600 focus:border-secondary-500 dark:focus:border-dark-purple-500"
      required
      data-testid={`NewsletterSubscribe-${inputType}-input`}
    />
  );
}
