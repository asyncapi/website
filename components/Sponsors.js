export default function Sponsors({ className = '', showSupportBanner = true }) {
  return (
    <div className={`text-center ${className}`}>
      <div className="flex flex-wrap mb-8 items-center justify-center md:px-4">
        <a
          href="https://www.ibm.com"
          target="_blank"
          className="block relative text-center w-2/3 px-14 py-4 sm:p-0 sm:w-1/2 md:w-1/3 lg:w-1/5"
        >
          <img
            className="inline-block px-4 mt-6 sm:h-14 sm:mt-4"
            src="/img/sponsors/ibm.png"
          />
        </a>
        <a
          href="https://www.iqvia.com"
          target="_blank"
          className="block relative text-center w-2/3 px-14 py-4 sm:p-0 sm:w-1/2 md:w-1/3 lg:w-1/5"
        >
          <img
            className="inline-block px-4 mt-6 sm:h-10"
            src="/img/sponsors/iqvia.png"
          />
        </a>

        <a
          href="https://www.postman.com"
          target="_blank"
          className="block relative text-center w-2/3 px-14 py-4 sm:p-0 sm:w-1/2 md:w-1/3 lg:w-1/5"
        >
          <img
            className="inline-block px-8 mt-6 sm:mt-4 sm:h-14"
            src="/img/sponsors/postman.png"
          />
        </a>
        <a
          href="https://www.solace.com"
          target="_blank"
          className="block relative text-center w-2/3 px-14 py-4 sm:p-0 sm:w-1/2 md:w-1/3 lg:w-1/5"
        >
          <img
            className="inline-block px-4 mt-6 sm:h-10"
            src="/img/sponsors/solace.png"
          />
        </a>
        {/* <a href="https://www.tibco.com" target="_blank" className="block relative text-center w-2/3 px-14 py-4 sm:p-0 sm:w-1/2 md:w-1/3 lg:w-1/5">
          <img className="inline-block px-4 mt-6 sm:h-12" src="/img/sponsors/tibco.png" />
        </a> */}
      </div>
      {showSupportBanner && (
        <div className="md:px-4">
          <span className="text-gray-500">Want to become a sponsor?</span>{' '}
          <a
            href="https://opencollective.com/asyncapi"
            target="_blank"
            className="text-primary-600"
          >
            Support us!
          </a>
        </div>
      )}
    </div>
  );
}
