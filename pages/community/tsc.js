import Container from "../../components/layout/Container";
import GenericLayout from "../../components/layout/GenericLayout";
import TSCMembersList from "../../config/TSC_MEMBERS.json";

export default function TSC() {
  const description = "See the current AsyncAPI TSC members and learn how you can become one.";
  const image = "/img/social/parsers.png"; // TODO: change to a Screenshot of the page

  function addAdditionalUserInfo(user) {
    const userData = {
      ...user,
    };

    addNameIfNotPresent(userData);
    addSocialLinks(userData);
    addAvatarUrl(userData);
    userData.repos = userData.repos.map((repoName) =>
      generateRepositoryInfo(repoName)
    );

    return userData;
  }

  function addNameIfNotPresent(user) {
    // if username is not present, use the github username
    if (!user.name) user.name = user.github;
  }

  function addSocialLinks(user) {
    if (user.github) user.github = `https://www.github.com/${user.github}`;
    if (user.linkedin)
      user.linkedin = `https://www.linkedin.com/in/${user.linkedin}`;
    if (user.twitter) user.twitter = `https://www.twitter.com/${user.twitter}`;
  }

  function addAvatarUrl(user) {
    // github redirects to avatar url using `https://www.github.com/<username>.png`
    user.avatarUrl = user.github + ".png";
  }

  function generateRepositoryInfo(repositoryName) {
    return {
      name: repositoryName,
      url: `https://www.github.com/asyncapi/${repositoryName}`,
    };
  }

  const tscMembers = TSCMembersList.map((user) => addAdditionalUserInfo(user));

  return (
    <GenericLayout
      title="Technical Steering Committee"
      description={description}
      image={image}
      wide
    >
      <Container className="mt-12" wide>
        <h3 className="text-primary-800 text-3xl font-bold md:text-4xl mb-4">
          What is TSC?
        </h3>
        <p className="text-base text-gray-500 md:w-1/2">
          TSC is something......
        </p>
      </Container>
      <Container className="mt-12" wide>
        <h3 className="text-primary-800 text-3xl font-bold md:text-4xl mb-4">
          Where is it coming from?
        </h3>
        <p className="text-base text-gray-500 md:w-1/2">
          Lorem ipsum dolor sit amet...
        </p>
      </Container>
      <Container className="mt-12" wide>
        <h3 className="text-primary-800 text-3xl font-bold md:text-4xl mb-4">
          Governance model
        </h3>
        <p className="text-base text-gray-500 md:w-1/2">
          Lorem ipsum dolor sit amet...
        </p>
      </Container>
      <Container className="mt-12" wide>
        <h3 className="text-primary-800 text-3xl font-bold md:text-4xl mb-4">
          The current TSC members
        </h3>

        <ul
          role="list"
          className="space-y-4 sm:grid sm:grid-cols-2 sm:gap-6 sm:space-y-0 lg:grid-cols-3 lg:gap-8"
        >
          {tscMembers.map((user) => displayUserInfo(user))}
          <QuestionCard />
        </ul>
      </Container>
    </GenericLayout>
  );
}

function displayUserInfo(user) {
  return (
    <li
      key={user.name}
      className="py-10 px-6 text-center border rounded-md border-gray-200 shadow-md p-4"
    >
      <img
        src={user.avatarUrl}
        className="mx-auto rounded-full h-40 w-40 xl:w-56 xl:h-56"
      />
      <div className="font-bold text-xl my-3">{user.name}</div>
      {showWorkStatus(user)}
      <ul role="list" className="flex justify-center space-x-5 my-5">
        <li>
          <a href={user.github} className="text-gray-600 hover:text-gray-500">
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
      <div className="flex flex-wrap gap-2 items-center">
        Maintainer of:
        {user.repos.map((repo) => (
          <a
            key={repo.name}
            className="border border-teal-500 w-max-content rounded-md py-1 px-2 text-teal-500 hover:text-white hover:bg-teal-500"
            href={repo.url}
          >
            {repo.name}
          </a>
        ))}
      </div>
    </li>
  );
}

function showWorkStatus(user) {
  if (user.availableForHire) {
    return (
      <div className="m-auto border-2 border-green-500 text-green-500 rounded-lg w-max-content py-2 px-2 my-2">
        Available for hire
      </div>
    );
  } else if (user.company) {
    return (
      <div className="m-auto border-2 border-orange-400 text-orange-400 rounded-lg w-max-content py-2 px-2 my-2">
        {user.company}
      </div>
    );
  } else {
    return (
      <div className="m-auto border-2 border-blue-400 text-blue-400 rounded-lg w-max-content py-2 px-2 my-2">
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
        className="mx-auto rounded-full h-40 w-40 xl:w-56 xl:h-56"
      />
      <div className="my-4">Want to become one?</div>
      <div className="my-4">
        See{" "}
        <a href="" className="text-blue-400">
          here!
        </a>
      </div>
    </li>
  );
}

function TwitterSVG() {
  return (
    <svg
      className="w-7 h-7"
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
      className="w-7 h-7"
      fill="currentColor"
      aria-hidden="true"
      viewBox="0 0 30 30"
    >
      <path d="M 4.6582031 4 C 3.6182031 6.431 4.0382031 8.4602656 4.4082031 9.5722656 C 2.9152031 11.172266 2.0019531 13.3765 2.0019531 16.3125 C 2.0019531 23.5795 6.5919531 26 15.001953 26 C 23.411953 26 28.001953 23.5795 28.001953 16.3125 C 28.002953 13.4765 27.036656 11.264766 25.472656 9.6347656 C 25.696656 9.2667656 26.003906 8.5485 26.003906 7.1875 C 26.003906 5.1405 25.316406 4 25.316406 4 C 24.247406 4 21.735203 4.4310469 19.658203 6.4980469 C 18.183203 6.1310469 16.610906 6 15.003906 6 C 13.429906 6 11.888406 6.0862969 10.441406 6.4042969 C 10.348406 6.3182969 7.7612031 4 4.6582031 4 z M 10.005859 13.5 C 11.308859 13.514 13.458906 13.999 15.003906 14 C 16.548906 13.999 18.697 13.514 20 13.5 C 22.522 13.5 24 15.502656 24 17.972656 C 24 22.024656 21.656859 23.999 15.005859 24 L 15.003906 24 L 15 24 C 8.349 23.999 6.0058594 22.024656 6.0058594 17.972656 C 6.0058594 15.502656 7.4838594 13.5 10.005859 13.5 z M 10.5 17 A 1.5 2 0 0 0 9 19 A 1.5 2 0 0 0 10.5 21 A 1.5 2 0 0 0 12 19 A 1.5 2 0 0 0 10.5 17 z M 19.5 17 A 1.5 2 0 0 0 18 19 A 1.5 2 0 0 0 19.5 21 A 1.5 2 0 0 0 21 19 A 1.5 2 0 0 0 19.5 17 z" />
    </svg>
  );
}

function LinkedInSVG() {
  return (
    <svg
      className="w-7 h-7"
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
