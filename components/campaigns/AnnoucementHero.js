import AnnouncementRemainingDays from './AnnouncementRamainingDays'
import YoutubeButton from '../buttons/YoutubeButton'

export default function AnnouncementHero() {
  const announcementDateTime = '2020-12-08T16:00:00Z'

  if (new Date(announcementDateTime) < new Date()) return null

  return (
    <div className="bg-gray-50 mb-12 py-28 border border-gray-200">
      <h1 className="text-6xl">
        <AnnouncementRemainingDays dateTime={announcementDateTime} />
      </h1>
      <p className="mb-2 text-xl text-gray-500">To change things forever. To take AsyncAPI to a whole new level.</p>
      <p className="text-xl font-bold text-gray-700">Are you ready for the big announcement?</p>
      <YoutubeButton href="https://youtu.be/Q5ZdPUzYbmc" text="Watch it live on Youtube" className="mt-4 inline-block" />
    </div>
  )
}
