import { useState, useEffect } from 'react'
import Paragraph from '../typography/Paragraph'
import Button from '../buttons/Button'
import Heading from '../typography/Heading'
import Container from '../layout/Container'
import AnnouncementRemainingDays from './AnnouncementRemainingDays'
import ArrowLeft from '../icons/ArrowLeft'
import ArrowRight from '../icons/ArrowRight'

function shouldShowBanner(cfpDeadline) {
  const currentDate = new Date(); // G et the current date
  const deadline = new Date(cfpDeadline); // Convert the cfpDeadline string to a Date object

  // Check if the current date is after the deadline
  if (currentDate > deadline) {
    return false;
  }

  return true;
}

export default function AnnouncementHero({ className = '', small = false, hideVideo = false }) {
  //return null;
  
  const [activeIndex, setActiveIndex] = useState(0);

  const cfpDeadlineIndia = '2023-11-30T06:00:00Z'
  const cfpDeadlineFrance = '2023-12-06T06:00:00Z'
  const showBannerIndia = shouldShowBanner(cfpDeadlineIndia);
  const showBannerFrance = shouldShowBanner(cfpDeadlineFrance);

  const Banner = ({ title, dateLocation, cfaText, eventName, cfpDeadline, link, city, activeBanner }) => {
    return (
      <div
        className={`bg-gray-50 w-full h-full border border-gray-200 absolute py-6 rounded transform transition-transform ${className} ${small ? 'mb-4' : 'mx-3 mt-3 p-3 mb-6'
          } ${activeBanner ? 'opacity-100 scale-100 z-10' : 'opacity-0 scale-90 z-0'}`} data-testid="AnnouncementHero-main-div"
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
    )
  }

  const banners = [
    {
      title: "AsyncAPI Conf",
      city: "Bengaluru",
      dateLocation: "30th of November, 2023 | Bengaluru, India",
      cfaText: "Grab Free Tickets",
      eventName: "AACoT'23 Bengaluru Edition",
      cfpDeadline: cfpDeadlineIndia,
      link: "https://conference.asyncapi.com/venue/bangalore",
      show: showBannerIndia
    },
    {
      title: "AsyncAPI Conf",
      city: "Paris",
      dateLocation: "8th of December, 2023 | Paris, France",
      cfaText: "Get Free Tickets",
      eventName: "AACoT'23 Paris Edition",
      cfpDeadline: cfpDeadlineFrance,
      link: "https://ticket.apidays.global/event/apidays-paris-2023/8a1f3904-e2be-4c69-a880-37d2ddf1027d/cart?coupon=ASYNCAPICONF23",
      show: showBannerFrance
    }
  ];

  // Calculate the number of banners that should be displayed
  const numberOfVisibleBanners = banners.filter(banner => banner.show).length;
  const len = banners.length;

  const goToPrevious = () => {
    setActiveIndex((prevIndex) => (prevIndex === 0 ? len - 1 : prevIndex - 1));
  };

  const goToNext = () => {
    setActiveIndex((prevIndex) => (prevIndex === len - 1 ? 0 : prevIndex + 1));
  };

  const goToIndex = (index) => {
    setActiveIndex(index);
  };

  useEffect(() => {
    const interval = setInterval(() => setActiveIndex(index => index + 1), 5000);
    return () => {
      clearInterval(interval);
    };
  }, [activeIndex]);

  return (
    <Container as="section" padding='' className={`text-center`}>
      <div className="relative flex flex-row justify-center items-center md:gap-4 overflow-x-hidden">
        <div className="h-8 w-8 rounded-full bg-primary-500 hover:bg-primary-600 cursor-pointer mb-2 absolute left-0 z-10 top-1/2 transform -translate-y-1/2 opacity-50 md:opacity-100 flex justify-center items-center" onClick={goToPrevious}>
          <ArrowLeft className='w-4 text-white' />
        </div>
        <div className='relative w-5/6 pr-3 flex flex-col gap-2 justify-center items-center'>
          <div className='relative w-full h-[18rem] lg:w-[38rem] lg:h-[17rem] overflow-hidden'>
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
                activeBanner={index === activeIndex % len}
              />
            )
          ))}
          </div>
          <div className="flex justify-center m-auto">
            {banners.map((banner, index) => (
              <div
                key={index}
                className={`h-2 w-2 rounded-full mx-1 cursor-pointer ${
                  activeIndex % len === index ? 'bg-primary-500' : 'bg-gray-300'
                }`}
                onClick={() => goToIndex(index)}
              />
            ))}
      </div>
        </div>
        <div
          className="h-8 w-8 rounded-full bg-primary-500 hover:bg-primary-600 cursor-pointer mb-2 z-10 absolute right-0 top-1/2 transform -translate-y-1/2 opacity-50 md:opacity-100"
          onClick={goToNext}
        >
          <ArrowRight className='text-white' />
        </div>
      </div>
    </Container>
  );
}
