import Paragraph from '../typography/Paragraph'
import Button from '../buttons/Button'
import Heading from '../typography/Heading'
import Container from '../layout/Container'
import AnnouncementRemainingDays from './AnnouncementRamainingDays'

function shouldShowBanner() {
  const month = new Date().getUTCMonth();
  const year = new Date().getUTCFullYear();
  
  //month=6 is June
  if (year > 2023 || month !== 6) {
    return false;
  }
  return true;
}

export default function AnnouncementHero({ className = '', small = false, hideVideo = false }) {
  //return null;

  const showBanner = shouldShowBanner();
  if (!showBanner) return null;

  const cfpDeadline = '2023-07-28T06:00:00Z'
  
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
          AsyncAPI Conf on Tour 2023
        </Heading>
        <Heading
          className="countdown-text-gradient"
          level="h3"
          typeStyle="heading-sm"
        >
          Madrid Edition
        </Heading>
        <Paragraph typeStyle="body-lg">
          20th of September, 2023 | London, UK
        </Paragraph>
        <AnnouncementRemainingDays dateTime={cfpDeadline} eventName="the end of Call for Speakers." />
        <div className="mt-6 pb-2 space-x-2">
          <Button
            href="https://conference.asyncapi.com/"
            target="_blank"
            text="Submit a session"
          />
        </div>
      </div>
    </Container>
  );
}
