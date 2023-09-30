export default function Caption ({children}) {
  return (
    <p className="text-center text-xs text-gray-500 mt-2" data-testid="Caption-paragraph">
      {children}
    </p>
  )
}
