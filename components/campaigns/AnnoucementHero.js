import { useRouter } from 'next/router'
import YouTube from 'react-youtube-embed'
import Button from '../buttons/Button'
import Heading from '../typography/Heading'

function getConferenceDetails() {
  const day = new Date().getUTCDate();
  switch (day) {
    case 3: return { day: 1, ytId: 'NTHsezlKBh8' };  
    case 4: return { day: 2, ytId: '8khuAfL7TSE' };
    case 5: return { day: 3, ytId: 'R8PYWXDDZbI' };
  }
}

export default function AnnouncementHero({ className = '', small = false }) {
  const { pathname } = useRouter();
  if (pathname === '/blog/events2021') return null;

  const details = getConferenceDetails();
  if (!details) return null;

  const { day, ytId } = details;
  return (
    <div
      className={`bg-gray-50 border border-gray-200 py-6 rounded ${className} ${
        small ? 'mb-4' : 'mb-12'
      }`}
    >
      <Heading
        className="countdown-text-gradient"
        level="h2"
        typeStyle="heading-lg"
      >
        AsyncAPI Conference 2022 Day {day} is running!
      </Heading>
       <div className='px-4 mt-4 mx-auto max-w-7xl'>
        <YouTube id={ytId} />
      </div>
      <div className="mt-8 pb-2 space-x-2">
        <Button
          href="https://www.asyncapi.com/slack-invite"
          target="_blank"
          text="Comment and ask questions"
        />
        <Button
          href="https://conference.asyncapi.com/schedule"
          target="_blank"
          text="Check schedule"
        />
      </div>
    </div>
  );
}
