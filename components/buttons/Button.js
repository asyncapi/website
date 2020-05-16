export default function Button({
  text,
  href,
  type = 'button',
  target = '_self',
  icon,
  iconPosition = 'right',
  className,
}) {
  if (!href) {
    return (
      <button type={type} className={`inline-block bg-primary-500 hover:bg-primary-600 shadow-md hover:shadow-lg transition-all duration-500 ease-in-out rounded px-4 py-3 text-white ${className || ''}`}>
        {
          icon && iconPosition === 'left' && (
            <span className="inline-block mr-2">{icon}</span>
          )
        }
        <span className="inline-block">{text}</span>
        {
          icon && iconPosition === 'right' && (
            <span className="inline-block ml-2">{icon}</span>
          )
        }
      </button>
    )
  }

  return (
    <a href={href} target={target} className={`inline-block bg-primary-500 hover:bg-primary-600 shadow-md hover:shadow-lg transition-all duration-500 ease-in-out rounded px-4 py-3 text-white ${className || ''}`}>
      {
        icon && iconPosition === 'left' && (
          <span className="inline-block mr-2">{icon}</span>
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

