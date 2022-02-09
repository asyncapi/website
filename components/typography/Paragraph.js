
export default function Paragraph({
    typeStyle = "body-lg",
    textColor = "text-gray-700",
    className,
    children
}) {

    let classNames = ''

    if (typeStyle == 'body-lg') {
        classNames = `text-lg leading-relaxed font-regular ${className || ''}`
    } else if (typeStyle == 'body-md') {
        classNames = `text-base leading-relaxed font-regular ${className || ''}`
    } else if (typeStyle == 'body-sm') {
        classNames = `text-sm leading-relaxed font-regular ${className || ''}`
    }

    return (
        <p className={`${textColor} ${classNames}`}>{children}</p>
    )

}