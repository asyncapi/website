export default function Deprecated({ className = '', children}) {
  return (
    <div className={`inline-block text-white bg-red-500 rounded font-bold py-0.5 px-1 ${className}`}>
        {children}
    </div>
  )
}
