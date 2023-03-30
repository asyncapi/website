export default function StickyNavbar({children, className=''}) {
  return <div className={`sticky top-0 w-full bg-white border-b border-gray-300 z-50 ${className}`}>
      {children}
  </div>;
}
