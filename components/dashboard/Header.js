import Button from '../buttons/Button';
import GithubButton from '../buttons/GithubButton';
import SlackButton from '../buttons/SlackButton';

export default function Header() {
  return (
    <div className="sm:flex sm:justify-between" id="main-content">
      <div className="lg:flex lg:justify-between">
        <div className="max-w-xl">
          <h2 className="text-4xl leading-10 font-extrabold text-gray-900 sm:text-4xl sm:leading-none sm:tracking-tight">
            Dashboard
          </h2>
          <p className="mt-5 text-xl leading-7 text-gray-700">
            Visualize our progress. Get involved.{' '}
          </p>
        </div>
      </div>
      <div className="self-end flex gap-x-4">
        <Button text='Contribution Guide' href='https://github.com/asyncapi?type=source#-contribute-to-asyncapi' target='_blank'/>
        <GithubButton className="mt-5 lg:mt-0" />
        <SlackButton className="mt-5 lg:mt-0" />
      </div>
    </div>
  );
}
