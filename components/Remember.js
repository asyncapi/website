import LightBulb from './icons/LightBulb'

export default function Remember({ title = 'Remember', className, children }) {
  return (
    <div className={`${className} p-4 mt-4 mb-8 bg-secondary-100 rounded text-gray-900`} data-testid="Remember-main">
      <h5 className="pb-2 mb-4 border-b border-gray-900 text-lg" data-testid="Remember-heading">
        <LightBulb className="mr-2 -mt-0.5 h-8 inline-block" />
        <span className="inline-block ml-2 font-medium font-sans antialiased" data-testid="Remember-title">{title}</span>
      </h5>
    <div>
      { children }
    </div>
    </div >
  )
}