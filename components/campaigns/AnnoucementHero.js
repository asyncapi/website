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

    const cfpDeadlineIndia = '2023-10-19T06:00:00Z'
    const cfpDeadlineFrance = '2023-10-26T06:00:00Z'
    const showBannerIndia = shouldShowBanner(cfpDeadlineIndia);
    const showBannerFrance = shouldShowBanner(cfpDeadlineFrance);

    const Banner = ({title, dateLocation, cfaText, eventName, cfpDeadline, link, city}) => { 
      return (
        <div
        className={`bg-gray-50 border border-gray-200 py-6 rounded ${className} ${
          small ? 'mb-4' : 'mx-3 mt-3 p-3 mb-6'
        }`} data-testid = "AnnouncementHero-main-div"
      >
        <Heading
          className="countdown-text-gradient"
          level="h2"
          typeStyle="heading-lg" >
          {title}
        </Heading>
        <Heading
          className="countdown-text-gradient"
          level="h2"
          typeStyle="heading-md" >
          {city}
        </Heading>
        <Paragraph typeStyle="body-lg">
          {dateLocation}
        </Paragraph>
        <AnnouncementRemainingDays dateTime={cfpDeadline} eventName={eventName} />
        <div className="mt-6 pb-2 space-x-2">
          <Button
            href={link}
            target="_blank"
            text={cfaText}
            data-testid="AnnouncementHero-submit-session"
          />
        </div>
      </div>
    )}

    const banners = [
      {
        title: "AsyncAPI Conf",
        city: "Bengaluru",
        dateLocation: "30th of November, 2023 | Bengaluru, India",
        cfaText: "Submit Talk Proposal",
        eventName: "AACoT'23 Bengaluru Edition",
        cfpDeadline: cfpDeadlineIndia,
        link: "https://conference.asyncapi.com/venue/Bangalore",
        show: showBannerIndia
      },
      {        
        title: "AsyncAPI Conf",
        city: "Paris",
        dateLocation: "8th of December, 2023 | Paris, France",
        cfaText: "Submit Talk Proposal",
        eventName: "AACoT'23 Paris Edition",
        cfpDeadline: cfpDeadlineFrance,
        link: "https://conference.asyncapi.com/venue/Paris",
        show: showBannerFrance
      }
    ];

    // Calculate the number of banners that should be displayed
    const numberOfVisibleBanners = banners.filter(banner => banner.show).length;
    const isFlex = numberOfVisibleBanners > 1;
    
  return (
    <Container flex={isFlex} as="section" padding='' className={`text-center ${isFlex ? 'space-x-4' : ''}`}>
      {banners.map((banner, index) => (
        banner.show && (
          <Banner
          key={index}
          title={banner.title}
          dateLocation={banner.dateLocation}
          cfaText={banner.cfaText}
          eventName={banner.eventName}
          cfpDeadline={banner.cfpDeadline}
          link={banner.link}
          city={banner.city}
          />
        )
      ))}
    </Container>
  );
}