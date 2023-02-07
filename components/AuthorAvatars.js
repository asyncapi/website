import {buildImageUrl } from 'cloudinary-build-url'


export default function AuthorAvatars({ authors = [] }) {
  return (
    authors.map((author, index) => {
      let authorPhoto = `https://www.asyncapi.com${author.photo}`
      authorPhoto = buildImageUrl(authorPhoto, {
        cloud: {
          storageType: 'fetch'
        },
        transformations: {
          resize: {
            type: 'fill',
            width: 40,
            height: 40,
          },
          radius: 'max',
        }
      });
      let avatar = <img
        key={index}
        title={author.name}
        className={`${index > 0 ? `absolute left-${index * 7} top-0` : `relative mr-${(authors.length - 1) * 7}`} z-${(authors.length - 1 - index) * 10} border-2 border-white object-cover hover:z-50`}
        src={authorPhoto}
        loading="lazy"
      />

      return author.link ? <a alt={author.name} href={author.link}>{avatar}</a> : {avatar}
    })
  )
}