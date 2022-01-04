import GithubButton from '../buttons/GithubButton';
import SlackButton from '../buttons/SlackButton';

export default function Header() {
  return (
    <div className="flex justify-between">
      <div className="lg:flex lg:justify-between">
        <div className="max-w-xl">
          <h2 className="text-4xl leading-10 font-extrabold text-gray-900 sm:text-5xl sm:leading-none sm:tracking-tight lg:text-6xl">
            Dashboard
          </h2>
          <p className="mt-5 text-xl leading-7 text-gray-500">
            Lorem ipsum dolor sit amet.{' '}
          </p>
        </div>
      </div>
      <div className="self-end flex gap-x-4">
        <GithubButton
          text="Join On GitHub"
          href="https://github.com/asyncapi"
          className="mt-5 lg:mt-0"
        />
        <SlackButton
          text="Join Slack Channel"
          href="/slack-invite"
          className="mt-5 lg:mt-0"
        />
      </div>
    </div>
  );
}
