import moment from 'moment'
import TextTruncate from 'react-text-truncate'
import AuthorAvatars from '../AuthorAvatars'
import Heading from '../typography/Heading'
import Paragraph from '../typography/Paragraph'
import Link from 'next/link'

export default function FeaturedBlogPost({ post, className = ''}) {
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
    <div className={`rounded-lg ${className}`}>
      <article className='h-full rounded-lg'>
          <Link href={post.slug} passHref>
            <a className={`h-full flex flex-col lg:flex-row border border-gray-200 rounded-lg shadow-md divide-y divide-gray-200 transition-all duration-300 ease-in-out hover:shadow-lg overflow-hidden cursor-pointer`}>
              <img className="w-full lg:w-56 object-cover" src={post.cover} alt="" />  
              <div className="flex-1 bg-white p-6 flex flex-col justify-between text-left">
                <div className="flex-1">
                  <Paragraph typeStyle="body-sm" textColor="text-indigo-500">
                    <span className={`inline-flex items-center px-3 py-0.5 rounded-full ${typeColors[0]} ${typeColors[1]}`}>
                      {post.type}
                    </span>
                  </Paragraph>
                  <Link href={post.slug}>
                    <a className="block">
                      <Heading level="h3" typeStyle="heading-sm-semibold" className="mt-2">
                        {post.title}
                      </Heading>
                      <Paragraph typeStyle="body-sm" className="mt-3">
                        <TextTruncate element="span" line={2} text={post.excerpt} />
                      </Paragraph>
                    </a>
                  </Link>
                </div>
                <div className="mt-6 flex items-center">
                  <div className="relative flex-shrink-0">
                    <AuthorAvatars authors={post.authors} />
                  </div>
                  <div className="ml-3">
                    <Heading level="h3" typeStyle="heading-xs-semibold" textColor="text-gray-900">
                      <span className="hover:underline">
                        {post.authors.map((author, index) => author.link ? <a key={index} alt={author.name} href={author.link} onClick={e => { e.stopPropagation() }} target="_blank" rel="noreferrer">{author.name}</a> : author.name).reduce((prev, curr) => [prev, ' & ', curr])}
                      </span>
                    </Heading>
                    <Paragraph typeStyle="body-sm" className="flex">
                      <time dateTime={post.date}>
                        {moment(post.date).format('MMMM D, YYYY')}
                      </time>
                      <span className="mx-1">
                        &middot;
                      </span>
                      <span>
                        {post.readingTime} min read
                      </span>
                    </Paragraph>
                  </div>
                </div>
              </div>
            </a>
        </Link>
      </article>
    </div>
  )
}
