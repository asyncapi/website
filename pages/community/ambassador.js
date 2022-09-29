import GenericLayout from "../../components/layout/GenericLayout";
import ambassadorsList from "../../config/TSC_MEMBERS.json";
import TwitterSVG from "../../components/icons/twitter_2";
import GithubSVG from "../../components/icons/github_2";
import LinkedInSVG from "../../components/icons/linkedin_2";
import {sortBy} from 'lodash';
import Heading from "../../components/typography/Heading";
import Paragraph from "../../components/typography/Paragraph";
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

export default function ambassadors() {
  const description =
    "Meet the current AsyncAPI ambassadors and learn how you can become one.";
  const image = "/img/social/website-card.jpg";

  const ambassadors = sortBy(ambassadorsList.map((user) => addAdditionalUserInfo(user)),['name']);

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
            <Heading level="h3" typeStyle="heading-md-semibold" className="mb-2 lg:text-center">
              What is an AsyncAPI ambassador?
            </Heading>
             <Paragraph className="my-4 lg:text-center">
             The AsyncAPI Ambassador brings AsyncAPI closer to the users and potential users of the project. It provides users and community members with the necessary tools and resources.
They promote cooperation between users and disseminate the necessary tools to any specification user.
They are engaged with the project in some way, either as a contributor, blogger, speaker, etc.
They should also be willing to speak at community events or write technical content (i.e. blog posts, docs, etc.) that solves community needs.
             </Paragraph>
          </div>
          <div>
            <Heading level="h3" typeStyle="heading-md-semibold" className="mb-2 lg:text-center">
            How can you become an ambassador?
            </Heading>
            <Paragraph className="my-4 lg:text-center">
            To be an official AsyncAPI ambassador, there is no more important requirement than having the desire to work and spread the AsyncAPI tools.
Be in tune with AsyncAPI's mission and values.
Always respect the code of conduct.
Be active in your role as an ambassador.
            </Paragraph>
          </div>
          <div>
            <h3 className="font-semibold  text-primary-800 mb-2 lg:text-2xl lg:text-center">
            What are the benefits of becoming an ambassador?
            </h3>
            <p className="my-4 text-base text-gray-500 lg:text-center">
    Special Ambassador swag.
    Conference and workshop swag. 
    Free entry to AsyncAPI conferences.
    Community-wide recognition.
    All our respects for your contribution!
            </p>
          </div>
        </div>
        <div className="mt-10">
          <div className="mb-5 text-primary-800 text-center">
            <Heading level="h3" typeStyle="heading-lg">
              Current AsyncAPI ambassadors
            </Heading>
            <Paragraph className="mt-2">
              (in alphabetical order)
            </Paragraph>
          </div>

          <ul
            role="list"
            className="space-y-4 sm:grid sm:grid-cols-2 sm:gap-6 sm:space-y-0 lg:grid-cols-3 lg:gap-8"
          >
            {ambassadors.map((user) => (
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
        Contributions:
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
      <a href="https://github.com/asyncapi/community/pull/361"><div className="my-4">Become an ambassador!</div></a>
    </li>
  );
}
