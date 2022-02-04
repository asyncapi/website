import { useContext } from 'react'
import DocsContext from '../../context/DocsContext'
import IconArrowRight from '../icons/ArrowRight'
import Link from 'next/link';

export default function TutorialList({ className = '' }) {
  const { post, navItems } = useContext(DocsContext)

  const tutorials = navItems.filter(item => item.sectionSlug === post.slug && !item.isIndex)

  return (
    <div className={`${className} grid grid-cols-1 gap-4 sm:grid-cols-2`}>
      {
        tutorials.map((tuto, index) => (
          <Link href={tuto.slug} key={index}>
          <a
            className="flex flex-col mt-4 p-6 max-w-lg rounded shadow-md border border-gray-200 text-gray-700 transition-all duration-300 ease-in-out hover:shadow-lg hover:border-gray-300"
          >
            <h5 className="text-lg font-medium font-sans antialiased mb-2">{tuto.title}</h5>
            <p className="flex-1 mb-2 font-normal font-sans antialiased">{tuto.description}</p>
            <p className="text-primary-600 font-medium font-sans antialiased">
              Start tutorial
              <IconArrowRight className="inline-block h-4" />
            </p>
          </a>
          </Link>
        ))
      }
    </div>
  )
}