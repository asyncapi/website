export enum InputTypes {
  TEXT = 'text',
  EMAIL = 'email',
  NUMBER = 'number'
}
export interface InputBoxProps {
  // eslint-disable-next-line prettier/prettier

  /** Type of the input. */
  inputType: InputTypes | string;

  /** Name of the input. */
  inputName: string;

  /** Placeholder of the input. */
  placeholder: string;

  /** Value of the input. */
  inputValue: string;

  /** The function to set value of the input. */
  setInput: (value: string) => void;
}
