import React from 'react';
import { FaLinkedin } from 'react-icons/fa';

interface IconLinkedInProps {
  className?: string;
  size?: number;
}

const IconLinkedIn: React.FC<IconLinkedInProps> = ({ className = '', size = 24 }) => {
  return <FaLinkedin className={className} size={size} />;
};

export default IconLinkedIn;
