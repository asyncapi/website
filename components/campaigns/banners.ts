const cfpDeadlineIndia = '2023-11-30T06:00:00Z';
const cfpDeadlineFrance = '2023-12-06T06:00:00Z';

/**
 * @param {string} cfpDeadline - The deadline for the call for papers
 * @returns Whether the banner should be shown
 * @description Check if the current date is after the deadline
 */
function shouldShowBanner(cfpDeadline: string) {
  const currentDate = new Date(); // G et the current date
  const deadline = new Date(cfpDeadline); // Convert the cfpDeadline string to a Date object

  // Check if the current date is after the deadline
  if (currentDate > deadline) {
    return false;
  }

  return true;
}

const showBannerIndia = shouldShowBanner(cfpDeadlineIndia);
const showBannerFrance = shouldShowBanner(cfpDeadlineFrance);

export const banners = [
  {
    title: 'AsyncAPI Conf',
    city: 'Bengaluru',
    dateLocation: '30th of November, 2023 | Bengaluru, India',
    cfaText: 'Grab Free Tickets',
    eventName: "AACoT'23 Bengaluru Edition",
    cfpDeadline: cfpDeadlineIndia,
    link: 'https://conference.asyncapi.com/venue/bangalore',
    show: showBannerIndia
  },
  {
    title: 'AsyncAPI Conf',
    city: 'Paris',
    dateLocation: '8th of December, 2023 | Paris, France',
    cfaText: 'Get Free Tickets',
    eventName: "AACoT'23 Paris Edition",
    cfpDeadline: cfpDeadlineFrance,
    link: 'https://ticket.apidays.global/event/apidays-paris-2023/8a1f3904-e2be-4c69-a880-37d2ddf1027d/cart?coupon=ASYNCAPICONF23',
    show: showBannerFrance
  }
];
