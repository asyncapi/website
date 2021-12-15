import Link from 'next/link';
import Button from '../buttons/Button';

export default function Header() {
  return (
    <div className="flex justify-between">
      <div className="lg:flex lg:justify-between">
        <div className="max-w-xl">
          <Link href="/">
            <a>
              <h2 className="text-4xl leading-10 font-extrabold text-gray-900 sm:text-5xl sm:leading-none sm:tracking-tight lg:text-6xl">
                <span className="shapeup-animated-gradient">Dashboard</span>
              </h2>
            </a>
          </Link>
          <p className="mt-5 text-xl leading-7 text-gray-500">
            Lorem ipsum dolor sit amet.{' '}
          </p>
        </div>
      </div>
      <div className="self-end flex gap-x-4">
        <Button
          text="Join On GitHub"
          href="https://github.com/asyncapi"
          className="mt-5 lg:mt-0"
        />
        <Button
          text="Join Slack Channel"
          href="/slack-invite"
          className="mt-5 lg:mt-0"
        />
      </div>
    </div>
  );
}
