import type { Ambassador } from '@/types/pages/community/Community';

/**
 * @description Add additional user information to the user object having ambassador data
 * @param {Ambassador} user - The user object having ambassador data
 */
export function addAdditionalUserInfo(user: Ambassador) {
  const userData: Ambassador = {
    ...user
  };

  // add social links
  if (userData.github) {
    userData.githubUrl = `https://www.github.com/${userData.github}`;
  }
  if (userData.linkedin) {
    userData.linkedinUrl = `https://www.linkedin.com/in/${userData.linkedin}`;
  }
  if (userData.twitter) {
    userData.twitterUrl = `https://www.twitter.com/${userData.twitter}`;
  }

  // add img url
  // github redirects to avatar url using `https://www.github.com/<username>.png`
  if (userData.githubUrl) {
    userData.img = `${userData.githubUrl}.png`;
  }

  return userData;
}
