/* eslint-disable no-unused-vars */
/* eslint-disable unused-imports/no-unused-vars */
import { useEffect, useState } from 'react';

/**
 * @param {String} cfpDeadline - The deadline for the call for papers
 * @returns Whether the banner should be shown
 * @description Check if the current date is after the deadline
 */
// function shouldShowBanner(cfpDeadline: string) {
//   const currentDate = new Date(); // G et the current date
//   const deadline = new Date(cfpDeadline); // Convert the cfpDeadline string to a Date object

//   // Check if the current date is after the deadline
//   if (currentDate > deadline) {
//     return false;
//   }

//   return true;
// }

interface IAnnouncementHeroProps {
  className?: string;
  small?: boolean;
  hideVideo?: boolean;
}

/**
 * @param {String} props.className - The class name of the announcement hero
 * @param {Boolean} props.small - Whether the banner is small
 * @param {Boolean} props.hideVideo - Whether the video should be hidden
 * @description The announcement hero
 */
export default function AnnouncementHero({ className = '', small = false, hideVideo = false }: IAnnouncementHeroProps) {
  const [activeIndex, setActiveIndex] = useState(0);

  // const cfpDeadlineIndia = '2023-11-30T06:00:00Z';
  // const cfpDeadlineFrance = '2023-12-06T06:00:00Z';
  // const showBannerIndia = shouldShowBanner(cfpDeadlineIndia);
  // const showBannerFrance = shouldShowBanner(cfpDeadlineFrance);

  // const Banner = ({ title, dateLocation, cfaText, eventName, cfpDeadline, link, city, activeBanner }) => {
  //   return (
  //     <div
  //       className={`absolute size-full rounded border border-gray-200 bg-gray-50 py-6
  //       transition-transform${className} ${small ? 'mb-4' : 'mx-3 mb-6 mt-3 p-3'}
  //       ${activeBanner ? 'z-10 scale-100 opacity-100' : 'z-0 scale-90 opacity-0'}`}
  //       data-testid='AnnouncementHero-main-div'
  //     >
  //       <Heading
  //         className='countdown-text-gradient'
  //         level='h2'
  //         typeStyle='heading-lg' >
  //         {title}
  //       </Heading>
  //       <Heading
  //         className='countdown-text-gradient'
  //         level='h2'
  //         typeStyle='heading-md' >
  //         {city}
  //       </Heading>
  //       <Paragraph typeStyle='body-lg'>
  //         {dateLocation}
  //       </Paragraph>
  //       <AnnouncementRemainingDays dateTime={cfpDeadline} eventName={eventName} />
  //       <div className='mt-6 space-x-2 pb-2'>
  //         <Button
  //           href={link}
  //           target='_blank'
  //           text={cfaText}
  //           data-testid='AnnouncementHero-submit-session'
  //         />
  //       </div>
  //     </div>
  //   );
  // };

  // const banners = [
  //   {
  //     title: 'AsyncAPI Conf',
  //     city: 'Bengaluru',
  //     dateLocation: '30th of November, 2023 | Bengaluru, India',
  //     cfaText: 'Grab Free Tickets',
  //     eventName: 'AACoT\'23 Bengaluru Edition',
  //     cfpDeadline: cfpDeadlineIndia,
  //     link: 'https://conference.asyncapi.com/venue/bangalore',
  //     show: showBannerIndia
  //   },
  //   {
  //     title: 'AsyncAPI Conf',
  //     city: 'Paris',
  //     dateLocation: '8th of December, 2023 | Paris, France',
  //     cfaText: 'Get Free Tickets',
  //     eventName: 'AACoT\'23 Paris Edition',
  //     cfpDeadline: cfpDeadlineFrance,
  //     link: 'https://ticket.apidays.global/asyncapi-conf-2023-paris',
  //     show: showBannerFrance
  //   }
  // ];

  // Calculate the number of banners that should be displayed
  // const numberOfVisibleBanners = banners.filter(banner => banner.show).length;
  // const len = banners.length;

  // const goToPrevious = () => {
  //   setActiveIndex((prevIndex) => (prevIndex === 0 ? len - 1 : prevIndex - 1));
  // };

  // const goToNext = () => {
  //   setActiveIndex((prevIndex) => (prevIndex === len - 1 ? 0 : prevIndex + 1));
  // };

  // const goToIndex = (index) => {
  //   setActiveIndex(index);
  // };

  useEffect(() => {
    const interval = setInterval(() => setActiveIndex(index => index + 1), 5000);

    return () => {
      clearInterval(interval);
    };
  }, [activeIndex]);

  return null;
  // return (
  //   <Container as='section' padding='' className={'text-center'}>
  //     <div className='relative flex flex-row items-center justify-center overflow-x-hidden md:gap-4'>
  //       <div
  //         className={`absolute left-0 top-1/2 z-10 mb-2 flex size-8 -translate-y-1/2 cursor-pointer
  //         items-center justify-center rounded-full bg-primary-500 opacity-50 hover:bg-primary-600 md:opacity-100`}
  //         onClick={goToPrevious}
  //       >
  //         <ArrowLeft className='w-4 text-white' />
  //       </div>
  //       <div className='relative flex w-5/6 flex-col items-center justify-center gap-2 pr-3'>
  //         <div className='relative h-[18rem] w-full overflow-hidden lg:h-[17rem] lg:w-[38rem]'>
  //           {banners.map((banner, index) => (
  //             banner.show && (
  //               <Banner
  //                 key={index}
  //                 title={banner.title}
  //                 dateLocation={banner.dateLocation}
  //                 cfaText={banner.cfaText}
  //                 eventName={banner.eventName}
  //                 cfpDeadline={banner.cfpDeadline}
  //                 link={banner.link}
  //                 city={banner.city}
  //                 activeBanner={index === activeIndex % len}
  //               />
  //             )
  //           ))}
  //         </div>
  //         <div className='m-auto flex justify-center'>
  //           {banners.map((banner, index) => (
  //             <div
  //               key={index}
  //               className={`mx-1 size-2 cursor-pointer rounded-full ${
  //                 activeIndex % len === index ? 'bg-primary-500' : 'bg-gray-300'
  //               }`}
  //               onClick={() => goToIndex(index)}
  //             />
  //           ))}
  //         </div>
  //       </div>
  //       <div
  //         className={`absolute right-0 top-1/2 z-10 mb-2 size-8 -translate-y-1/2 cursor-pointer
  //                     rounded-full bg-primary-500 opacity-50 hover:bg-primary-600 md:opacity-100`}
  //         onClick={goToNext}
  //       >
  //         <ArrowRight className='text-white' />
  //       </div>
  //     </div>
  //   </Container>
  // );
}
