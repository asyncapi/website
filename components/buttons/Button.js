export default function Button({
  text,
  href,
  type = 'button',
  target = '_self',
  icon,
  iconPosition = 'right',
  className,
  bgColor = 'primary-500',
  bgHoverColor = 'primary-400',
  textColor = 'white',
  textHoverColor = 'white',
}) {
  const classNames = `inline-block bg-${bgColor} hover:bg-${bgHoverColor} text-${textColor} hover:text-${textHoverColor} shadow-md hover:shadow-lg transition-all duration-500 ease-in-out rounded px-4 py-3 text-white ${className || ''}`
  
  if (!href) {
    return (
      <button type={type} className={classNames}>
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
    <a href={href} target={target} className={classNames}>
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

