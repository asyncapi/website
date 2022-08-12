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
    <div className="z-60 max-h-(screen-12) overflow-y-scroll lg:hidden">
      <div className="relative inset-0 flex z-40">
        <div className=" flex-1 flex flex-col max-w-xs w-full bg-white">
            <div className='w-full my-4 px-2'>
              <SearchButton 
                className="flex w-full items-center text-left text-sm space-x-3 px-3 py-1.5 bg-white hover:bg-secondary-100 border-gray-300 hover:border-secondary-500 border text-gray-700 hover:text-secondary-500 shadow-sm transition-all duration-500 ease-in-out rounded-md"
                indexName={DOCS_INDEX_NAME}
              >
                <IconLoupe />
                <span className="flex-auto">Search docs...</span>
              </SearchButton>
            </div>
          <div className="flex-1 h-0 overflow-y-auto">
            <nav className="mt-5 px-2 mb-4">
              <ul>
                {Object.values(navigation).map(navItem => (
                  <DocsNav item={navItem} active={post.slug} onClick={onClickClose} />
                ))}
              </ul>
            </nav>
          </div>
        </div>
      </div>
    </div>
  )
}
