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
