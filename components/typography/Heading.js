
export default function Heading({
    text,
    style,
    weight = 'font-bold',
    level = '2',
    textColor = 'text-primary-800',
    className
}) {
    let classNames
    const Tag = `${level}`;

    if (style === 'h1') {
        classNames = `text-2xl tracking-heading md:text-6xl leading-snug ${weight || ''} ${className || ''}`
    } else if (style === 'h2') {
        classNames = `text-2xl tracking-heading md:text-4xl leading-snug ${weight || ''} ${className || ''}`
    } else if (style === 'h3') {
        classNames = `text-2xl tracking-heading md:text-2xl leading-snug ${weight || ''} ${className || ''}`
    }

    return (
        <Tag className={`${textColor} ${classNames}`}>
            {text}
        </Tag>
    )

}