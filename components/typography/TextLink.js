
export default function TextLink({
    href,
    className,
    target,
    children
}) {

    const classNames = `text-secondary-500 underline hover:text-gray-800 font-medium transition ease-in-out duration-300 ${className || ''}`

    return(
        <>
        {' '}
        <a href={href} target={target} rel="noreferrer noopener" className={classNames}>
            {children}
        </a>
        </>
    )

}