import React from 'react';

interface SelectTagsProps {
  // eslint-disable-next-line prettier/prettier

  /** The content to be displayed inside the tag. */
  name?: string;

  /** The color of the tag. */
  bgColor: string;

  /** The border color of the tag. */
  borderColor: string;
}

/**
 * This component displays tags. These tags are displayed for languages and technologies in the tools card.
 */
export default function SelectTags({ name = '', bgColor, borderColor }: SelectTagsProps) {
  return (
    <div
      className={`rounded-lg px-2 py-1 text-center text-sm ${bgColor} border ${borderColor}`}
      data-testid='Tags-main'
    >
      {name}
    </div>
  );
}
