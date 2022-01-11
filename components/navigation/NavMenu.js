export default function NavMenu({ items = [] }) {
  if (!items.length) return
  
  return (
    <div className="absolute z-50 left-1/2 transform -translate-x-1/2 mt-3 px-2 w-screen max-w-xs sm:px-0">
      <div className="rounded-lg shadow-lg">
        <div className="rounded-lg shadow-xs overflow-hidden">
          <div className="z-20 relative grid gap-6 bg-white px-5 py-6 sm:gap-8 sm:p-8">
            {
              items.map((item, index) => (
                <a href={item.href} key={index} target={item.target || '_self'} rel="noopener noreferrer nofollow" className="-m-3 p-3 block space-y-1 rounded-md hover:bg-gray-50 transition ease-in-out duration-150">
                  <p className="text-base leading-6 font-medium text-gray-900">
                    {item.text}
                  </p>
                  <p className="text-sm leading-5 text-gray-500">
                    {item.description}
                  </p>
                </a>
              ))
            }
          </div>
        </div>
      </div>
    </div>
  )
}