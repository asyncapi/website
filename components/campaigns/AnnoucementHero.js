import { useRouter } from 'next/router'
import Button from '../buttons/Button'

export default function AnnouncementHero({ className = '', small = false}) {

  const { pathname } = useRouter()

  if (pathname === '/blog/events2021') return null

  return (
    <div className={`bg-gray-50 border border-gray-200 py-6  ${className} ${small ? 'mb-0' : 'mb-12'}`}>
      <h2 className="text-xl md:text-3xl font-bold countdown-text-gradient">AsyncAPI Conference 2022</h2>
      <h3 className="text-xl md:text-3xl font-bold countdown-text-gradient">Do you prefer flying over or watching online?</h3>

      <div className="mt-8 pb-2 space-x-2">
        <Button href="https://conference.asyncapi.com/" target="_blank" text="Share your opinion!" />
      </div>
    </div>
  )
}
