import Button from '../buttons/Button';
import GithubButton from '../buttons/GithubButton';
import SlackButton from '../buttons/SlackButton';

export default function Header() {
  return (
    <div className="sm:flex sm:justify-between" id="main-content">
      <div className="lg:flex lg:justify-between">
        <div className="max-w-xl">
          <h2 className="dark:text-white text-4xl leading-10 font-extrabold text-gray-900 sm:text-4xl sm:leading-none sm:tracking-tight" data-testid="Header-heading">
            Dashboard
          </h2>
          <p className="dark:text-gray-500 mt-5 text-xl leading-7 text-gray-700" data-testid="Header-paragraph">
            Visualize our progress. Get involved.{' '}
          </p>
        </div>
      </div>
      <div className="self-end flex flex-col xs:flex-row gap-y-1 text-center gap-x-2 mt-3">
        <Button text='Contribution Guide' href='https://github.com/asyncapi?type=source#-contribute-to-asyncapi' target='_blank' />
        <GithubButton className="lg:mt-0" />
        <SlackButton className="lg:mt-0" />
      </div>
    </div>
  );
}
