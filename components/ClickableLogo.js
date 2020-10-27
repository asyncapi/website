import Link from 'next/link'
import AsyncAPILogo from './AsyncAPILogo'

export default function ClickableLogo({
  href = '/',
  className = 'flex',
  logoClassName,
}) {
  return (
    <Link href={href}>
      <a className={className}>
        <AsyncAPILogo className={logoClassName} />
      </a>
    </Link>
  )
}