import GenericLayout from "../../components/layout/GenericLayout";
import TSCMembersList from "../../config/TSC_MEMBERS.json";
import {sortBy} from 'lodash';

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
    "Meet the current AsyncAPI ambassadors and learn how you can become one.";
  const image = "/img/social/website-card.jpg";

  const tscMembers = sortBy(TSCMembersList.map((user) => addAdditionalUserInfo(user)),['name']);

  return (
    <GenericLayout
      title="AsyncAPI ambassadors"
      description={description}
      image={image}
      wide
    >
      <div className="py-12 relative max-w-xl mx-auto px-4 sm:px-6 lg:px-8 lg:max-w-screen-xl">
        <div className="grid lg:grid-cols-3 lg:gap-8">
          <div>
            <h3 className="font-semibold  text-primary-800 mb-2 lg:text-2xl lg:text-center">
            Who is an ambassador?
            </h3>
            <p className="my-4 text-base text-gray-500 lg:text-center">
            The AsyncAPI Ambassador brings AsyncAPI closer to the users and potential users of the project. Provide users and community members with the necessary tools and resources:
They promote cooperation between users and disseminate the necessary tools to any specification user.
They are engaged with the project in some way, either as a contributor, blogger, speaker, etc.
They should be willing to speak at community events or write technical content, such as blog posts, solving community needs.
            </p>
          </div>
          <div>
            <h3 className="font-semibold  text-primary-800 mb-2 lg:text-2xl lg:text-center">
            How to become an ambassador?
            </h3>
            <p className="my-4 text-base text-gray-500 lg:text-center">
            To be an official AsyncAPI ambassador, there is no more important requirement than having the desire to work and spread the AsyncAPI tools.
Be in tune with AsyncAPI's mission and values.
Always respect the code of conduct.
Be active in your role as an ambassador.
            </p>
          </div>
          <div>
            <h3 className="font-semibold  text-primary-800 mb-2 lg:text-2xl lg:text-center">
            What are the benefits of being an ambassador?
            </h3>
            <p className="my-4 text-base text-gray-500 lg:text-center">
    Receiving special swag for Ambassadors.
    Receiving swags for participants of the conference or workshops.
    Free entry to AsyncAPI conferences.
    Community-wide recognition.
    All our respects for your contribution!
            </p>
          </div>
        </div>
        <div className="mt-10">
          <div className="mb-5 text-primary-800 text-center">
            <h3 className="font-semibold text-2xl">
              Current AsyncAPI ambassadors
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

function UserInfo({ user }) {
  return (
    <li
      className="p-4 text-center border rounded-md border-gray-200 shadow-md"
      key={user.github}
    >
      <div className="flex flex-row">
        <img
          src={user.avatarUrl}
          className="mx-auto rounded-full h-20 w-20 xl:w-28 xl:h-28"
        />
        <div className="flex-1">
          <div className="font-bold text-lg my-3">{user.name}</div>
          <UserWorkStatus user={user} />
          <ul role="list" className="flex justify-center space-x-5 my-5">
            <li>
              <a
                href={user.github}
                className="text-gray-600 hover:text-gray-500"
              >
                <span className="sr-only">Github</span>
                <GithubSVG />
              </a>
            </li>
            {user.twitter ? (
              <li>
                <a
                  href={user.twitter}
                  className="text-gray-600 hover:text-gray-500"
                >
                  <span className="sr-only">Twitter</span>
                  <TwitterSVG />
                </a>
              </li>
            ) : null}
            {user.linkedin ? (
              <li>
                <a
                  href={user.linkedin}
                  className="text-gray-600 hover:text-gray-500"
                >
                  <span className="sr-only">LinkedIn</span>
                  <LinkedInSVG />
                </a>
              </li>
            ) : null}
          </ul>
        </div>
      </div>
      <div className="flex flex-wrap gap-1 items-center">
        Maintainer of:
        {user.repos.map((repo) => (
          <a
            key={repo.name}
            className="inline-flex items-center px-3 py-0.5 rounded-full text-xs font-medium leading-5 bg-teal-100 text-teal-800 hover:bg-teal-300"
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
      <div className="inline-flex items-center px-3 py-1 rounded-full text-md font-medium leading-5 bg-green-100 text-green-800">
        Available for hire
      </div>
    );
  } else if (user.company) {
    return (
      <div className="inline-flex items-center px-3 py-1 rounded-full text-md font-medium leading-5 bg-orange-100 text-orange-800">
        {user.company}
      </div>
    );
  } else {
    return (
      <div className="inline-flex items-center px-3 py-1 rounded-full text-md font-medium leading-5 bg-blue-100 text-blue-800">
        Individual Member
      </div>
    );
  }
}

function QuestionCard() {
  return (
    <li className="py-10 px-6 text-center border rounded-md border-gray-200 shadow-md p-4">
      <img
        src="/img/avatars/questionmark.webp"
        className="mx-auto rounded-full h-20 w-20 xl:w-28 xl:h-28"
      />
      <div className="my-4">Become an ambassador!</div>
    </li>
  );
}

function TwitterSVG() {
  return (
    <svg
      className="w-5 h-5"
      aria-hidden="true"
      fill="currentColor"
      viewBox="0 0 20 20"
    >
      <path d="M6.29 18.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0020 3.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.073 4.073 0 01.8 7.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 010 16.407a11.616 11.616 0 006.29 1.84" />
    </svg>
  );
}

function GithubSVG() {
  return (
    <svg
      className="w-5 h-5"
      fill="currentColor"
      aria-hidden="true"
      viewBox="0 0 48 48"
    >
      <path d="M44,24c0,8.96-5.88,16.54-14,19.08V38c0-1.71-0.72-3.24-1.86-4.34c5.24-0.95,7.86-4,7.86-9.66c0-2.45-0.5-4.39-1.48-5.9 c0.44-1.71,0.7-4.14-0.52-6.1c-2.36,0-4.01,1.39-4.98,2.53C27.57,14.18,25.9,14,24,14c-1.8,0-3.46,0.2-4.94,0.61 C18.1,13.46,16.42,12,14,12c-1.42,2.28-0.84,4.74-0.3,6.12C12.62,19.63,12,21.57,12,24c0,5.66,2.62,8.71,7.86,9.66 c-0.67,0.65-1.19,1.44-1.51,2.34H16c-1.44,0-2-0.64-2.77-1.68c-0.77-1.04-1.6-1.74-2.59-2.03c-0.53-0.06-0.89,0.37-0.42,0.75 c1.57,1.13,1.68,2.98,2.31,4.19C13.1,38.32,14.28,39,15.61,39H18v4.08C9.88,40.54,4,32.96,4,24C4,12.95,12.95,4,24,4 S44,12.95,44,24z" />
    </svg>
  );
}

function LinkedInSVG() {
  return (
    <svg
      className="w-5 h-5"
      aria-hidden="true"
      fill="currentColor"
      viewBox="0 0 20 20"
    >
      <path
        fillRule="evenodd"
        d="M16.338 16.338H13.67V12.16c0-.995-.017-2.277-1.387-2.277-1.39 0-1.601 1.086-1.601 2.207v4.248H8.014v-8.59h2.559v1.174h.037c.356-.675 1.227-1.387 2.526-1.387 2.703 0 3.203 1.778 3.203 4.092v4.711zM5.005 6.575a1.548 1.548 0 11-.003-3.096 1.548 1.548 0 01.003 3.096zm-1.337 9.763H6.34v-8.59H3.667v8.59zM17.668 1H2.328C1.595 1 1 1.581 1 2.298v15.403C1 18.418 1.595 19 2.328 19h15.34c.734 0 1.332-.582 1.332-1.299V2.298C19 1.581 18.402 1 17.668 1z"
        clipRule="evenodd"
      />
    </svg>
  );
}
