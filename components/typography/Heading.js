export default function Heading({
    typeStyle = "heading-lg",
    level = 'h2',
    textColor = 'text-primary-800',
    className,
    children
}) {
    let classNames = ''
    const Tag = `${level}`;
    switch (typeStyle) {
        case 'heading-xl': 
            classNames = `font-heading text-heading-md font-bold tracking-heading md:text-heading-xl ${className || ''}`
            break;
        case 'heading-lg':
            classNames = `font-heading text-heading-md font-bold tracking-heading md:text-heading-lg ${className || ''}`
            break;
        case 'heading-md':
            classNames = `font-heading text-heading-md font-bold tracking-heading ${className || ''}`
            break;
        case 'heading-md-semibold':
            classNames = `font-heading text-heading-md font-semibold tracking-heading ${className || ''}`
            break;
        case 'heading-sm':
            classNames = `font-heading text-heading-sm font-bold tracking-heading ${className || ''}`
            break;
        case 'heading-sm-semibold':
            classNames = `font-heading text-heading-sm font-semibold tracking-heading ${className || ''}`
            break;
        case 'heading-xs':
            classNames = `font-heading text-heading-xs font-bold tracking-heading ${className || ''}`
            break;
        case 'heading-xs-semibold':
            classNames = `font-heading text-heading-xs font-semibold tracking-heading ${className || ''}`
            break;
        case 'body-lg':
            classNames = `font-heading text-body-lg tracking-body font-regular ${className || ''}`
            break;
        case 'body-md':
            classNames = `font-heading text-body-md tracking-body font-regular ${className || ''}`
            break;
        case 'body-sm':
            classNames = `font-heading text-body-lg tracking-body font-regular ${className || ''}`
            break;
        default:
            classNames = `font-heading text-heading-md font-bold tracking-heading md:text-heading-xl ${className || ''}`
    }

    return (
        <Tag className={`${textColor} ${classNames}`}>
            {children}
        </Tag>
    )

}