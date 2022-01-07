
export default function Heading({
    typeStyle,
    level = 'h2',
    textColor = 'text-primary-800',
    className,
    children
}) {
    let classNames
    const Tag = `${level}`;

    if (typeStyle === 'heading-xl') {
        classNames = `text-2xl font-bold tracking-heading md:text-6xl leading-snug ${className || ''}`
    } else if (typeStyle === 'heading-lg') {
        classNames = `text-2xl font-bold tracking-heading md:text-4xl leading-snug ${className || ''}`
    } else if (typeStyle === 'heading-md-bold') {
        classNames = `text-2xl font-bold tracking-heading leading-snug ${className || ''}`
    } else if (typeStyle === 'heading-md-semibold') {
        classNames = `text-2xl font-semibold tracking-heading leading-snug ${className || ''}`
    } else if (typeStyle === 'heading-sm-bold') {
        classNames = `text-base font-bold tracking-heading leading-snug ${className || ''}`
    } else if (typeStyle === 'heading-sm-semibold') {
        classNames = `text-base font-semibold tracking-heading leading-snug ${className || ''}`
    }

    return (
        <Tag className={`${textColor} ${classNames}`}>
            {children}
        </Tag>
    )

}