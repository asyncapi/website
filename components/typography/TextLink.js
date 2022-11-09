import Link from 'next/link'
export default function TextLink({
    href,
    className,
    target,
    children,
    id
}) {

    const classNames = `text-secondary-500 underline hover:text-gray-800 font-medium transition ease-in-out duration-300 ${className || ''}`

    return (
        <>
            {' '}
            <Link href={href}>
                <a id={id} target={target} rel="noreferrer noopener" className={classNames}>
                    {children}
                </a>
            </Link>
        </>
    )

}