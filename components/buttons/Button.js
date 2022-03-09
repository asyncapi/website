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
  buttonSize,
  ...props
}) {

  const smallButtonClasses = `${bgClassName} ${textClassName} shadow-md hover:shadow-lg transition-all duration-500 ease-in-out rounded-md px-3 py-2 text-sm font-medium tracking-heading text-white ${className || ''}`
  const classNames = `${bgClassName} ${textClassName} shadow-md hover:shadow-lg transition-all duration-500 ease-in-out rounded-md px-4 py-3 text-md font-semibold tracking-heading text-white ${className || ''}`
  
  if (!href) {
    return (
      <button {...props} type={type} className={buttonSize === 'small' ? smallButtonClasses : classNames}>
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
    <a {...props} href={href} target={target} rel="noopener noreferrer" className={buttonSize === 'small' ? smallButtonClasses : classNames}>
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

