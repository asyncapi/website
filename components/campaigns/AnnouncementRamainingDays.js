import moment from "moment"

export default function AnnouncementRemainingDays({ dateTime }) {
  const date = new Date(dateTime)
  const now = new Date()
  const remaining = moment.duration(date - now)
  const days = remaining.days()
  const hours = remaining.hours()
  const minutes = remaining.minutes()

  let text
  if (days >= 1) {
    text = `${days} ${days === 1 ? 'day' : 'days'}...`
  } else if (hours > 1) {
    text = 'A few hours...'
  } else if (minutes > 1) {
    text = 'A few minutes...'
  }

  return (
    <span className="font-extrabold countdown-text-gradient">
      {text}
    </span>
  )
}