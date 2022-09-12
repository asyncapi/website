import ClickableLogo from '../ClickableLogo'
import DocsNav from './DocsNav'
import { SearchButton, DOCS_INDEX_NAME } from '../AlgoliaSearch';
import IconLoupe from '../icons/Loupe';

export default function DocsMobileMenu({
  post,
  navigation,
  onClickClose = () => { },
}) {
  return (
    <div className="z-60 lg:hidden">
      <div className="fixed inset-0 flex z-40">
        <div className="fixed inset-0">
          <div className="absolute inset-0 bg-gray-600 opacity-75" onClick={onClickClose}></div>
        </div>

        <div className="relative flex-1 flex flex-col max-w-xs w-full bg-white">
          <div className="absolute top-0 right-0 -mr-14 p-1">
            <button onClick={onClickClose} className="flex items-center justify-center h-12 w-12 rounded-full focus:outline-none focus:bg-gray-600" aria-label="Close sidebar">
              <svg className="h-6 w-6 text-white" stroke="currentColor" fill="none" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
          <div className="flex-1 h-0 pt-5 overflow-y-auto">
            <div className='pl-2.5'>
              <ClickableLogo logoClassName="h-8 w-auto ml-3" />
            </div>

            <div className='w-full my-4 px-2'>
              <SearchButton 
                className="flex w-full items-center text-left text-sm space-x-3 px-3 py-1.5 bg-white hover:bg-secondary-100 border-gray-300 hover:border-secondary-500 border text-gray-700 hover:text-secondary-500 shadow-sm transition-all duration-500 ease-in-out rounded-md"
                indexName={DOCS_INDEX_NAME}
              >
                <IconLoupe />
                <span className="flex-auto">Search docs...</span>
              </SearchButton>
            </div>

            <nav className="mt-5 px-2 mb-4">
              <ul>
                {Object.values(navigation).map(navItem => (
                  <DocsNav item={navItem} active={post.slug} onClick={onClickClose} />
                ))}
              </ul>
            </nav>
          </div>
        </div>
        <div className="flex-shrink-0 w-14">
          {/* Force sidebar to shrink to fit close icon */}
        </div>
      </div>
    </div>
  )
}
