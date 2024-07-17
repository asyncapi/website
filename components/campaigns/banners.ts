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

const cfpDeadlineParis = '2024-09-20T06:00:00Z';
const showBannerParis = shouldShowBanner(cfpDeadlineParis);

export const banners = [
  {
    title: "AsyncAPI Conf on Tour'24",
    city: 'Paris',
    dateLocation: '3rd - 5th of December, 2024 | France, Paris',
    cfaText: 'Apply To Speak',
    eventName: 'the end of Call for Speakers',
    cfpDeadline: cfpDeadlineParis,
    link: 'https://conference.asyncapi.com/venue/Paris',
    show: showBannerParis
  }
];
