/**
 * @param {string} cfpDeadline - The deadline for the call for papers
 * @returns Whether the banner should be shown
 * @description Check if the current date is after the deadline
 */
export function shouldShowBanner(cfpDeadline: string) {
  const currentDate = new Date(); // Get the current date
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
    city: 'Paris Edition',
    dateLocation: '9th - 11th of December, 2025 | Paris, France',
    cfaText: 'Apply To Speak',
    eventName: 'the end of Call for Speakers',
    cfpDeadline: '2025-10-05T06:00:00Z',
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
  },
  {
    title: 'AsyncAPI Conference',
    city: 'DeveloperWeek 2026',
    dateLocation: '18th - 20th of February, 2026 | San Jose, United States',
    cfaText: 'Apply To Speak',
    eventName: 'the end of Call for Speakers',
    cfpDeadline: '2025-11-07T06:00:00Z',
    link: 'https://confengine.com/conferences/asyncapi-summit-at-developerweek2026'
  }
];
