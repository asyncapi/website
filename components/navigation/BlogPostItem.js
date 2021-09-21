import moment from 'moment'
import TextTruncate from 'react-text-truncate'
import AuthorAvatars from '../AuthorAvatars'

export default function BlogPostItem({ post, className = '' }) {
  let typeColors = ['bg-indigo-100', 'text-indigo-800']

  switch (post.type.toLowerCase()) {
    case 'video':
      typeColors = ['bg-pink-100', 'text-pink-800']
      break
    case 'marketing':
      typeColors = ['bg-orange-100', 'text-orange-800']
      break
    case 'strategy':
      typeColors = ['bg-green-100', 'text-green-800']
      break
    case 'communication':
      typeColors = ['bg-teal-100', 'text-teal-800']
      break
  }

  return (
    <div className={`flex flex-col rounded-lg shadow-lg overflow-hidden ${className}`}>
      <a href={post.slug} className="flex-shrink-0">
        <img className="h-48 w-full object-cover" src={post.cover} alt="" />
      </a>
      <div className="flex-1 bg-white p-6 flex flex-col justify-between">
        <div className="flex-1">
          <p className="text-sm leading-5 font-normal text-indigo-500">
            <span className={`inline-flex items-center px-3 py-0.5 rounded-full text-sm font-medium leading-5 ${typeColors[0]} ${typeColors[1]}`}>
              {post.type}
            </span>
          </p>
          <a href={post.slug} className="block">
            <h3 className="mt-2 text-xl leading-7 font-semibold text-gray-900">
              {post.title}
            </h3>
            <p className="mt-3 text-base leading-6 text-gray-500">
              <TextTruncate element="span" line={4} text={post.excerpt} />
            </p>
          </a>
        </div>
        <div className="mt-6 flex items-center">
          <div className="relative flex-shrink-0">
            <AuthorAvatars authors={post.authors} />
          </div>
          <div className="ml-3">
            <p className="text-sm leading-5 font-medium text-gray-900">
              <span className="hover:underline">
                {post.authors.map((author, index) => author.link ? <a key={index} alt={author.name} href={author.link}>{author.name}</a> : author.name).reduce((prev, curr) => [ prev, ' & ', curr ])}
              </span>
            </p>
            <div className="flex text-sm leading-5 text-gray-500">
              <time dateTime={post.date}>
                {moment(post.date).format('MMMM D, YYYY')}
              </time>
              <span className="mx-1">
                &middot;
              </span>
              <span>
                {post.readingTime} min read
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}