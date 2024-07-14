import React from 'react';

import Avatar from './Avatar';

interface Author {
  name: string;
  photo: string;
  link?: string;
}

interface AuthorAvatarsProps {
  authors: Author[];
}

/**
 * @description This component takes an array of authors and renders their avatars.
 * @param {AuthorAvatarsProps} props - The component props.
 * @param {Author[]} props.authors - The authors to render avatars for.
 */
export default function AuthorAvatars({ authors = [] }: AuthorAvatarsProps) {
  return (
    <>
      {authors.map((author, index) => (
        <Avatar
          key={index}
          {...author}
          className={`${index > 0 ? `left- absolute${index * 7} top-0` : `mr- relative${(authors.length - 1) * 7}`}
        z-${(authors.length - 1 - index) * 10}`}
        />
      ))}
    </>
  );
}
