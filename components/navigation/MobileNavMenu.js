import AsyncAPILogo from '../AsyncAPILogo'
import MenuBlocks from './MenuBlocks'
import learningItems from './learningItems'
import toolingItems from './toolingItems'
import communityItems from './communityItems'
import otherItems from './otherItems'
import Link from "next/link"

export default function MobileNavMenu ({
  onClickClose = () => {},
}) {
  return (
    <div className="absolute top-0 inset-x-0 py-2 transition transform origin-top-right max-h-screen lg:hidden overflow-y-scroll">
      <div className="rounded-lg shadow-lg">
        <div className="rounded-lg shadow-xs bg-white divide-y-2 divide-gray-50">
          <div className="pt-5 pb-6 px-5 space-y-6">
            <div className="flex items-center justify-between">
              <Link href="/" className="flex">
                <a className="cursor-pointer">
                <AsyncAPILogo className="h-8 w-auto" />
                </a>
              </Link>
              <div className="-mr-2">
                <button onClick={onClickClose} type="button" className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:bg-gray-100 focus:text-gray-500 transition duration-150 ease-in-out">
                  <svg className="h-6 w-6" stroke="currentColor" fill="none" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
            </div>
            <div className="py-2 space-y-2">
              <Link href="/docs" className="flex">
                <h4 className="text-gray-500 font-medium block mb-4">
                  <a className="cursor-pointer">
                    Docs
                  </a>
                </h4>
              </Link>
              <MenuBlocks items={learningItems} />
            </div>
          </div>
          <div className="py-2 px-5 space-y-2">
            <h4 className="text-gray-500 font-medium block mb-4">Tools</h4>
            <MenuBlocks items={toolingItems} />
          </div>
          <div className="py-2 px-5 space-y-2">
              <h4 className="text-gray-500 font-medium block mb-4">Community</h4>
              <MenuBlocks items={communityItems} />
            <div className="grid gap-4">
              <div>
                <h4 className="text-gray-500 font-medium block mb-4">Others</h4>
                {
                  otherItems.map((item, index) => (
                    <Link href={item.href} key={index}>
                    <a target={item.target || '_self'} rel="noopener noreferrer" key={index} className="text-base leading-6 font-medium text-gray-900 hover:text-gray-700 transition ease-in-out duration-150 block mb-4">
                      { item.text }
                    </a>
                    </Link>
                  ))
                }
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
