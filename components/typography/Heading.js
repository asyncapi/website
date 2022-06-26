import {twMerge} from 'tailwind-merge'
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
            classNames = `font-heading text-2xl font-bold tracking-heading md:text-6xl leading-snug ${className || ''}`
            break;
        case 'heading-lg':
            classNames = `font-heading text-2xl font-bold tracking-heading md:text-4xl leading-snug ${className || ''}`
            break;
        case 'heading-md':
            classNames = `font-heading text-2xl font-bold tracking-heading leading-snug ${className || ''}`
            break;
        case 'heading-md-semibold':
            classNames = `font-heading text-2xl font-semibold tracking-heading leading-snug ${className || ''}`
            break;
        case 'heading-sm':
            classNames = `font-heading text-xl font-bold tracking-heading leading-snug ${className || ''}`
            break;
        case 'heading-sm-semibold':
            classNames = `font-heading text-xl font-semibold tracking-heading leading-snug ${className || ''}`
            break;
        case 'heading-xs':
            classNames = `font-heading text-base font-bold tracking-heading leading-snug ${className || ''}`
            break;
        case 'heading-xs-semibold':
            classNames = `font-heading text-base font-semibold tracking-heading leading-snug ${className || ''}`
            break;
        case 'body-lg':
            classNames = `font-heading text-lg leading-relaxed tracking-body font-regular ${className || ''}`
            break;
        case 'body-md':
            classNames = `font-heading text-base leading-relaxed tracking-body font-regular ${className || ''}`
            break;
        case 'body-sm':
            classNames = `font-heading text-sm leading-relaxed tracking-body font-regular ${className || ''}`
            break;
        default:
            classNames = `font-heading text-2xl font-bold tracking-heading md:text-6xl leading-snug ${className || ''}`
    }

    return (
        <Tag className={twMerge(`${textColor} ${classNames}`)}>
            {children}
        </Tag>
    )

}