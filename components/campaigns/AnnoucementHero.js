import { useRouter } from 'next/router'
import AnnouncementRemainingDays from './AnnouncementRamainingDays'
import YoutubeButton from '../buttons/YoutubeButton'
import Button from '../buttons/Button'

export default function AnnouncementHero({ className = '', small = false }) {
  const { pathname } = useRouter()
  const announcementDateTime = '2020-12-08T15:00:00Z'
  const announcementDeadlineDateTime = '2020-12-15T16:00:00Z'

  if (pathname === '/blog/asyncapi-partners-with-postman') return null
  if (new Date(announcementDeadlineDateTime) < new Date()) return null

  if (new Date(announcementDateTime) < new Date()) {
    return (
      <div className={`mb-12 px-4 md:flex md:justify-center ${className}`}>
        <img className="w-full md:w-auto md:h-64" src="/img/posts/asyncapi-partners-with-postman.png" />
        <div className="md:inline-flex md:flex-col md:justify-center md:ml-4">
          <div className="my-2 text-xl text-gray-500">
            <p className="font-bold text-gray-700">AsyncAPI partners with Postman</p>
            <p>To take AsyncAPI to a whole new level.</p>
          </div>
          <div className="mt-8">
            <Button href="/blog/asyncapi-partners-with-postman" text="Read the announcement" />
          </div>
          <div>
            <YoutubeButton href="https://youtu.be/Q5ZdPUzYbmc" text="Watch it on Youtube" className="mt-4 inline-block" />
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className={`mb-12 px-4 ${small ? 'sm:py-8' : 'sm:py-28'} sm:bg-gray-50 sm:border sm:border-gray-200 ${className}`}>
      <h1 className={`text-5xl ${small ? 'sm:text-5xl' : 'sm:text-6xl'}`}>
        <AnnouncementRemainingDays dateTime={announcementDateTime} />
      </h1>
      <div className={`mb-2 ${small ? 'text-md' : 'text-xl'} text-gray-500`}>
        <p>To change things forever. To take AsyncAPI to a whole new level.</p>
        <p className="font-bold">Are you ready for the big announcement?</p>
      </div>
      <YoutubeButton href="https://youtu.be/Q5ZdPUzYbmc" text="Watch it live on Youtube" className="mt-4 inline-block" />
    </div>
  )
}
