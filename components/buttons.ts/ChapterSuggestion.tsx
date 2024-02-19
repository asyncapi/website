import { HTMLAttributeAnchorTarget } from 'react'
import IconArrowRight from '../icons/ArrowRight'
import Link from 'next/link'
import { Url } from 'url'

export interface IChapterSuggestionProps {
  href: Url
  target?: HTMLAttributeAnchorTarget
  title: string
  description: string
  linkText: string
  className?: string
}

/**
 * 
 * @param {Object} props - The props of the component
 * @param {string} props.href - The URL of the chapter
 * @param {string} props.target - The target of the link
 * @param {string} props.title - The title of the chapter
 * @param {string} props.description - The description of the chapter
 * @param {string} props.linkText - The text of the link
 * @param {string} props.className - The class name of the component
 */
export default function ChapterSuggestion({
  href,
  target = '_self',
  title,
  description,
  linkText,
  className,
}: IChapterSuggestionProps) {
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