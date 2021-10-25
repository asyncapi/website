import { useRouter } from 'next/router'
import Button from '../buttons/Button'

export default function AnnouncementHero({ className = '', small = false }) {
  const { pathname } = useRouter()

  if (pathname === '/blog/events2021') return null

  return (
    <div className={`bg-gray-50 border border-gray-200 py-6  ${className} ${small ? 'mb-0' : 'mb-12'}`}>
      <h2 className="text-xl md:text-3xl font-bold countdown-text-gradient">AsyncAPI Conference (Nov 16-18)</h2>
      {!small && 
        <>
          <p className=" text-gray-700 md:hidden text-xs  my-2 text-center">Connect and innovate with the AsyncAPI Community.</p>
          <p className=" text-gray-700 hidden md:block max-w-3xl mx-auto  my-2 text-center">The first day of the conference is dedicated entirely for folks that want to contribute to AsyncAPI Initiative. The next two days of the conference are a pure learning experience, community for the community.</p>
        </>
      }
      <div className="mt-8 pb-2 space-x-2">
        <Button href="https://zoom.us/webinar/register/8316333610674/WN_pv8NDGIoSg2CnF9qsoptWw" target="_blank" text="Register" />
        <Button bgClassName="bg-none border border-gray-200 text-gray-800 hover:text-gray-700 shadow-none" href="https://conference.asyncapi.com/" target="_blank" text="Learn more" />
      </div>
    </div>
  )
}
