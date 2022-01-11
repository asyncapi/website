import Label from './Label'

export default function MenuBlocks ({
  items = [],
}) {
  return (
    <>
      {
        items.map((item, index) => {
          const isExternalHref = item.href && item.href.startsWith('http');
          return (
            <a 
              href={item.comingSoon ? null : item.href} 
              key={index} 
              className="-m-3 p-3 flex items-start space-x-4 rounded-lg hover:bg-gray-50 transition ease-in-out duration-150" 
              target={isExternalHref ? "_blank" : undefined} 
              rel={isExternalHref ? "noopener noreferrer nofollow" : undefined}
            >
              <div className={`flex-shrink-0 flex items-center justify-center h-10 w-10 rounded-md bg-primary-500 text-white sm:h-12 sm:w-12 ${item.comingSoon && 'opacity-50'}`}>
                <item.icon className="h-6 w-6" />
              </div>
              <div className="space-y-1">
                <p className="text-base leading-6 font-medium text-gray-900">
                  <span className={item.comingSoon && 'opacity-50'}>{ item.title }</span> { item.comingSoon && <Label text="Coming soon" /> } { item.beta && <Label text="Beta" /> }
                </p>
                <p className={`text-sm leading-5 text-gray-500 ${item.comingSoon && 'opacity-50'}`}>
                  { item.description }
                </p>
              </div>
            </a>
          )
        })
      }
    </>
  )
}
