import Paragraph from '../typography/Paragraph';
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
              rel={isExternalHref ? "noopener noreferrer" : undefined}
            >
              <div className={`flex-shrink-0 flex items-center justify-center h-10 w-10 rounded-lg border border-gray-800 bg-secondary-100 text-gray-900 sm:h-12 sm:w-12 ${item.comingSoon && 'opacity-50'}`}>
                <item.icon className="h-8 w-8" />
              </div>
              <div className="space-y-1">
                <Paragraph typeStyle="body-md" textColor="text-gray-900" className="font-semibold">
                  <span className={item.comingSoon && 'opacity-50'}>{ item.title }</span> { item.comingSoon && <Label text="Coming soon" /> } { item.beta && <Label text="Beta" /> }
                </Paragraph>
                <Paragraph typeStyle="body-sm" className={item.comingSoon && 'opacity-50'}>
                  { item.description }
                </Paragraph>
              </div>
            </a>
          )
        })
      }
    </>
  )
}
