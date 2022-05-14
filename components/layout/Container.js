export default function Container ({
  children,
  fluid = false,
  flex = false,
  wide = false,
  flexReverse = false,
  cssBreakingPoint = 'md',
  className = '',
  tag,
}) {
  const commonClassNames = `${flex ? `${cssBreakingPoint}:flex` : 'block'} ${flexReverse ? `${cssBreakingPoint}:flex-row-reverse` : ''} ${className} px-4 sm:px-6 lg:px-8`
  const wideClassNames = `max-w-screen-xl ${commonClassNames}`
  const regularClassNames = `max-w-4xl ${commonClassNames}`
  const normalClassNames = `${wide ? wideClassNames : regularClassNames} mx-auto w-full`
  const fluidClassNames = `${commonClassNames}`

  const Tag = tag || 'div';
  
  return (
    <Tag className={fluid ? fluidClassNames : normalClassNames}>
      {children}
    </Tag>
  )
}