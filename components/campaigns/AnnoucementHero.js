import { useRouter } from 'next/router'
import Button from '../buttons/Button'
import Heading from '../typography/Heading'
import Paragraph from '../typography/Paragraph'

export default function AnnouncementHero({ className = '', small = false}) {

  const { pathname } = useRouter()

  if (pathname === '/blog/events2021') return null

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
        AsyncAPI Conference 2022
      </Heading>
      <Paragraph typeStyle="body-lg">
        November 3-5, 2022 | Virtual
      </Paragraph>
      <div className="mt-8 pb-2 space-x-2">
        <Button
          href="https://conference.asyncapi.com/"
          target="_blank"
          text="Learn more"
        />
      </div>
    </div>
  );
}
