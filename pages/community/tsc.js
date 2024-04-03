import GenericLayout from "../../components/layout/GenericLayout";
import TSCMembersList from "../../config/MAINTAINERS.json";
import {sortBy} from 'lodash';
import NewsletterSubscribe from "../../components/NewsletterSubscribe";
import TextLink from '../../components/typography/TextLink';
import { useState } from 'react';
import IconGithub from '../../components/icons/Github';
import IconLinkedIn from '../../components/icons/LinkedIn';
import IconTwitter from '../../components/icons/Twitter';

function addAdditionalUserInfo(user) {
  const userData = {
    ...user,
  };

  // if username is not present, use the github username
  if (!userData.name) userData.name = userData.github;

  // add social links
  if (userData.github)
    userData.github = `https://www.github.com/${userData.github}`;
  if (userData.linkedin)
    userData.linkedin = `https://www.linkedin.com/in/${userData.linkedin}`;
  if (userData.twitter)
    userData.twitter = `https://www.twitter.com/${userData.twitter}`;

  // add avatar url
  // github redirects to avatar url using `https://www.github.com/<username>.png`
  userData.avatarUrl = userData.github + ".png";

  // make repo links
  userData.repos = userData.repos.map((repoName) => ({
    name: repoName,
    url: `https://www.github.com/asyncapi/${repoName}`,
  }));

  return userData;
}

export default function TSC() {
  const description =
    "Meet the current AsyncAPI TSC members and learn how you can become one.";
  const image = "/img/social/community-tsc.webp";

  const tscMembers = sortBy(
    TSCMembersList.map((user) => addAdditionalUserInfo(user)),
    ["name"]
  ).filter((user) => user.isTscMember);

  return (
    <GenericLayout
      title="Technical Steering Committee"
      description={description}
      image={image}
      wide
    >
      <div className="py-12 relative mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid max-w-xl my-0 mx-auto lg:grid-cols-3 lg:gap-8 lg:max-w-screen-xl" data-testid="TSC-content">
          <div>
            <h3 className="font-semibold  text-primary-800 mb-2 lg:text-2xl lg:text-center">
              What is a TSC?
            </h3>
            <p className="my-4 text-base text-gray-500 lg:text-center">
              The Technical Steering Committee (TSC) is responsible for the
              oversight of the AsyncAPI Initiative. Maintainers (aka committers)
              make decisions at the given repository/project level. The TSC
              helps to make decisions on a higher level, or when maintainers
              cannot find a consensus.
            </p>
          </div>
          <div>
            <h3 className="font-semibold  text-primary-800 mb-2 lg:text-2xl lg:text-center">
              How can I become a TSC member?
            </h3>
            <p className="my-4 text-base text-gray-500 lg:text-center">
              Anybody can become a member of the TSC. All you have to do is
              become a maintainer of one of the AsyncAPI projects! To become a
              maintainer, you just need to regularly contribute to one of the
              projects and then other maintainers will invite you to join. You
              can also build a great AsyncAPI-based project that we don't have
              yet in our GitHub organization and donate it (we'll ask you to
              stay as a maintainer).
              Follow this
              <TextLink href="https://github.com/asyncapi/community/blob/master/TSC_MEMBERSHIP.md" target="_blank" className="text-base font-normal text-blue-500 hover:text-sky-400 no-underline">
                Link
              </TextLink>
              &nbsp;to know more!
            </p>
          </div>
          <div>
            <h3 className="font-semibold  text-primary-800 mb-2 lg:text-2xl lg:text-center">
              Our governance model
            </h3>
            <p className="my-4 text-base text-gray-500 lg:text-center">
              AsyncAPI Initiative runs under an{" "}
              <a data-testid="TSC-Governance-Link"
                href="https://github.com/asyncapi/community/blob/master/CHARTER.md"
                className="text-blue-500 hover:text-blue-400"
              >
                Open Governance Model
              </a>{" "}
              that gives power to the people actively involved and working on
              the project. No matter if you are an individual contributor or
              backed by a company, you have equal rights. Read{" "}
              <a data-testid="TSC-Article-Link"
                href="https://www.asyncapi.com/blog/governance-motivation"
                className="text-blue-500 hover:text-blue-400"
              >
                this
              </a>{" "}
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
          <div className="mb-5 text-primary-800 text-center">
            <h3 className="font-semibold text-2xl">
              Current TSC members
            </h3>
            <span className="font-thin text-sm">
              (in alphabetical order)
            </span>
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

const socials = {
  "Github": <GithubSVG />,
  "Twitter": <TwitterSVG />,
  "Linkedin": <LinkedInSVG />,
}

function SocialLink({ href, social }) {
  return (
    <li>
      <a data-testid="Social-Links"
        href={href}
        className="text-gray-600 hover:text-gray-500"
        target="_blank"
        rel="noreferrer noopener"
      >
        <span className="sr-only">{social}</span>
        {socials[social]}
      </a>
    </li>
  )
}

function UserInfo({ user }) {
  return (
    <li data-testid="UserInfo-list"
      className="p-4 text-center border rounded-md border-gray-200 shadow-md"
      key={user.github}
    >
      <div className="flex flex-row">
        <img data-testid="UserInfo-avatar"
          src={user.avatarUrl}
          className="mx-auto rounded-full h-20 w-20 xl:w-28 xl:h-28"
        />
        <div className="flex-1">
          <div className="font-bold text-lg my-3" data-testid="UserInfo-name">{user.name}</div>
          <UserWorkStatus user={user} />
          <ul role="list" className="flex justify-center space-x-5 my-5">
            <SocialLink href={user.github} social="Github" />
            {user.twitter ? <SocialLink href={user.twitter} social="Twitter" /> : null}
            {user.linkedin ? <SocialLink href={user.linkedin} social="Linkedin" /> : null}
          </ul>
        </div>
      </div>
      <div className="flex flex-wrap gap-1 items-center">
        Maintainer of:
        {user.repos.map((repo) => (
          <a data-testid="Repo-Links"
            key={repo.name}
            className="inline-flex items-center px-3 py-0.5 rounded-full text-xs font-medium leading-5 bg-cyan-100 text-cyan-800 hover:bg-cyan-300"
            href={repo.url}
          >
            {repo.name}
          </a>
        ))}
      </div>
    </li>
  );
}

function UserWorkStatus({ user }) {
  if (user.availableForHire) {
    return (
      <div data-testid="status-element" className="inline-flex items-center px-3 py-1 rounded-full text-md font-medium leading-5 bg-green-100 text-green-800">
        Available for hire
      </div>
    );
  } else if (user.company) {
    return (
      <div data-testid="status-element" className="inline-flex items-center px-3 py-1 rounded-full text-md font-medium leading-5 bg-orange-100 text-orange-800">
        {user.company}
      </div>
    );
  } else {
    return (
      <div data-testid="status-element" className="inline-flex items-center px-3 py-1 rounded-full text-md font-medium leading-5 bg-blue-100 text-blue-800">
        Individual Member
      </div>
    );
  }
}

function QuestionCard() {
  return (
    <li className="py-10 px-6 text-center border rounded-md border-gray-200 shadow-md p-4" data-testid="Question-card">
      <img data-testid="Question-card-img"
        src="/img/avatars/questionmark.webp"
        className="mx-auto rounded-full h-20 w-20 xl:w-28 xl:h-28"
      />
      <div className="my-4">
        Want to become a member?
        Follow this
        <TextLink href="https://github.com/asyncapi/community/blob/master/TSC_MEMBERSHIP.md" target="_blank" className="text-base font-normal text-sky-600 hover:text-sky-400 no-underline">
          Link
        </TextLink>
        &nbsp;to know more!
      </div>
    </li>
  );
}

function TwitterSVG() {
	const [ isHovered, setIsHovered ] = useState(false);

	return (
		<div 
      className="w-5 h-5"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <IconTwitter className={isHovered ? 'hover:fill-black' : ''} />
    </div>
	);
}

function GithubSVG() {
	const [ isHovered, setIsHovered ] = useState(false);

	return (
		<div 
      className="w-5 h-5"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <IconGithub className={isHovered ? 'hover:fill-black' : ''} />
    </div>  
	);
}

function LinkedInSVG() {
	const [ isHovered, setIsHovered ] = useState(false);

	return (
		<div 
      className="w-5 h-5"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Use the imported SVG icon component */}
      <IconLinkedIn className={isHovered ? 'hover:fill-linkedin':'' } />
    </div>
	);
}
