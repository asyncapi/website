export default function Button({
  text,
  href,
  target = '_self',
  icon,
  iconPosition = 'right',
}) {
  return (
    <a href={href} target={target} className="inline-block bg-primary-500 hover:bg-primary-600 shadow-md hover:shadow-lg transition-all duration-500 ease-in-out rounded px-4 py-3 text-white">
      {
        icon && iconPosition === 'left' && (
          <span className="mr-2">{icon}</span>
        )
      }
      <span className="inline-block">{text}</span>
      {
        icon && iconPosition === 'right' && (
          <span className="inline-block ml-2">{icon}</span>
        )
      }
    </a>
  )
}

