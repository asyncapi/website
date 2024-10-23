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
    title: "AsyncAPI Online Conference'24",
    city: 'YouTube',
    dateLocation: '30th of October, 2024 | YouTube & LinkedIn',
    cfaText: 'Join us Live',
    eventName: 'the AsyncAPI Online Conference',
    cfpDeadline: '2024-10-30T06:00:00Z',
    link: 'https://www.youtube.com/live/F9wHxd-v2f0?si=kPCqgUzqAKC0FaqJ'
  }
];
