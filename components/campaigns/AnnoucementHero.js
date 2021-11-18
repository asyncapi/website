import { useRouter } from 'next/router'
import YouTube from 'react-youtube-embed'
import Button from '../buttons/Button'

export default function AnnouncementHero({ className = '', small = false }) {
  const { pathname } = useRouter()

  if (pathname === '/blog/events2021') return null

  return (
    <div className={`bg-gray-50 border border-gray-200 py-6  ${className} ${small ? 'mb-0' : 'mb-12'}`}>
      <h2 className="text-xl md:text-3xl font-bold countdown-text-gradient">AsyncAPI Conference Day 2 is running!</h2>
      <div className='px-4 mt-4 mx-auto max-w-7xl'>
        <YouTube
          id="3EeMHhbwyOQ"
        />
      </div>
      <div className="mt-8 pb-2 space-x-2">
        <Button href="https://www.asyncapi.com/slack-invite" target="_blank" text="Comment and ask questions" />
        <Button bgClassName="bg-none border border-gray-200 text-gray-800 hover:text-gray-700 shadow-none" href="https://conference.asyncapi.com/#schedule" target="_blank" text="Check schedule" />
      </div>
    </div>
  )
}
