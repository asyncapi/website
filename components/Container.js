export default function Container ({ children }) {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl xl:max-w-5xl mx-auto">
        {children}
      </div>
    </div>
  )
}