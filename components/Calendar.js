import moment from 'moment'

export default function Calendar ({ className = '' }) {
  const referenceDate = moment.utc('2020-06-09T08:00:00')
  
  function toggleMorningAfternoon(morningOrAfternoon) {
    return morningOrAfternoon === 'morning' ? 'afternoon' : 'morning'
  }

  function upcomingEvents() {
    let nextDate = referenceDate
    let morningOrAfternoon = 'morning'

    do {
      morningOrAfternoon = toggleMorningAfternoon(morningOrAfternoon)
      nextDate.add(14, 'days').hours(morningOrAfternoon === 'morning' ? 8 : 16)
    } while(nextDate.isBefore())
    
    return [
      nextDate.hours(morningOrAfternoon === 'morning' ? 8 : 16),
      moment(nextDate).add(14, 'days').hours(morningOrAfternoon === 'morning' ? 16 : 8),
    ]
  }

  return (
    <div className={`rounded-md border border-gray-200 overflow-hidden bg-white p-4 ${className}`}>
      <h3 className="text-left text-lg mb-8">Upcoming events</h3>
      {
        upcomingEvents().map((event, index) => (
          <div className="inline-block text-center mb-4 lg:flex" key={index}>
            <div className="inline-block w-12 h-12 pt-1 leading-10 rounded-full bg-pink-500 text-white font-bold">{event.local().format('D')}</div>
            <div className="pt-3 pl-2 text-gray-700 font-medium">{event.local().format('LLLL')} UTC{event.local().format('Z')}</div>
          </div>
        ))
      }
    </div>
  )
}