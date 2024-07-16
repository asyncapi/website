import React from 'react';

export interface InputBoxProps {
  // eslint-disable-next-line prettier/prettier

  /** Type of the input. */
  inputType: string;

  /** Name of the input. */
  inputName: string;

  /** Placeholder of the input. */
  placeholder: string;

  /** Value of the input. */
  inputValue: string;

  /** The function to set value of the input. */
  setInput: (value: string) => void;
}

/**
 * This component renders input box.
 */
export default function InputBox({ inputType, inputName, placeholder, inputValue, setInput }: InputBoxProps) {
  return (
    <input
      type={inputType}
      name={inputName}
      placeholder={placeholder}
      value={inputValue}
      onChange={(e) => setInput(e.target.value)}
      className='form-input mt-2 block w-full rounded-md sm:text-sm sm:leading-5 md:mt-0 md:flex-1'
      required
      data-testid={`NewsletterSubscribe-${inputType}-input`}
    />
  );
}
