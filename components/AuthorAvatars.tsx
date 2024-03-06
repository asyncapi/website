import React from 'react';

interface IAuthorAvatarsProps {
  authors: {
    name: string;
    photo: string;
    link?: string;
  }[];
}

/**
 * @param props.authors - The authors of the blog post to render
 * @returns The avatars of the authors of the blog post
 */
export default function AuthorAvatars({ authors = [] } : IAuthorAvatarsProps) {
  return (
    <>{
      authors.map((author, index) => {
        const avatar = (
          <img
            key={index}
            title={author.name}
            className={`${index > 0 ?
              `left- absolute${index * 7} top-0` :
              `mr- relative${(authors.length - 1) * 7}`} z-${(authors.length - 1 - index) * 10} 
                    size-10 rounded-full border-2 border-white object-cover hover:z-50`}
            src={author.photo}
            alt={`Avatar of ${author.name}`}
            loading='lazy'
            data-testid='AuthorAvatars-img'
          />
        );

        return author.link ? (
          <a href={author.link} data-testid='AuthorAvatars-link'>
            {avatar}
          </a>
        ) : (
          <React.Fragment key={index}>{avatar}</React.Fragment>
        );
      })}
    </>
  );
}
