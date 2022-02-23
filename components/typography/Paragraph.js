
export default function Paragraph({
    typeStyle = "body-lg",
    textColor = "text-gray-700",
    className,
    children
}) {

    let classNames = ''
    switch (typeStyle) {
        case 'body-lg': {
            classNames = `text-lg leading-relaxed font-regular ${className || ''}`
        }
        case 'body-md': {
            classNames = `text-base leading-relaxed font-regular ${className || ''}`
        }
        case 'body-sm': {
            classNames = `text-sm leading-relaxed font-regular ${className || ''}`
        }
    }

    return (
        <p className={`${textColor} ${classNames}`}>{children}</p>
    )

}