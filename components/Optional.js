export default function Optional({ className = '', children}) {
  return (
    <div className={`inline-block text-white bg-gray-300 rounded font-bold py-0.5 px-1 ${className}`}>
        {children}
    </div>
  )
}
