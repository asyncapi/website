export default function AuthorAvatars({ authors = [] }) {
  return (
    authors.map((author, index) => {
      let avatar = <img
        key={index}
        title={author.name}
        className={`${index > 0 ? `absolute left-${index * 7} top-0` : `relative mr-${(authors.length - 1) * 7}`} z-${(authors.length - 1 - index) * 10} h-10 w-10 border-2 border-white rounded-full object-cover hover:z-50`}
        src={author.photo}
      />

      return author.link ? <a key={author.name} alt={author.name} href={author.link}>{avatar}</a> : {avatar}
    })
  )
}