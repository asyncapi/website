import { sortBy } from 'lodash';

import type { Tsc } from '@/types/pages/community/Community';

import IconGithub from '../../components/icons/Github';
import IconLinkedIn from '../../components/icons/LinkedIn';
import IconTwitter from '../../components/icons/Twitter';
import GenericLayout from '../../components/layout/GenericLayout';
import NewsletterSubscribe from '../../components/NewsletterSubscribe';
import TextLink from '../../components/typography/TextLink';
import TSCMembersList from '../../config/MAINTAINERS.json';

interface SocialLinkProps {
  href: string;
  social: string;
}

interface TSCUser {
  user: Tsc;
}

/**
 * @description This function adds additional information to the user object having TSC data.
 *
 * @param user The user object having TSC data.
 * @returns The user object with additional information.
 */
function addAdditionalUserInfo(user: Tsc) {
  const userData: Tsc = {
    ...user,
  };

  // if username is not present, use the github username
  if (!userData.name) {
    userData.name = userData.github;
  }

  // add social links
  if (userData.github) {
    userData.github = `https://www.github.com/${userData.github}`;
  }
  if (userData.linkedin) {
    userData.linkedin = `https://www.linkedin.com/in/${userData.linkedin}`;
  }
  if (userData.twitter) {
    userData.twitter = `https://www.twitter.com/${userData.twitter}`;
  }

  // add avatar url
  // github redirects to avatar url using `https://www.github.com/<username>.png`
  userData.avatarUrl = `${userData.github}.png`;

  // make repo links
  userData.repos = userData.repos.map((repoName: string) => ({
    name: repoName,
    url: `https://www.github.com/asyncapi/${repoName}`,
  }));

  return userData;
}

/**
 * @description This function returns the SVG component for Twitter.
 *
 * @returns The Twitter SVG component.
 */
function TwitterSVG() {
  return (
    <div className="size-5">
      <IconTwitter className="hover:fill-black" />
    </div>
  );
}

/**
 * @description This function returns the SVG component for GitHub.
 *
 * @returns The GitHub SVG component.
 */
function GitHubSVG() {
  return (
    <div className="size-5">
      <IconGithub className="hover:fill-black" />
    </div>
  );
}

/**
 * @description This function returns the SVG component for LinkedIn.
 *
 * @returns The LinkedIn SVG component.
 */
function LinkedInSVG() {
  return (
    <div className="size-5">
      <IconLinkedIn className="hover:fill-linkedin" />
    </div>
  );
}

const socials: { [key: string]: JSX.Element } = {
  GitHub: <GitHubSVG />,
  Twitter: <TwitterSVG />,
  Linkedin: <LinkedInSVG />,
};

/**
 * @description This function returns the social link component.
 *
 * @param {SocialLinkProps} props - The props for the social link component.
 * @param {string} props.href - The URL for the social link.
 * @param {string} props.social - The social media platform.
 */
function SocialLink({ href, social }: SocialLinkProps) {
  return (
    <li>
      <a
        data-testid="Social-Links"
        href={href}
        className="text-gray-600 hover:text-gray-500"
        target="_blank"
        rel="noreferrer noopener"
      >
        <span className="sr-only">{social}</span>
        {socials[social]}
      </a>
    </li>
  );
}

/**
 * @description This function returns the user work status component.
 *
 * @param {TSCUser} props - The props for the user work status component.
 * @param {Tsc} props.user - The user object having TSC data.
 */
function UserWorkStatus({ user }: TSCUser) {
  if (user.availableForHire) {
    return (
      <div
        data-testid="status-element"
        className="inline-flex items-center py-1 px-3 font-medium leading-5 text-green-800 bg-green-100 rounded-full text-md"
      >
        Available for hire
      </div>
    );
  }
  if (user.company) {
    return (
      <div
        data-testid="status-element"
        className="inline-flex items-center py-1 px-3 font-medium leading-5 text-orange-800 bg-orange-100 rounded-full text-md"
      >
        {user.company}
      </div>
    );
  }

  return (
    <div
      data-testid="status-element"
      className="inline-flex items-center py-1 px-3 font-medium leading-5 text-blue-800 bg-blue-100 rounded-full text-md"
    >
      Individual Member
    </div>
  );
}

/**
 * @description This function returns the user info component.
 *
 * @param {TSCUser} props - The props for the user info component.
 * @param {Tsc} props.user - The user object having TSC data.
 */
function UserInfo({ user }: TSCUser) {
  return (
    <li
      data-testid="UserInfo-list"
      className="p-4 text-center rounded-md border border-gray-200 shadow-md"
      key={user.github}
    >
      <div className="flex flex-row">
        <img
          data-testid="UserInfo-avatar"
          src={user.avatarUrl}
          alt={user.name}
          className="mx-auto rounded-full size-20 xl:size-28"
        />
        <div className="flex-1">
          <div className="my-3 text-lg font-bold" data-testid="UserInfo-name">
            {user.name}
          </div>
          <UserWorkStatus user={user} />
          <ul role="list" className="flex justify-center my-5 space-x-5">
            <SocialLink href={user.github} social="GitHub" />
            {user.twitter ? (
              <SocialLink href={user.twitter} social="Twitter" />
            ) : null}
            {user.linkedin ? (
              <SocialLink href={user.linkedin} social="Linkedin" />
            ) : null}
          </ul>
        </div>
      </div>
      <div className="flex flex-wrap gap-1 items-center">
        Maintainer of:
        {user.repos.map((repo: { name: string; url: string }) => (
          <a
            data-testid="Repo-Links"
            key={repo.name}
            className="inline-flex items-center py-0.5 px-3 text-xs font-medium leading-5 text-cyan-800 bg-cyan-100 rounded-full hover:bg-cyan-300"
            href={repo.url}
          >
            {repo.name}
          </a>
        ))}
      </div>
    </li>
  );
}

/**
 * @description This function returns the question card component.
 */
function QuestionCard() {
  return (
    <li
      className="p-4 py-10 px-6 text-center rounded-md border border-gray-200 shadow-md"
      data-testid="Question-card"
    >
      <img
        data-testid="Question-card-img"
        src="/img/avatars/questionmark.webp"
        alt="Question Mark"
        className="mx-auto rounded-full size-20 xl:size-28"
      />
      <div className="my-4">
        Want to become a member? Follow this
        <TextLink
          href="https://github.com/asyncapi/community/blob/master/TSC_MEMBERSHIP.md"
          target="_blank"
          className="text-base font-normal no-underline text-sky-600 hover:text-sky-400"
        >
          Link
        </TextLink>
        &nbsp;to know more!
      </div>
    </li>
  );
}

/**
 * @description This function returns the TSC component.
 */
export default function TSC() {
  const description =
    'Meet the current AsyncAPI TSC members and learn how you can become one.';
  const image = '/img/social/community-tsc.webp';

  const tscMembers = sortBy(
    TSCMembersList.map((user) => addAdditionalUserInfo(user)),
    ['name'],
  ).filter((user) => user.isTscMember);

  return (
    <GenericLayout
      title="Technical Steering Committee"
      description={description}
      image={image}
      wide
    >
      <div className="mb-8 text-center text-white">
        <h3 className="mb-4 text-2xl font-bold">Welcome to Community.</h3>
      </div>

      <div className="mb-8 text-center text-primary-800">
        <p>Here is a list of all current members of the AsyncAPI Initiative.</p>
      </div>

      <div className="relative py-12 px-4 mx-auto sm:px-6 lg:px-8">
        <div
          className="grid my-0 mx-auto max-w-xl lg:grid-cols-3 lg:gap-8 lg:max-w-screen-xl"
          data-testid="TSC-content"
        >
          <div>
            <h3 className="mb-2 font-semibold lg:text-2xl lg:text-center text-primary-800">
              What is a TSC?
            </h3>
            <p className="my-4 text-base text-gray-500 lg:text-left">
              The Technical Steering Committee (TSC) is responsible for the
              oversight of the AsyncAPI Initiative. Maintainers (aka committers)
              make decisions at the given repository/project level. The TSC
              helps to make decisions on a higher level, or when maintainers
              cannot find a consensus.
            </p>
          </div>
          <div>
            <h3 className="mb-2 font-semibold lg:text-2xl lg:text-center text-primary-800">
              How can I become a TSC member?
            </h3>
            <p className="my-4 text-base text-gray-500 lg:text-left">
              Anybody can become a member of the TSC. All you have to do is
              become a maintainer of one of the AsyncAPI projects! To become a
              maintainer, you just need to regularly contribute to one of the
              projects and then other maintainers will invite you to join. You
              can also build a great AsyncAPI-based project that we don&apos;t
              have yet in our GitHub organization and donate it (we&apos;ll ask
              you to stay as a maintainer). Follow this
              <TextLink
                href="https://github.com/asyncapi/community/blob/master/TSC_MEMBERSHIP.md"
                target="_blank"
                className="text-base font-normal text-blue-500 no-underline hover:text-sky-400"
              >
                Link
              </TextLink>
              &nbsp;to know more!
            </p>
          </div>
          <div>
            <h3 className="mb-2 font-semibold lg:text-2xl lg:text-center text-primary-800">
              Our governance model
            </h3>
            <p className="my-4 text-base text-gray-500 lg:text-left">
              AsyncAPI Initiative runs under an{' '}
              <a
                data-testid="TSC-Governance-Link"
                href="https://github.com/asyncapi/community/blob/master/CHARTER.md"
                className="text-blue-500 hover:text-blue-400"
              >
                Open Governance Model
              </a>{' '}
              that gives power to the people actively involved and working on
              the project. No matter if you are an individual contributor or
              backed by a company, you have equal rights. Read{' '}
              <a
                data-testid="TSC-Article-Link"
                href="https://www.asyncapi.com/blog/governance-motivation"
                className="text-blue-500 hover:text-blue-400"
              >
                this
              </a>{' '}
              article to learn more.
            </p>
          </div>
        </div>
        <div className="mt-8">
          <NewsletterSubscribe
            type="TSC Voting"
            title="Get notified when TSC is voting"
            subtitle="You'll receive an email whenever someone requests the TSC to vote."
          />
        </div>
        <div className="mt-10">
          <div className="mb-5 text-center text-primary-800">
            <h3 className="text-2xl font-semibold">Current TSC members</h3>
            <span className="text-sm font-thin">(in alphabetical order)</span>
          </div>

          <ul
            role="list"
            className="space-y-4 sm:grid sm:grid-cols-2 sm:gap-6 sm:space-y-0 lg:grid-cols-3 lg:gap-8"
          >
            {tscMembers.map((user) => (
              <UserInfo key={user.github} user={user} />
            ))}
            <QuestionCard />
          </ul>
        </div>
      </div>
    </GenericLayout>
  );
}
