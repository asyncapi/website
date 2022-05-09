export default function Sponsors({ className = '', showSupportBanner = true }) {
  return (
    <div className={`text-center ${className}`}>
      <div className="flex flex-wrap mb-4 items-center justify-center md:px-4">
        <a
          href="https://www.ibm.com"
          target="_blank"
          className="block relative text-center w-2/3 px-14 py-4 sm:p-0 sm:w-1/4 md:w-1/3 lg:w-1/5"
          rel="noopener noreferrer"
        >
          <img
            className="inline-block px-4 sm:h-14"
            src="/img/sponsors/ibm.png"
            alt="IBM"
          />
        </a>
        <a
          href="https://www.iqvia.com"
          target="_blank"
          rel="noopener noreferrer"
          className="block relative text-center w-2/3 px-14 py-4 sm:p-0 sm:w-1/4 md:w-1/3 lg:w-1/5"
        >
          <img
            className="inline-block px-4 sm:h-10"
            src="/img/sponsors/iqvia.png"
            alt="IQVIA Technologies"
          />
        </a>

        <a
          href="https://www.postman.com"
          target="_blank"
          rel="noopener noreferrer"
          className="block relative text-center w-2/3 px-14 py-4 sm:p-0 sm:w-1/4 md:w-1/3 lg:w-1/5"
        >
          <img
            className="inline-block px-2 sm:h-18 flex-shrink-0"
            src="/img/sponsors/postman.png"
            alt="Postman"
          />
        </a>
        <a
          href="https://www.solace.com"
          target="_blank"
          rel="noopener noreferrer"
          className="block relative text-center w-2/3 px-14 py-4 sm:p-0 sm:w-1/4 md:w-1/3 lg:w-1/5"
        >
          <img
            className="inline-block px-4 sm:h-10"
            src="/img/sponsors/solace.png"
            alt="Solace"
          />
        </a>
      </div>
      {showSupportBanner && (
        <div className="md:px-4">
          <span className="text-gray-500">Want to become a sponsor?</span>{' '}
          <a
            href="https://opencollective.com/asyncapi"
            target="_blank"
            rel="noopener noreferrer"
            className="text-primary-600"
          >
            Support us!
          </a>
        </div>
      )}
    </div>
  );
}
