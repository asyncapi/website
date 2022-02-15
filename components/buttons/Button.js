export default function Button({
  text,
  href,
  type = 'button',
  target = '_self',
  icon,
  iconPosition = 'right',
  className,
  bgClassName = 'bg-primary-500 hover:bg-primary-400',
  textClassName = 'text-white hover:text-white',
  ...props
}) {
  const classNames = `${bgClassName} ${textClassName} shadow-md hover:shadow-lg transition-all duration-500 ease-in-out rounded px-4 py-3 text-white ${className || ''}`
  
  if (!href) {
    return (
      <button {...props} type={type} className={classNames}>
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
    <a {...props} href={href} target={target} rel="noopener noreferrer" className={classNames}>
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

