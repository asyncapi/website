import { useState } from 'react'
import Scrollspy from 'react-scrollspy'
import ArrowRight from './icons/ArrowRight'

export default function TOC({ className, toc }) {
  const minLevel = toc.reduce((item, mLevel) => item.lvl < mLevel ? item.lvl : mLevel, 0).lvl
  const tocItems = toc.filter(item => item.lvl <= minLevel + 1)

  const [open, setOpen] = useState(false)

  return (
    <div className={className} onClick={() => setOpen(!open)}>
      <div className="flex cursor-pointer md:cursor-auto">
        <h5 className={`${open && 'mb-4'} flex-1 text-primary-500 font-medium uppercase tracking-wide text-sm font-sans antialiased md:mb-4 md:text-xs md:text-gray-500 md:font-thin`}>On this page</h5>
        <div className="text-underline text-center p4 md:hidden">
          <ArrowRight className={`${ open ? '-rotate-90' : 'rotate-90' } transform transition duration-200 ease-in-out h-6 -mt-0.5 text-primary-500`} />
        </div>
      </div>
      <div className={`${!open && 'hidden'} md:block`}>
        <Scrollspy
          items={tocItems.map(item => item.slug)}
          currentClassName="text-primary-600 font-bold"
          componentTag="div"
          rootEl=".js-main-content"
        >
          {
            tocItems.map((item, index) => (
              <a
                className={`pl-${(item.lvl - minLevel) * 2} block mb-1 transition duration-100 ease-in-out text-gray-500 font-normal text-sm font-sans antialiased hover:text-gray-700 hover:font-medium`}
                href={`#${item.slug}`}
                key={index}
              >
                {item.content}
              </a>
            ))
          }
        </Scrollspy>
      </div>
    </div>
  )
}