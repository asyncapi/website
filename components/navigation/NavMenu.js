import Paragraph from "../typography/Paragraph"
import Link from 'next/link';

export default function NavMenu({ items = [] }) {
  if (!items.length) return
  
  return (
    <div className="absolute z-50 left-1/2 transform -translate-x-1/2 mt-3 px-2 w-screen max-w-xs sm:px-0">
      <div className="rounded-lg shadow-lg">
        <div className="rounded-lg shadow-xs overflow-hidden">
          <div className="z-20 relative grid gap-6 bg-white px-5 py-6 sm:gap-8 sm:p-8">
            {
              items.map((item, index) => (
                <Link href={item.href} key={index}>
                <a target={item.target || '_self'} rel="noopener noreferrer" className="-m-3 p-3 block space-y-1 rounded-md hover:bg-gray-50 transition ease-in-out duration-150" data-testid="NavMenu-Link">
                  <Paragraph typeStyle="body-sm" textColor="text-gray-900" className="font-semibold">
                    {item.text}
                  </Paragraph>
                  <Paragraph typeStyle="body-sm">
                    {item.description}
                  </Paragraph>
                </a>
                </Link>
              ))
            }
          </div>
        </div>
      </div>
    </div>
  )
}