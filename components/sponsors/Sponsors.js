import { sponsors } from "./SponsorsList";
export default function Sponsors({ className = '', showSupportBanner = true }) {
return (
    <div className={`text-center ${className}`}>
      <ul className="flex flex-wrap mb-4 items-center justify-center md:px-4">
        {sponsors.map((sponsor, index) => (
          <li
            key={index}
            className="w-2/3 sm:w-1/4 md:w-1/3 lg:w-1/5"
            data-testid="Sponsors-list"
          >
            <a
              href={sponsor.link}
              target="_blank"
              className="block relative text-center px-4 py-4 sm:p-0"
              rel="noopener noreferrer"
              data-testid="Sponsors-link"
            >
              <img
                className={sponsor.imageClass}
                src={sponsor.imageSrc}
                alt={sponsor.altText}
                data-testid="Sponsors-img"
              />
            </a>
          </li>
        ))}
      </ul>
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
