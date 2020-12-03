import AnnouncementRemainingDays from './AnnouncementRamainingDays'
import YoutubeButton from '../buttons/YoutubeButton'

export default function AnnouncementHero({ className = '', small = false }) {
  const announcementDateTime = '2020-12-08T16:00:00Z'

  if (new Date(announcementDateTime) < new Date()) return null

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