import AsyncAPILogo from '../AsyncAPILogo';
import MenuBlocks from './MenuBlocks';
import { SearchButton } from '../AlgoliaSearch';
import learningItems from './learningItems';
import toolingItems from './toolingItems';
import communityItems from './communityItems';
import otherItems from './otherItems';
import Link from 'next/link';

export default function MobileNavMenu({ onClickClose = () => {} }) {
  return (
    <div className="fixed top-0 inset-x-0 py-2 transition transform origin-top-right max-h-full lg:hidden overflow-y-scroll">
      <div className="rounded-lg shadow-lg">
        <div className="rounded-lg shadow-xs bg-white divide-y-2 divide-gray-50">
          <div className="pt-5 pb-6 px-5 space-y-6">
            <div className="flex items-center justify-between">
              <Link href="/" className="flex">
                <a className="cursor-pointer">
                  <AsyncAPILogo className="h-8 w-auto" />
                </a>
              </Link>
              <div className="flex flex-row items-center justify-content -mr-2">
                <SearchButton className="flex items-center text-left space-x-2 p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:bg-gray-100 focus:text-gray-500 transition duration-150 ease-in-out">
                  <svg
                    width="24"
                    height="24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="flex-none text-slate-300 dark:text-slate-400"
                    aria-hidden="true"
                  >
                    <path d="m19 19-3.5-3.5" />
                    <circle cx="11" cy="11" r="6" />
                  </svg>
                </SearchButton>
                <button
                  onClick={onClickClose}
                  type="button"
                  className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:bg-gray-100 focus:text-gray-500 transition duration-150 ease-in-out"
                >
                  <svg
                    className="h-6 w-6"
                    stroke="currentColor"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
              </div>
            </div>
            <div className="py-2 space-y-2">
              <Link href="/docs" className="flex">
                <h4 className="text-gray-500 font-medium block mb-4">
                  <a className="cursor-pointer">Docs</a>
                </h4>
              </Link>
              <MenuBlocks items={learningItems} />
            </div>
          </div>
          <div className="py-2 px-5 space-y-2">
            <Link href="/tools" 
            className="flex">
              <h4 className="text-gray-500 font-medium block mb-4"> <a className="cursor-pointer">Tools</a></h4>
            </Link>
              <MenuBlocks items={toolingItems} />
          </div>
          <div className="py-2 px-5 space-y-2">
            <h4 className="text-gray-500 font-medium block mb-4">Community</h4>
            <MenuBlocks items={communityItems} />
            <div className="grid gap-4">
              <div>
                <h4 className="text-gray-500 font-medium block mb-4">Others</h4>
                {otherItems.map((item, index) => (
                  <Link href={item.href} key={index}>
                    <a
                      target={item.target || '_self'}
                      rel="noopener noreferrer"
                      key={index}
                      className="text-base leading-6 font-medium text-gray-900 hover:text-gray-700 transition ease-in-out duration-150 block mb-4"
                    >
                      {item.text}
                    </a>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
