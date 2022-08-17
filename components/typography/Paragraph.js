
export default function Paragraph({
    typeStyle = "body-lg",
    textColor = "text-gray-700",
    className,
    children
}) {

    let classNames = ''
    switch (typeStyle) {
        case 'body-lg':
            classNames = `text-lg font-regular ${className || ''}`
            break;
        case 'body-md':
            classNames = `text-md font-regular ${className || ''}`
            break;
        case 'body-sm':
            classNames = `text-sm font-regular ${className || ''}`
            break;
        default:
            classNames = `text-lg font-regular ${className || ''}`
    }

    return (
        <p className={`${textColor} ${classNames}`}>{children}</p>
    )

}