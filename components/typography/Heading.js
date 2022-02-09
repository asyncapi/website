
export default function Heading({
    typeStyle = "heading-lg",
    level = 'h2',
    textColor = 'text-primary-800',
    className,
    children
}) {
    let classNames = ''
    const Tag = `${level}`;

    if (typeStyle === 'heading-xl') {
        classNames = `font-heading text-2xl font-bold tracking-heading md:text-6xl leading-snug ${className || ''}`
    } else if (typeStyle === 'heading-lg') {
        classNames = `font-heading text-2xl font-bold tracking-heading md:text-4xl leading-snug ${className || ''}`
    } else if (typeStyle === 'heading-md') {
        classNames = `font-heading text-2xl font-bold tracking-heading leading-snug ${className || ''}`
    } else if (typeStyle === 'heading-md-semibold') {
        classNames = `font-heading text-2xl font-semibold tracking-heading leading-snug ${className || ''}`
    } else if (typeStyle === 'heading-sm') {
        classNames = `font-heading text-xl font-bold tracking-heading leading-snug ${className || ''}`
    } else if (typeStyle === 'heading-sm-semibold') {
        classNames = `font-heading text-xl font-semibold tracking-heading leading-snug ${className || ''}`
    } else if (typeStyle === 'heading-xs') {
        classNames = `font-heading text-base font-bold tracking-heading leading-snug ${className || ''}`
    } else if (typeStyle === 'heading-xs-semibold') {
        classNames = `font-heading text-base font-semibold tracking-heading leading-snug ${className || ''}`
    } else if (typeStyle == 'body-lg') {
        classNames = `font-heading text-lg leading-relaxed tracking-body font-regular ${className || ''}`
    } else if (typeStyle == 'body-md') {
        classNames = `font-heading text-base leading-relaxed tracking-body font-regular ${className || ''}`
    } else if (typeStyle == 'body-sm') {
        classNames = `font-heading text-sm leading-relaxed tracking-body font-regular ${className || ''}`
    }

    return (
        <Tag className={`${textColor} ${classNames}`}>
            {children}
        </Tag>
    )

}