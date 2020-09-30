import Label from './Label'

export default function MenuBlocks ({
  items = [],
}) {
  return (
    <>
      {
        items.map((item, index) => (
          <a href={item.href} key={index} className="-m-3 p-3 flex items-start space-x-4 rounded-lg hover:bg-gray-50 transition ease-in-out duration-150">
            <div className="flex-shrink-0 flex items-center justify-center h-10 w-10 rounded-md bg-primary-500 text-white sm:h-12 sm:w-12 ">
              <item.icon className="h-6 w-6" />
            </div>
            <div className="space-y-1">
              <p className="text-base leading-6 font-medium text-gray-900">
                { item.title } { item.comingSoon && <Label text="Coming soon" /> }
              </p>
              <p className="text-sm leading-5 text-gray-500">
                { item.description }
              </p>
            </div>
          </a>
        ))
      }
    </>
  )
}
