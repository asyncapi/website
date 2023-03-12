export default function SupportUs({ className = '', showSupportBanner = true }) {
  return (
    <div className={`text-center ${className}`}>
      <div className="flex flex-wrap md:mb-4 sm:py-2 items-center justify-center md:px-4">
        <a
          href="https://slack.com/media-kit"
          target="_blank"
          className="block relative text-center w-2/3 px-4 py-4 sm:p-0 sm:w-1/3 md:w-1/3 lg:w-1/5"
          rel="noopener noreferrer"
        >
          <img
            className="inline-block px-4 sm:h-10"
            src="/img/supportus/slack.webp"
            title="Slack - Free Standard Subscription."
          />
        </a>
        <a
          href="https://toast.ninja/"
          target="_blank"
          rel="noopener noreferrer"
          className="block relative text-center w-2/3 px-4 py-4 sm:p-0 sm:w-1/3 md:w-1/3 lg:w-1/5"
        >
          <img
            className="inline-block px-4 sm:h-10"
            src="/img/supportus/toast.webp"
            title="Toast - Free services."
          />
        </a>

        <a
          href="https://www.netlify.com/"
          target="_blank"
          rel="noopener noreferrer"
          className="block relative text-center w-2/3 px-4 py-4 sm:p-0 sm:w-1/3 md:w-1/3 lg:w-1/5"
        >
          <img
            className="inline-block px-4 sm:h-10"
            src="/img/supportus/netlify.webp"
            title="Netlify - Free website deployment."
          />
        </a>

      </div>
      <div className="flex flex-wrap mb-4 items-center justify-center md:px-2">
        <a
          href="https://sonarcloud.io/"
          target="_blank"
          rel="noopener noreferrer"
          className="block relative text-center w-2/3 px-4 py-4 sm:p-0 sm:w-1/3 md:w-1/3 lg:w-1/5"
        >
          <img
            className="inline-block px-4 md:h-14"
            src="/img/supportus/sonarcloud.webp"
            title="Sonarcloud - Free tier for automated project scanning."
          />
        </a>
        <a
          href="https://www.digitalocean.com/press/"
          target="_blank"
          className="block relative text-center w-2/3 px-4 py-4 sm:p-0 sm:w-1/3 md:w-1/3 lg:w-1/5"
          rel="noopener noreferrer"
        >
          <img
            className="inline-block px-2 sm:h-8"
            src="/img/supportus/digitalocean.webp"
            title="DigitalOcean - 500 dollars on cloud services."
          />
        </a>
        <a
          href="https://restream.io/"
          target="_blank"
          rel="noopener noreferrer"
          className="block relative text-center w-2/3 px-4 py-4 sm:p-0 sm:w-1/3 md:w-1/3 lg:w-1/5"
        >
          <img
            className="inline-block px-4 sm:h-6"
            src="/img/supportus/restream.webp"
            title="Restream - Free professional plan subscription."
          />
        </a>
      </div>

    </div>
  );
}
