import React from "react";

interface IconLinkedInProps {
  className?: string;
  size?: number;
  color?: string;
}

const IconLinkedIn: React.FC<IconLinkedInProps> = ({
  className = "",
  size = 24,
  color = "currentColor",
}) => {
  return (
    <svg
      className={className}
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill={color}
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M4.98 3.5c0 1.38-1.12 2.5-2.5 2.5S0 4.88 0 3.5 1.12 1 2.5 1s2.48 1.12 2.48 2.5zM.5 22h4V7h-4v15zM7.5 7h3.75v2.03h.05c.52-.99 1.8-2.03 3.7-2.03 3.96 0 4.7 2.6 4.7 5.98V22h-4v-7.22c0-1.72-.03-3.94-2.4-3.94-2.4 0-2.77 1.87-2.77 3.8V22h-4V7z" />
    </svg>
  );
};

export default IconLinkedIn;
