export default function StickyNavbar({children, className=''}) {
  return <div className={`sticky top-0 w-full dark:bg-slate-800 bg-white border-b dark:border-slate-700 border-gray-300 z-50 ${className}`} data-testid="Sticky-div">
      {children}
  </div>;
}
