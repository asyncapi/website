
export default function Paragraph({
    typeStyle = "body-lg",
    textColor = "text-gray-700",
    className,
    children
}) {

    let classNames = ''
    switch (typeStyle) {
        case 'body-lg':
            classNames = `body-lg font-regular ${className || ''}`
            break;
        case 'body-md':
            classNames = `body-md font-regular ${className || ''}`
            break;
        case 'body-sm':
            classNames = `body-sm font-regular ${className || ''}`
            break;
        default:
            classNames = `body-lg font-regular ${className || ''}`
    }

    return (
        <p className={`${textColor} ${classNames}`}>{children}</p>
    )

}