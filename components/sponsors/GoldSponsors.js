import {goldSponsors} from './GoldSponsorsList';
export default function GoldSponsors({ className = '', showSupportBanner = true }) {
   return (
      <div className={`text-center ${className}`}>
        <div className="flex flex-wrap mb-8 items-center justify-center md:px-4">
          {goldSponsors.map((sponsor, index) => (
            <a
              key={index}
              href={sponsor.website}
              target="_blank"
              className="block relative text-center w-2/3 px-4 py-4 sm:p-0 sm:w-1/2 md:w-1/3 lg:w-1/5"
              rel="noopener noreferrer"
              data-testid="GoldSponsors-link"
            >
              <img
                className="inline-block sm:h-12"
                src={sponsor.imageSrc}
                alt={sponsor.name}
                data-testid="GoldSponsors-img"
              />
            </a>
          ))}
        </div>
      </div>
    );
  }
  
