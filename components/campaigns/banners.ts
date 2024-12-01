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
    city: 'Paris Edition',
    dateLocation: '5th of December, 2024 | France, Paris',
    cfaText: 'Get Your Free Ticket',
    eventName: 'the AsyncAPI Conf in Paris',
    cfpDeadline: '2024-12-01T06:00:00Z',
    link: 'https://conference.asyncapi.com/#tickets'
  }
];
