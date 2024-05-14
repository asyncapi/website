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

const cfpDeadlineLondon = '2024-07-12T06:00:00Z';
const showBannerLondon = shouldShowBanner(cfpDeadlineLondon);

export const banners = [
  {
    title: "AsyncAPI Conf on Tour'24",
    city: 'London',
    dateLocation: '18 - 19 of September, 2024 | United Kingdom, London',
    cfaText: 'Apply To Speak',
    eventName: 'the end of Call for Speakers',
    cfpDeadline: cfpDeadlineLondon,
    link: 'https://conference.asyncapi.com/venue/London',
    show: showBannerLondon
  }
];
