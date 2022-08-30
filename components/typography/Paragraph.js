
export default function Paragraph({
    typeStyle = "body-lg",
    textColor = "text-gray-700",
    fontWeight = 'font-regular',
    className,
    children
}) {

    let classNames = ''
    switch (typeStyle) {
        case 'body-lg':
            classNames = `text-lg ${fontWeight} ${className || ''}`
            break;
        case 'body-md':
            classNames = `text-md ${fontWeight} ${className || ''}`
            break;
        case 'body-sm':
            classNames = `text-sm ${fontWeight} ${className || ''}`
            break;
        default:
            classNames = `text-lg ${fontWeight} ${className || ''}`
    }

    return (
        <p className={`${textColor} ${classNames}`}>{children}</p>
    )
}