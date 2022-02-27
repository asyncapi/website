export default function Required({ className = '', children}) {
  return (
    <div className={`inline-block text-black bg-yellow-300 rounded font-bold py-0.5 px-1 ${className}`}>
        {children}
    </div>
  )
}
