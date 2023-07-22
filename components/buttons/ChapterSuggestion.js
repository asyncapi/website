import IconArrowRight from '../icons/ArrowRight'
import Link from 'next/link'

export default function ChapterSuggestion({
  href,
  target = '_self',
  title,
  description,
  linkText,
  className,
}) {
  return (
    <Link href={href}>
      <a
        target={target}
        rel="noopener noreferrer"
        title={description}
        className={`${className} flex flex-col mt-4 p-6 max-w-lg rounded shadow-md border border-gray-200 text-gray-900 transition-all duration-300 ease-in-out hover:shadow-lg hover:border-gray-300`}
       data-testid="ChapterSuggestion-link"
      >
        <h5 className="text-lg font-medium font-sans antialiased mb-2">{title}</h5>
        <p className="flex-1 mb-2 font-normal text-gray-600 font-sans antialiased">{description}</p>
        <p className="text-primary-500 font-medium font-sans antialiased">
          {linkText}
          <IconArrowRight className="inline-block h-4" />
        </p>
      </a>
    </Link>
  )
}