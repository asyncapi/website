interface SelectTagsProps {
  name?: string;
  bgColor: string;
  borderColor: string;
};

/**
 * @description This component displays tags.
 *
 * @param {SelectTagsProps} props - The props for the Select Tags component.
 * @param {string} props.name - The content to be displayed inside the tag.
 * @param {string} props.bgColor - The color of the tag.
 * @param {string} props.borderColor - The border color of the tag.
 */
export default function SelectTags({
  name = '',
  bgColor,
  borderColor
} : SelectTagsProps) {
  return (
    <div className={`rounded-lg px-2 py-1 text-center text-sm ${bgColor} border ${borderColor}`} data-testid='Tags-main'>
      {name}
    </div>
  );
};
