/**
 * @param {string} cfpDeadline - The deadline for the call for papers
 * @returns Whether the banner should be shown
 * @description Check if the current date is after the deadline
 */
export function shouldShowBanner(cfpDeadline: string) {
  const currentDate = new Date(); // G et the current date
  const deadline = new Date(cfpDeadline); // Convert the cfpDeadline string to a Date object

  // Check if the current date is after the deadline
  if (currentDate > deadline) {
    return false;
  }

  return true;
}

export const banners = [
  {
    title: 'AsyncAPI Conference',
    city: 'Singapore Edition',
    dateLocation: '15th - 16th of April, 2025 | Singapore, Singapre',
    cfaText: 'Get Free Tickets',
    eventName: 'you get a Free Tickets',
    cfpDeadline: '2025-04-13T06:00:00Z',
    link: 'https://ticket.apidays.global/event/apidays-singapore-2025/4c745e62-0e52-4c4a-9221-29f47bc57128/cart?coupon=ASYNCAPICOMMUNITY'
  },
  {
    title: 'AsyncAPI Conference',
    city: 'Munich Edition',
    dateLocation: '2nd - 3rd of July, 2025 | München, Germany',
    cfaText: 'Apply To Speak',
    eventName: 'the end of Call for Speakers',
    cfpDeadline: '2025-05-11T06:00:00Z',
    link: 'https://apidays.typeform.com/apidayscfp?typeform-source=www.apidays.global'
  },
  {
    title: 'AsyncAPI Conference',
    city: 'Lagos Edition',
    dateLocation: '18th - 19th of July, 2025 | Lagos, Nigeria',
    cfaText: 'Apply To Speak',
    eventName: 'the end of Call for Speakers',
    cfpDeadline: '2025-05-17T06:00:00Z',
    link: 'https://conference.asyncapi.com/venue/Lagos'
  },
  {
    title: 'AsyncAPI Conference',
    city: 'Bangalore Edition',
    dateLocation: '8th - 9th of October, 2025 | Bangalore, India',
    cfaText: 'Apply To Speak',
    eventName: 'the end of Call for Speakers',
    cfpDeadline: '2025-06-29T06:00:00Z',
    link: 'https://conference.asyncapi.com/venue/Bangalore'
  },
  {
    title: 'AsyncAPI Conference',
    city: 'London Edition',
    dateLocation: '22nd - 24th of September, 2025 | London, UK',
    cfaText: 'Apply To Speak',
    eventName: 'the end of Call for Speakers',
    cfpDeadline: '2025-07-13T06:00:00Z',
    link: 'https://conference.asyncapi.com/venue/London'
  },
  {
    title: 'AsyncAPI Conference',
    city: 'Paris Edition',
    dateLocation: '9th - 11th of December, 2025 | Paris, France',
    cfaText: 'Apply To Speak',
    eventName: 'the end of Call for Speakers',
    cfpDeadline: '2025-08-05T06:00:00Z',
    link: 'https://conference.asyncapi.com/venue/Paris'
  },
  {
    title: 'AsyncAPI Conference',
    city: 'Online Edition',
    dateLocation: '29th of October, 2025 | AsyncAPI YouTube',
    cfaText: 'Apply To Speak',
    eventName: 'the end of Call for Speakers',
    cfpDeadline: '2025-09-07T06:00:00Z',
    link: 'https://conference.asyncapi.com/venue/Online'
  }
];
