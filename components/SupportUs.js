export default function SupportUs({ className = '', showSupportBanner = true }) {
  return (
    <div className={`text-center ${className}`}>
      <div className="flex flex-wrap mb-4 items-center justify-center md:px-4">
        <a
          href="https://slack.com/media-kit"
          target="_blank"
          className="block relative text-center w-2/3 px-14 py-4 sm:p-0 sm:w-1/2 md:w-1/3 lg:w-1/5"
          rel="noopener noreferrer"
        >
          <img
            className="inline-block px-4 sm:h-10"
            src="/img/supportus/slack.webp"
            title="Free standard subscription."
          />
        </a>
        <a
          href="https://toast.ninja/"
          target="_blank"
          rel="noopener noreferrer"
          className="block relative text-center w-2/3 px-14 py-4 sm:p-0 sm:w-1/2 md:w-1/3 lg:w-1/5"
        >
          <img
            className="inline-block px-4 sm:h-10"
            src="/img/supportus/toast.webp"
            title="Free services."
          />
        </a>

        <a
          href="https://www.netlify.com/"
          target="_blank"
          rel="noopener noreferrer"
          className="block relative text-center w-2/3 px-14 py-4 sm:p-0 sm:w-full md:w-1/3 lg:w-1/5"
        >
          <img
            className="inline-block px-4 sm:h-10"
            src="/img/supportus/netlify.webp"
            title="Free website deployment."
          />
        </a>
        <a
          href="https://sonarcloud.io/"
          target="_blank"
          rel="noopener noreferrer"
          className="block relative text-center w-2/3 px-14 py-4 sm:p-0 sm:w-1/2 md:w-1/3 lg:w-1/5"
        >
          <img
            className="inline-block px-4 sm:h-14"
            src="/img/supportus/sonarcloud.webp"
            title="Free tier for automated project scanning."
          />
        </a>
      </div>
      <div className="flex flex-wrap mb-4 items-center justify-center md:px-2">
        <a
          href="https://www.digitalocean.com/press/"
          target="_blank"
          className="block relative text-center w-2/3 px-14 py-4 sm:p-0 sm:w-1/2 md:w-1/3 lg:w-1/5"
          rel="noopener noreferrer"
        >
          <img
            className="inline-block px-4 sm:h-10"
            src="/img/supportus/digitalocean.webp"
            title="$500 on cloud services."
          />
        </a>
        <a
          href="https://drive.google.com/drive/folders/1vNetE3qaQJ52fk5jdVwcbTs8GOcKuwbi"
          target="_blank"
          rel="noopener noreferrer"
          className="block relative text-center w-2/3 px-14 py-4 sm:p-0 sm:w-1/2 md:w-1/3 lg:w-1/5"
        >
          <img
            className="inline-block px-4 sm:h-8"
            src="/img/supportus/restream.webp"
            title="Free professional plan subscription."
          />
        </a>
      </div>

    </div>
  );
}
