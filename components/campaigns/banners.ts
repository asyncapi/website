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
    city: 'Munich Edition',
    dateLocation: '2nd - 3rd of July, 2025 | München, Germany',
    cfaText: 'Apply To Speak',
    eventName: 'the end of Call for Speakers',
    cfpDeadline: '2025-05-11T06:00:00Z',
    link: 'https://apidays.typeform.com/apidayscfp?typeform-source=www.apidays.global'
  }
];
