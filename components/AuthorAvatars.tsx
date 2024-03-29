import React from 'react';

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
      {authors.map((author, index) => {
        const avatar = (
          <img
            key={index}
            title={author.name}
            className={`${index > 0 ? `left- absolute${index * 7} top-0` : `mr- relative${(authors.length - 1) * 7}`} 
              z-${(authors.length - 1 - index) * 10} size-10 rounded-full border-2 
              border-white object-cover hover:z-50`}
            src={author.photo}
            loading='lazy'
            data-testid='AuthorAvatars-img'
            alt={author.name} // Added alt attribute here
          />
        );

        return author.link ? (
          <a href={author.link} key={index} data-testid='AuthorAvatars-link'>
            {avatar}
          </a>
        ) : (
          <React.Fragment key={index}>{avatar}</React.Fragment>
        );
      })}
    </>
  );
}
