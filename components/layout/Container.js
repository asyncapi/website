export default function Container ({ children, fluid = false }) {
  const commonClassNames = 'px-4 sm:px-6 lg:px-8'
  const normalClassNames = `max-w-4xl mx-auto ${commonClassNames}`
  const fluidClassNames = `${commonClassNames}`
  return (
    <div className={fluid ? fluidClassNames : normalClassNames}>
      {children}
    </div>
  )
}