export interface ToggleProps {
  // eslint-disable-next-line prettier/prettier

  /** Current state of the toggle. */
  checked: boolean;

  /** Function to update the toggle state. */
  setChecked: React.Dispatch<React.SetStateAction<boolean>>;

  /** Label text for the toggle. */
  label?: string;

  /** The background color of the checkbox. */
  bgColor?: string;

  /** The background color of the checkbox when it is checked. */
  checkedStateBgColor?: string;
}
