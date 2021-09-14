import { useRouter } from 'next/router'
import AnnouncementRemainingDays from './AnnouncementRamainingDays'
import Button from '../buttons/Button'

export default function AnnouncementHero({ className = '', small = false }) {
  const { pathname } = useRouter()
  const hackathonStartDateTime = '2021-10-01T06:00:00Z'
  const conferenceStartDateTime = '2021-11-16T06:00:00Z'
  const hackathonDeadlineDateTime = '2021-10-31T16:00:00Z'
  const conferenceDeadlineDateTime = '2021-11-18T16:00:00Z'
  const isHackathonOver = new Date(hackathonDeadlineDateTime) < new Date()
  const isConferenceOver = new Date(conferenceDeadlineDateTime) < new Date()

  if (pathname === '/blog/events2021') return null
  if (isHackathonOver && isConferenceOver) return null

  return (
    <div className={`mb-12 px-4 ${small ? 'sm:py-6' : 'sm:py-12'} ${className}`}>
      <h1 className={`text-4xl sm:text-4xl md:text-5xl`}>
        { !isHackathonOver && <AnnouncementRemainingDays dateTime={hackathonStartDateTime} eventName="Hackathon" /> }
        { !isConferenceOver && <AnnouncementRemainingDays dateTime={conferenceStartDateTime} eventName="Conference" /> }
      </h1>
      <div className="my-2 text-xl text-gray-500">
        <p className="font-bold text-gray-700">Connect and innovate with the AsyncAPI Community.</p>
      </div>
      <div className="mt-8">
        <Button href="https://conference.asyncapi.com/" target="_blank" text="Learn more" />
      </div>
    </div>
  )
}
