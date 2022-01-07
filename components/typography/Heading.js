
export default function Heading({
    typeStyle = "heading-lg",
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
        classNames = `text-xl font-bold tracking-heading leading-snug ${className || ''}`
    } else if (typeStyle === 'heading-sm-semibold') {
        classNames = `text-xl font-semibold tracking-heading leading-snug ${className || ''}`
    } else if (typeStyle === 'heading-xs-bold') {
        classNames = `text-base font-bold tracking-heading leading-snug ${className || ''}`
    } else if (typeStyle === 'heading-xs-semibold') {
        classNames = `text-base font-semibold tracking-heading leading-snug ${className || ''}`
    } else if (typeStyle == 'body-lg') {
        classNames = `text-lg leading-relaxed tracking-body font-regular ${className || ''}`
    } else if (typeStyle == 'body-md') {
        classNames = `text-base leading-relaxed tracking-body font-regular ${className || ''}`
    } else if (typeStyle == 'body-sm') {
        classNames = `text-sm leading-relaxed tracking-body font-regular ${className || ''}`
    }

    return (
        <Tag className={`${textColor} ${classNames}`}>
            {children}
        </Tag>
    )

}