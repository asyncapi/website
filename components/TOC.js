import { useState } from 'react'
import Scrollspy from 'react-scrollspy'
import ArrowRight from './icons/ArrowRight'
import IconHamburgerMenu from './icons/HamburgerMenu'
import IconClose from './icons/CloseButton'

export default function TOC({
  className,
  cssBreakingPoint = 'xl',
  toc,
  contentSelector,
  depth = 2,
}) {
  if (!toc || !toc.length) return null
  const minLevel = toc.reduce((mLevel, item) => (!mLevel || item.lvl < mLevel) ? item.lvl : mLevel, 0)
  const tocItems = toc.filter(item => item.lvl <= minLevel + depth).map(item => ({
    ...item,
    content: item.content.replace(/[\s]?\{\#[\w\d\-_]+\}$/, '').replace(/(<([^>]+)>)/gi, ''),
    //For TOC rendering in specification files in the spec repo we have "a" tags added manually to the spec markdown document
    //MDX takes these "a" tags and uses them to render the "id" for headers like a-namedefinitionsapplicationaapplication
    //slugWithATag contains transformed heading name that is later used for scroll spy identification
    slugWithATag: item.content.replace(/<|>|"|\\|\/|=/gi, '').replace(/\s/gi, '-').toLowerCase()
  }));
  const [open, setOpen] = useState(false);

  return (
    <div className={`${className} ${tocItems.length ? '' : 'hidden'} ${(open)?"border-2 border-black border-solid p-4 pb-8 mt-4 bg-white w-full":"border-0"} ${cssBreakingPoint}:block md:border:0 md:top-24 md:sticky md:bottom-8 z-20`} onClick={() => setOpen(!open)}>
      {/* <div className='flex flex-row'> */}
          
      {/* </div> */}
      <div className={`flex cursor-pointer ${(open)?"block":"hidden"} ${tocItems.length ? '' : 'hidden'} ${cssBreakingPoint}:cursor-auto ${cssBreakingPoint}:block xl:mt-2`}>
        <h5 className={`${open && `mb-2 ${cssBreakingPoint}:mb-4`} flex-1 text-black font-bold capitalize tracking-wide text-md font-sans antialiased ${cssBreakingPoint}:mb-4 ${cssBreakingPoint}:uppercase ${cssBreakingPoint}:text-xs ${cssBreakingPoint}:text-gray-900 ${cssBreakingPoint}:font-bold`}>
          On this page
        </h5>
      </div>

      <div className={`${!open && 'hidden'} ${cssBreakingPoint}:block`}>
        <Scrollspy
          items={tocItems.map(item => item.slugWithATag)}
          currentClassName="text-primary-500 font-bold"
          componentTag="div"
          rootEl={contentSelector}
        >
          {
            tocItems.map((item, index) => (
              <a
                className={`pl-${(item.lvl - minLevel) * 2} block mb-1 transition duration-100 ease-in-out text-gray-900 font-normal text-sm font-sans antialiased hover:underline`}
                href={`#${item.slug}`}
                key={index}
              >
                {item.content}
              </a>
            ))
          }
        </Scrollspy>
      </div>
      { open && (<IconClose className="w-4 h-4 absolute right-3 bottom-3 z-50 cursor-pointer"/>)}
      <div className={`${cssBreakingPoint}:hidden mt-6 sticky right-3 bottom-3 z-50 bg-white border-2 p-1 rounded-md border-black border-solid cursor-pointer ${(open)?"hidden":""}`}>
        <IconHamburgerMenu className=""/>
      </div>
    </div>
  )
}