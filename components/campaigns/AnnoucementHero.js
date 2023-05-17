import Paragraph from '../typography/Paragraph'
import Button from '../buttons/Button'
import Heading from '../typography/Heading'
import Container from '../layout/Container'
import AnnouncementRemainingDays from './AnnouncementRamainingDays'

function shouldShowBanner() {
  const month = new Date().getUTCMonth();
  const year = new Date().getUTCFullYear();
  
  //month=4 is May
  if (year > 2023 || month !== 4) {
    return false;
  }
  return true;
}

export default function AnnouncementHero({ className = '', small = false, hideVideo = false }) {
  //return null;

  const showBanner = shouldShowBanner();
  if (!showBanner) return null;

  const cfpDeadline = '2023-05-31T06:00:00Z'
  
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
          October, 2023 | Madrid, Spain
        </Paragraph>
        <AnnouncementRemainingDays dateTime={cfpDeadline} eventName="the end for Call for Speakers." />
        <div className="mt-6 pb-2 space-x-2">
          <Button
            href="https://sessionize.com/aacot-madrid/"
            target="_blank"
            text="Submit a session"
          />
        </div>
      </div>
    </Container>
  );
}
