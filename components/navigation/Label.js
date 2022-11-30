export default function Label ({ text, color = 'gray' }) {
  let colorClasses

  switch (color) {
    case 'gray':
      colorClasses = 'bg-gray-300 text-gray-700'
      break
    case 'green':
      colorClasses = 'bg-green-300 text-green-700'
      break
  }

  return (
    <span className={`inline-block text-xs uppercase py-0 px-1 ml-2 rounded transform -translate-y-0.5 ${colorClasses}`}>
      {text}
    </span>
  )
}
