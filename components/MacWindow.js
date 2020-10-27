import { forwardRef } from 'react'

export default function MacWindow({
  className = '',
  contentClassName = '',
  title,
  children,
}) {
  return (
    <div className={`${className} rounded`}>
      <div className="flex text-left px-4 py-2">
        <div>
          <span className="inline-block rounded-full w-2.5 h-2.5 bg-mac-window-close mr-2"></span>
          <span className="inline-block rounded-full w-2.5 h-2.5 bg-mac-window-minimize mr-2"></span>
          <span className="inline-block rounded-full w-2.5 h-2.5 bg-mac-window-maximize mr-2"></span>
        </div>
        <div className="flex-1 text-gray-400 text-sm px-2 truncate text-left sm:text-center" title={title}>
          {title}
        </div>
        <div className="hidden sm:block"> {/* This block is used for aligning the title on the center */}
          <span className="inline-block w-2.5 h-2.5 mr-2"></span>
          <span className="inline-block w-2.5 h-2.5 mr-2"></span>
          <span className="inline-block w-2.5 h-2.5 mr-2"></span>
        </div>
      </div>
      <div className={`${contentClassName} px-4 pb-4`}>
        {children}
      </div>
    </div>
  )
}