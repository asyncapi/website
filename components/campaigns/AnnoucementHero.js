import Paragraph from '../typography/Paragraph'
import Button from '../buttons/Button'
import Heading from '../typography/Heading'
import Container from '../layout/Container'
import AnnouncementRemainingDays from './AnnouncementRamainingDays'

function shouldShowBanner(cfpDeadline) {
  const currentDate = new Date(); // Get the current date
  console.log(currentDate)
  const deadline = new Date(cfpDeadline); // Convert the cfpDeadline string to a Date object

  // Check if the current date is after the deadline
  if (currentDate > deadline) {
    return false;
  }

  return true;
}
export default function AnnouncementHero({ className = '', small = false, hideVideo = false }) {
  //return null;

    const cfpDeadline = '2023-07-28T06:00:00Z'
    const showBanner = shouldShowBanner(cfpDeadline);
  if (!showBanner) return null;

  
  return (
    <Container wide as="section" padding='' className='text-center'>
      <div
        className={`bg-gray-50 border border-gray-200 py-6 rounded ${className} ${
          small ? 'mb-4' : 'mx-3 mt-3 p-3 mb-6'
        }`} data-testid = "AnnouncementHero-main-div"
      >
        <Heading
          className="countdown-text-gradient"
          level="h2"
          typeStyle="heading-lg" >
          AsyncAPI Conf on Tour 2023
        </Heading>

        <Heading
          className="countdown-text-gradient"
          level="h3"
          typeStyle="heading-sm"
        >
          London Edition
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
            data-testid="AnnouncementHero-submit-session"
          />
        </div>
      </div>
    </Container>
  );
}