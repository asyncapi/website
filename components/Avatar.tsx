import React from 'react';

interface AvatarProps {
  // eslint-disable-next-line prettier/prettier

  /** The name of the avatar. */
  name: string;

  /** The photo of the avatar. */
  photo: string;

  /** The link of the avatar. */
  link?: string;

  /** The class name to be applied to the avatar. */
  className: string;
}

/**
 * This component renders avatar.
 */
export default function Avatar({ name, photo, link, className }: AvatarProps) {
  const avatar = (
    <img
      title={name}
      className={`size-10 rounded-full border-2 border-white object-cover hover:z-50 ${className}`}
      src={photo}
      loading='lazy'
      data-testid='Avatars-img'
      alt={name}
    />
  );

  return link ? (
    <a href={link} data-testid='Avatars-link'>
      {avatar}
    </a>
  ) : (
    <React.Fragment>{avatar}</React.Fragment>
  );
}
