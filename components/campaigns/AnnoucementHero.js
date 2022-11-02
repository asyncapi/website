import YouTube from 'react-youtube-embed'
import Button from '../buttons/Button'
import Heading from '../typography/Heading'
import Container from '../layout/Container'

function getConferenceDetails() {
  const day = new Date().getUTCDate();
  switch (day) {
    // 3rd November
    case 3: return { day: 1, ytId: 'NTHsezlKBh8' };
    // 4th November
    case 4: return { day: 2, ytId: '8khuAfL7TSE' };
    // 5th November
    case 5: return { day: 3, ytId: 'R8PYWXDDZbI' };
  }
}

export default function AnnouncementHero({ className = '', small = false }) {
  const details = getConferenceDetails();
  if (!details) return null;

  const { day, ytId } = details;
  return (
    <Container wide as="section" padding='' className='text-center'>
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
          <div className='px-4 mt-4 mx-auto max-w-5xl'>
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
    </Container>
  );
}
